<template>
	<div class="listWrap">
		<div class="topWrap">
			<div class="list_top">
				<header>
					<img src="../../assets/logo.png" />
				</header>
				<div class="ablums">
					<div class="ablums_left">
						<img :src="pic" />
					</div>
					<div class="ablums_right">
						<h3>{{$route.query.id}}</h3>
						<p class="songnum">共{{songnum}}首</p>
						<p class="updata">更新时间{{updata}}</p>
					</div>
				</div>
				<div class="playall">
					<a href="javascript:;" id="playall" 
						@click="playAll(data1)">播放全部</a>
				</div>
			</div>
			<div class="coverImg" 
				:style="{background: 'url(' + pic +')'}">
			</div>
		</div>
		<div class="ratingWrap">
			<div class="wrapList">
				<div class="count">
					排行榜<span class="songnum"></span>
				</div>
				<ul class="ratedList">
					<li v-for="(item,index) in data1">
						<a href="javascript:;" @click="seclectSong(item)">
							<div class="list_order">{{index+1}}</div>
							<div class="list_song">
								<h3 class="songname">{{item.songname}}</h3>
								<p class="singname">{{item.singername}}</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Bus from "../../assets/eventBus"
	export default {
		name: 'list',
		data() {
			return {
				data1: [],
				pic: '',
				songnum: '',
				updata: '',
			}
		},
		methods: {
			getData(id) {
				this.$http.get("http://route.showapi.com/213-4?showapi_appid=49174&showapi_sign=67e1f36ea008490ea96ad4050258e20b&topid=" + id + "&").then((res) => {
					let result = res.body.showapi_res_body.pagebean.songlist;
					this.data1 = result;
					this.pic = result[0].albumpic_small;
					this.songnum = res.body.showapi_res_body.pagebean.total_song_num;
					this.updata = res.body.showapi_res_body.pagebean.update_time;
				})
			},
			seclectSong(song) {
				Bus.$emit('getSongMsg', song);
				Bus.$emit('show', true);
				Bus.$emit('hasplay', false);
			},
			playAll (songArr){
				Bus.$emit('getAllSong', songArr);
			}
		},
		created() {
			let id = this.$route.query.id;
			this.getData(id);
		},
		mounted() {
			this.$nextTick(function() {
				$('.listWrap').scroll(function() {
//					console.log($(this).scrollTop())
					if($(this).scrollTop()>=200){
						$('.topWrap').addClass("fixedTop")
						$('.ratingWrap').css("margin-top",'25rem')
					}else{
						$('.topWrap').removeClass("fixedTop")
						$('.ratingWrap').css("margin-top",'0')
					}
				})
			})
		}
	}
</script>

<style>
	.listWrap {
		position: fixed;
		bottom: 0;
		top: 0;
		width: 100%;
		z-index: 100;
		background: #FFFFFF;
		text-align: left !important;
		overflow: auto;
	}
	
	.topWrap {
		height: 27.4rem;
		width: 100%;
		position: relative;
		overflow: hidden;
		
	}
	.fixedTop{
		position: fixed;
		top: -20rem;
	}
	.list_top {
		height: 27.4rem;
		width: 100%;
		background: rgba(0, 0, 0, .2);
		display: flex;
		flex-flow: row wrap;
		align-content: space-between;
	}
	
	.list_top header,
	.ablums,
	.playall {
		width: 100%;
	}
	
	.list_top header {
		height: 4.4rem;
		background: rgba(0, 0, 0, .2);
	}
	
	.list_top header img {
		height: 2.5rem;
		margin: .9rem 0 0 1rem;
	}
	
	.ablums {
		display: flex;
		flex-flow: row;
		margin-top: 1.7rem;
		box-sizing: border-box;
		padding: 0 1.6rem;
	}
	
	.ablums_left {
		width: 12.5rem;
		height: 12.5rem;
	}
	
	.ablums_left img {
		height: 100%;
		object-fit: cover;
	}
	
	.ablums_right>h3,
	.ablums_right>p {
		width: 100%;
		color: white;
		margin-top: 4px;
	}
	
	.ablums_right>h3 {
		font-size: 16px;
		font-weight: lighter;
	}
	
	.ablums_right {
		flex: 1;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		padding-left: 8px;
	}
	
	.coverImg {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		background-repeat: no-repeat !important;
		background-size: cover !important;
		background-position: 50% !important;
		transform: scale(1.6);
		-webkit-transform: scale(1.6);
		filter: blur(20px);
		overflow: hidden;
	}
	
	.coverImg img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.6);
		-webkit-transform: scale(1.6);
	}
	
	.playall {
		height: 8.4rem;
		box-sizing: border-box;
		padding: 0 16px;
		text-align: center;
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
	}
	
	#playall {
		width: 17rem;
		height: 4rem;
		overflow: hidden;
		text-align: center;
		font-size: 16px;
		color: #fff;
		border-radius: 20px;
		background: #31c27c;
		line-height: 4rem;
		position: relative;
	}
	
	#playall::before {
		content: "";
		display: block;
		height: 0;
		width: 0;
		position: absolute;
		top: 1.2rem;
		left: 3.4rem;
		border-color: transparent transparent transparent #fff;
		border-width: .7rem 1.1rem;
		border-style: solid;
		border-radius: 2px;
	}
	
	.wrapList {
		font-size: 14px;
		color: gray;
	}
	
	.count {
		height: 5.4rem;
		margin: 0 16px -10px;
		font-size: 14px;
		line-height: 5.4rem;
	}
	
	.ratedList li {
		float: none;
		font-size: 14px;
	}
	
	.ratedList li a {
		display: block;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	
	.list_order {
		width: 4.5rem;
		text-align: center;
	}
	
	.list_song {
		flex: 1;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		padding: 1rem 0rem;
	}
	
	.list_song>h3,
	.list_song>p {
		width: 100%;
		color: gray;
	}
	
	.list_song>h3 {
		font-size: 16px;
		color: #000;
		line-height: 20px;
	}
</style>