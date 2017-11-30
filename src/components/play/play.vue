<template>
	<transition name="foods">
		<div class="playWrap" v-show="showFlag">
			<audio :src="songUrl" 
				controls="controls" 
				ref="audios" 
				autoplay="autoplay" 
				id="songZone"
				@canplay="totalT()"
				@timeupdate="nowT()"
				@ended="songEnd"></audio>
			<div class="blur" :style="{background: 'url(' + playsong.albumpic_big +')'}"></div>
			<div class="opcti"></div>
			<div class="mainwrap">
				<div class="main" :class="{mainwrapUp:actionsheet}">
					<div class="song_info">
						<span class="thumil" @click="hide()">
							<img :src="playsong.albumpic_small"/>
						</span>
						<div class="singer" @click="totalT()">
							<h3>{{playsong.songname}}</h3>
							<p>{{playsong.singername}}</p>
						</div>
						<a href="javascript:;" id="playBtn" :class="{changeBtn:hasPlay}" @click="controlPlay()">
						</a>
					</div>
					<div class="lyric">
						<div id="lyric_list" ref="lyric">
							{{songLyric}}
						</div>
					</div>
				</div>
				<div class="controls" v-show="!actionsheet">
					<div class="operate operate--left" @click="showUp">
						<a class="operate__item " href="javascript:;"></a>
					</div>
					<div class="operate operate--right">
						<a class="operate__item " href="javascript:;"></a>
					</div>
					<!--进度条-->
					<div class="progress">
						<span class="time nowtime">{{nowTime}}</span>
						<div class="progress--bar">
							<div class="progress__play">
								<div class="progress__playing" :style="{right:Nowpercents+'%'}">

								</div>
							</div>
						</div>
						<span class="time totaltime">{{totalTime}}</span>
					</div>
					<div class="download">
						<a href="##" id="down" ref="down">免费下载这首歌</a>
					</div>
				</div>
			</div>
			<transition name="actionsheet">
				<div class="actionsheet" v-show="actionsheet">
					<h4>播放列表({{playhstory.length}}首)</h4>
					<div class="song--list">
						<ul>
							<li v-for="(item,index) in playhstory" 
								@click="changeSong(item)" 
								:class="[currentSong(item) ? 'current':'']">
								<span class="playing--song">{{item.songname}}</span>
								<b>-</b>
								<span class="playing--name">{{item.singername}}</span>
								<playingicon v-show="currentSong(item)" class="playingicon" :heights=1.1>
								</playingicon>
							</li>
						</ul>
					</div>
					<a href="javascript:;" class="closed" @click="showUp">关闭</a>
				</div>
			</transition>
		</div>
	</transition>
