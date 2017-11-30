<template>
	<div class="searchWrap section" id="search">
		<div class="searchBar">
			<div class="search">
				<span class="seachImg"></span>
				<input type="text" name="song" 
					id="song"
					:value="val"
					placeholder="搜索歌曲、歌单、专辑" 
					@keyup.enter="inputs()" 
					@focus="tolggerCancel"/>
				<span id="claen"></span>
			</div>
			<div id="cancel" 
				v-if="showCancel"
				@click="clickCancel">取消</div>
		</div>
		<div id="listWrap">
			<ul id="list">
				<template v-if="isHistory">
					<li class="history" 
						v-for="(item,index) in historyData" 
						@click="Historysearch(item)">
						<span class="aa1"></span>
						<span>{{item}}</span>
						<i class="cleanThis"
							@click.stop="deleteThis(index)">
						</i>
					</li>
				</template>
				<template  v-else >
					<li v-for="item in songList">
						<a href="javascript:;" @click="seclectSong(item)">
							<img :src="item.albumpic_small" />
							<div>
								<h3>{{item.songname}}</h3>
								<p>{{item.singername}}</p>
							</div>
						</a>
					</li>
					<p @click="more()" v-show="moreShow" class="more">
				加载更多</p>
				</template>
			</ul>
			
		</div>
	</div>
</template>

<script>
	import Bus from "../../assets/eventBus"
	export default {
		name: 'search',
		data() {
			return {
				songList: [],
				limitNum: 1,
				val: null,
				moreShow: false,
				isHistory: true,
				historyData:[],
				showCancel:false,
			}
		},
		created () {		
			var historyStr = localStorage.getItem('his');
			this.historyData = historyStr.split(",");
		},
		methods: {
			inputs() {
				var song = document.getElementById("song");
				if(!song.value) {
					return false;
				} else {
					this.songList = [];
					this.val = song.value;
					this.limitNum = 1;
					this.isHistory=false
					this.getData(song.value, this.limitNum);
					this.saveHistory(song.value);
				}
			},
			Historysearch(his){
				this.val = his;
				this.songList = [];
				this.limitNum = 1;
				this.isHistory=false
				this.getData(his, this.limitNum);
			},
			seclectSong(song) {
				Bus.$emit('getSongMsg', song);
				Bus.$emit('show', true);
				Bus.$emit('hasplay', false);
			},
			getData(songs, page) {
				var self = this;
				let url = "http://route.showapi.com/213-1?showapi_appid=49174&showapi_sign=67e1f36ea008490ea96ad4050258e20b&keyword=" + songs + "&page=" + page + "&";
				this.$http.get(url).then(function(res) {
					var data = res.body.showapi_res_body.pagebean.contentlist;
					data.forEach((item) => {
						self.songList.push(item)
					})
					this.moreShow = true;
					//					console.log(this.songList)
				})
			},
			tolggerCancel(){
				this.showCancel = true;
			},
			clickCancel(){
				this.val =null;
				this.isHistory =true;	
				this.showCancel =false;
			},
			deleteThis(index){
				var historyStr = localStorage.getItem('his');
				var hisArr = historyStr.split(",")
				hisArr.splice(index,1);
				localStorage.setItem('his',hisArr);
				this.historyData.splice(index,1);
			},
			more() { //点击加载更多
				this.limitNum++
					this.getData(this.val, this.limitNum)
			},
			saveHistory(val) {
				var historyArr = [];
				if(!localStorage.getItem('his')) {
					historyArr.push(val)
					localStorage.setItem('his', historyArr);
				} else {
					var historyStr = localStorage.getItem('his');
					historyArr = historyStr.split(",");
					var isAlreadyHave = false;
					for(var i = 0; i < historyArr.length; i++) {
						if(historyArr[i] === val) {
							isAlreadyHave = true;
						}
					}
					if(!isAlreadyHave) {
						historyArr.push(val);
						localStorage.setItem('his', historyArr);
					}
					this.historyData = historyArr;
				}
//				console.log(localStorage.getItem('his'));
			}
		}
	}
</script>

<style>
	.searchBar {
		background: #f4f4f4;
		padding: 10px;
		display: flex;
		flex-direction: row;
	}
	
	.searchBar .search {
		flex: 1;
		padding: 8px 12px;
		background: #FFFFFF;
		border-radius: 4px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-content: space-around;
	}
	
	.seachImg {
		display: inline-block;
		line-height: 33px;
		height: 1.8rem;
		width: 1.8rem;
		background: url(../../assets/search.png) no-repeat;
		background-size: 1.8rem;
		vertical-align: middle;
	}
	
	#song {
		flex: 1;
	}
	
	#cancel {
		padding: 0 10px;
		text-align: center;
		line-height: 33px;
		font-size: 1.6rem;
		/*display: none;*/
	}
	
	#listWrap {
		position: absolute;
		top: 5.4rem;
		bottom: 0;
		width: 100%;
		overflow: auto;
	}
	
	#listWrap ul li {
		float: none;
		padding: 14px 4px;
		border-bottom: 1px solid #e5e5e5;
		position: relative;
		text-align: left;
	}
	
	#list li img {
		vertical-align: middle;
		height: 4rem;
		width: 4rem;
	}
	
	#list li div {
		position: absolute;
		top: 14px;
		right: 0;
		left: 4rem;
		vertical-align: middle;
		padding-left: 6px;
	}
	
	#list li div h3 {
		font-size: 1.6rem;
		font-weight: normal;
		line-height: 1.8rem;
	}
	
	#list li div p {
		font-size: 1.2rem;
		line-height: 1.8rem;
		color: #808080;
	}
	
	.history {
		font-size: 1.6rem;
		box-sizing: border-box;
		padding: 1.4rem 1.5rem !important;
	}
	
	.history .aa1 {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-image: url(../../assets/clock_ic.png);
		background-repeat: no-repeat;
		background-size: cover;
		text-indent: -999px;
		vertical-align: middle;
		margin-right: 1.6rem;
	}
	
	.history i {
		position: absolute;
		right: 1.5rem;
		height: 2rem;
		width: 2rem;
		top: 1.5rem;
	}
	
	.history i::after,
	.history i::before {
		content: '';
		display: block;
		position: absolute;
		transform: rotateZ(-45deg);
	}
	
	.history i::after {
		border-bottom: 1px solid gray;
		height: 0;
		width: 80%;
		left: 10%;
		top: 50%;
	}
	
	.history i::before {
		border-right: 1px solid gray;
		height: 80%;
		width: 0;
		left: 50%;
		top: 10%;
	}
	
	#cleanAll {
		text-align: center;
		color: #31c27c;
		font-size: 1.6rem;
		height: 4.4rem;
		line-height: 4.4rem;
	}
	
	.more {
		font-size: 1.6rem;
		color: #31c27c;
		padding: 1rem 0;
	}
</style>