</template>
<script>
	//	import Vue from "Vue"
	import playingicon from "../playingicon/playingicon"
	import Bus from "../../assets/eventBus"
	export default {
		name: "play",
		data() {
			return {
				songArr: [],
				playhstory: [],
				playsong: {},
				songIndex: 0,
				showFlag: false,
				lyric: '',
				hasPlay: false,
				totalTime: '00:00',
				nowTime: "00:00",
				Nowpercents: 0,
				actionsheet: false,
			}
		},
		components: {
			playingicon,
		},
		methods: {
			show() {
				this.showFlag = true;
			},
			hide() {
				this.showFlag = false;
			},
			showUp() {
				if(this.actionsheet) {
					this.actionsheet = false;
				} else {
					this.actionsheet = true;
				}
			},
			changeSong(song, index) {
				//				console.log(song)
				this.playsong = song;
			},
			currentSong(item) {
				var self = this;
				if((self.playsong == item)) {
					return true;
				} else {
					return false;
				}

			},
			controlPlay: function() { //控制播放
				if(this.$refs.audios.paused) {
					this.hasPlay = false;
					this.$refs.audios.play();
					this.$emit("icon", true); //控制miniplay动画
				} else {
					this.$refs.audios.pause();
					this.hasPlay = true;
					this.$emit("icon", false);
				}
			},
			songEnd() {
				console.log("播放结束！");
				if(this.songIndex >= this.playhstory.length - 1) {
					this.songIndex = 0;
				} else {
					this.songIndex++;
				}
				this.playsong = this.playhstory[this.songIndex];
			},
			totalT: function() { //音乐总时长

				var song = document.getElementById('songZone')
				if(!song.duration || song.duration) {
					var times = Math.floor(song.duration);
					var mins = parseInt(times / 60);
					var sec = times % 60;
					if(mins < 10) {
						mins = "0" + parseInt(times / 60);
					}
					if(sec < 10) {
						sec = "0" + parseInt(times % 60);
					}
					this.totalTime = mins + ":" + sec;
				}
			},
			nowT: function() { //当前播放时间
				//歌曲可以播放了 ，mini按钮可以出现了,同时吧封面传过去
				this.$emit("showMini", this.playsong.albumpic_small);
				var song = document.getElementById('songZone')
				var times = song.duration;
				var nowtime = song.currentTime;
				this.Nowpercents = (1 - nowtime / times) * 100;
				//				$('.progress__playing').css('right',Nowpercents+"%");
				var mins = 0;
				var sec = 0;
				if(nowtime % 60 < 10) {
					sec = "0" + parseInt(nowtime % 60);
				} else {
					sec = parseInt(nowtime % 60)
				}
				if(nowtime / 60 < 10) {
					mins = "0" + parseInt(nowtime / 60);
				} else {
					mins = parseInt(nowtime / 60);
				}
				this.nowTime = mins + ":" + sec
			}
		},
		computed: { //存储传过来的songid
			songId: function() {
				return this.playsong.songid
			},
			songUrl() {
				if(this.playsong.url) {
					return this.playsong.url
				} else {
					return this.playsong.m4a
				}
			},
			songLyric: function() { //获取歌词
				//				console.log(this.songId);
				let url = "http://route.showapi.com/213-2?showapi_appid=49174&showapi_sign=67e1f36ea008490ea96ad4050258e20b&musicid=" + this.songId + "&";
				this.$http.get(url).then(function(res) {
					var lyric = '';
					let lyArr = $.trim(res.body.showapi_res_body.lyric_txt).split('    ');
					//					console.log(res.body.showapi_res_body.lyric_txt);
					for(var i = 0; i < lyArr.length; i++) {
						lyric += "<p>" + lyArr[i] + "</p>"
					}
					this.$refs.lyric.innerHTML = lyric;
				})
			},
		},
		mounted: function() {
			var self = this;
			Bus.$on("getSongMsg", function(msg) {
				self.playsong = msg;
				if(self.playhstory.length > 0) { //歌单去重
					var isAlreadyHave = false;
					for(let i = 0; i < self.playhstory.length; i++) {
						if(self.playhstory[i].songid == msg.songid) {
							isAlreadyHave = true;
						}
					}
					if(!isAlreadyHave) {
						self.playhstory.push(msg);
					} else {
						return false;
					}
				} else {
					self.playhstory.push(msg);
				}
				//				
			})
			Bus.$on('show', function(msg) {
				self.showFlag = msg;
			})
			Bus.$on('hasplay', function(msg) {
				self.hasPlay = msg;
			})
			//播放全部
			Bus.$on('getAllSong', function(msg) {
				self.playsong = msg[0];
				self.playhstory=$.extend(self.playhstory,msg);
			})
		}
	}
</script>
<style>
	audio {
		display: none;
		height: 0;
		width: 0;
	}
	
	.playWrap {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		z-index: 102;
		background: #2C3E50;
	}
	
	.blur {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		filter: blur(15px);
		-webkit-filter: blur(5px);
		background-repeat: no-repeat !important;
		background-size: cover !important;
		background-position: 50% !important;
		transform: scale(1.6);
		-webkit-transform: scale(1.6);
	}
	
	.opcti {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
	}
	
	.mainwrap {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 3;
		width: 100%;
	}
	
	.mainwrap-up {
		bottom: 38rem !important;
		overflow: hidden;
	}
	
	.controls {
		position: absolute;
		bottom: 0;
		height: 15.4rem;
		width: 100%;
	}
	
	.main {
		position: absolute;
		top: 0;
		bottom: 15.4rem;
		width: 100%;
	}
	
	.song_info {
		position: relative;
		padding: 15px;
		padding-right: 80px;
		height: 5rem;
		color: white;
		font-size: 1.8rem;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	
	.song_info .thumil {
		display: inline-block;
		height: 8rem;
		width: 8rem;
		overflow: hidden;
	}
	
	.thumil img {
		width: 100%;
	}
	
	.singer {
		flex: 1;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
		align-items: center;
	}
	
	.singer>h3,
	.singer>p {
		width: 100%;
		margin-left: 10px;
	}
	
	.singer>p {
		font-size: 1.4rem;
	}
	
	#playBtn {
		/*display: block;*/
		position: absolute;
		top: 50%;
		right: 25px;
		width: 43px;
		height: 43px;
		margin-top: -22px;
		border: solid 1px #fff;
		border-radius: 999px;
		background: rgba(0, 0, 0, .1);
		opacity: .6;
	}
	
	#playBtn::after {
		content: "";
		display: block;
		width: 17px;
		height: 19px;
		margin: 13px 0 0 16px;
		background-image: url(../../assets/sprite_play.png);
		background-repeat: no-repeat;
		background-size: 40px 350px;
		background-position: 0 -180px;
		/*-180px*/
	}
	
	.changeBtn::after {
		background-position: 0 -150px !important;
	}
	
	.operate--left {
		position: absolute;
		top: 0;
		left: 1.5rem;
	}
	
	.operate--right {
		position: absolute;
		top: 0;
		right: 1.5rem;
	}
	
	.operate a {
		display: block;
		height: 4rem;
		width: 4rem;
	}
	
	.operate--left a {
		background-image: url(../../assets/sprite_play.png);
		background-repeat: no-repeat;
		background-size: 4rem 35rem;
		background-position: .8rem -23rem;
	}
	
	.operate--right a {
		background-image: url(../../assets/sprite_play.png);
		background-repeat: no-repeat;
		background-size: 4rem 35rem;
		background-position: .8rem 1.2rem;
	}
	
	.progress {
		position: absolute;
		width: 100%;
		height: 4rem;
		top: 4rem;
		color: white;
	}
	
	.progress span {
		position: absolute;
		width: 5.5rem;
		line-height: 4rem;
		text-align: center;
	}
	
	.nowtime {
		left: 0;
		top: 0;
	}
	
	.totaltime {
		right: 0;
		top: 0;
	}
	
	.progress--bar {
		position: absolute;
		left: 5.5rem;
		right: 5.5rem;
		height: 100%;
	}
	
	.progress__play {
		margin-top: 1.9rem;
		width: 100%;
		height: .2rem;
		background: gray;
		position: relative;
	}
	
	.progress__playing {
		position: absolute;
		right: 100%;
		left: 0;
		top: 0;
		height: 100%;
		background: #31c27c;
	}
	
	.download {
		position: absolute;
		bottom: 0;
		top: 8rem;
		width: 100%;
	}
	
	#down {
		display: block;
		margin: 0 3.5rem;
		height: 4.5rem;
		background: #31c27c;
		border-radius: 999px;
		text-align: center;
		background-image: url(../../assets/sprite_play.png);
		background-repeat: no-repeat;
		background-size: 4rem 35rem;
		background-position: 8px -29.4rem;
		color: #FFFFFF;
		line-height: 4.5rem;
		font-size: 1.8rem;
	}
	
	.actionsheet {
		height: 38rem;
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .2);
		z-index: 5;
		color: #F4F4F4;
	}
	
	.actionsheet h4 {
		position: absolute;
		margin: 0;
		font-weight: normal;
		top: 0;
		left: 0;
		height: 5.5rem;
		width: 100%;
		color: #F4F4F4;
		font-size: 1.6rem;
		text-align: center;
		line-height: 5.5rem;
	}
	
	.actionsheet-enter-active,
	.actionsheet-leave-active {
		transition: all .3s ease-in-out;
	}
	
	.actionsheet-enter,
	.actionsheet-leave-to {
		/*opacity: 0;*/
		transform: translate3D(0, 100%, 0);
	}
	
	.closed {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 5.5rem;
		width: 100%;
		color: #F4F4F4;
		font-size: 1.8rem;
		text-align: center;
		line-height: 5.5rem;
	}
	
	.song--list {
		position: absolute;
		top: 5.5rem;
		bottom: 5.5rem;
		width: 100%;
		overflow: auto;
	}
	
	.song--list ul {
		box-sizing: border-box;
		padding: 0 1rem;
	}
	
	.song--list ul li {
		box-sizing: border-box;
		padding: 2rem 1rem;
		float: none;
		font-size: 1.6rem;
		text-align: left;
		border-bottom: 1px solid rgba(255, 255, 255, .15);
	}
	
	.current * {
		color: #31c27c !important;
	}
	
	.song--list ul li:first-child {
		border-top: 1px solid rgba(255, 255, 255, .15);
	}
	
	.playing--song {
		vertical-align: middle;
	}
	
	.playing--name {
		font-size: 1.2rem;
		color: rgba(255, 255, 255, .5);
	}
	
	.lyric {
		position: absolute;
		width: 100%;
		top: 11rem;
		bottom: 0;
		text-align: center;
		color: rgba(255, 255, 255, .6);
		font-size: 1.6rem;
		overflow: auto;
	}
	
	.mainwrapUp {
		bottom: 38rem !important;
		overflow: hidden;
	}
	
	#lyric_list {
		padding: 2rem 0;
	}
	
	#lyric_list p {
		line-height: 42px;
	}
	
	.foods-enter-active,
	.foods-leave-active {
		transition: all .5s;
	}
	
	.foods-enter,
	.foods-leave-to {
		opacity: 0;
		transform: translate3D(0, 100%, 0);
	}
	
	.playingicon {
		position: initial;
		float: right;
		margin-top: .1rem;
	}
</style>