<template>
	<div class="recommedWrap">
		<template v-if="already">
			<swiper :options="swiperOption" ref="mySwiper">
			<!-- 这部分放你要渲染的那些内容 -->
			<swiper-slide v-for="item in data1">
				<a href="javascript:;" @click="seclectSong(item)">
					<img :src="item.albumpic_big
						" class="slider" />
				</a>
			</swiper-slide>
			<!-- 这是轮播的小圆点 -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<div class="recommeds radio">
			<h2>新歌推荐</h2>
			<ul>
				<li v-for="item in data2">
					<a href="javascript:;" @click="seclectSong(item)">
						<img :src="item.albumpic_big" alt="" />
						<span class="playBtn"></span>
					</a>
					<h3>{{item.songname}}
						--
						<span class="singname">{{item.singername}}</span>
					</h3>
				</li>

			</ul>
		</div>
		<div class="recommeds hotList">
			<h2>热门歌曲</h2>
			<ul>
				<li v-for="item in data3">
					<a href="javascript:;" @click="seclectSong(item)">
						<img :src="item.albumpic_big" alt="" />
						<span class="playBtn"></span>
					</a>
					<h3>{{item.songname}}
						--
						<span class="singname">{{item.singername}}</span>
					</h3>
				</li>
			</ul>
		</div>
	</template>
	<template v-else>
		<img src="../../assets/loading.gif"/>
	</template>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import Bus from "../../assets/eventBus"
	//	import play from "../play/play"
	export default {
		name: 'recom',
		data() {
			return {
				swiperOption: {
					notNextTick: true,
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					autoplay: 3000,
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 30,
				},
				data1: [],
				data2: [],
				data3: [],
				choseSong: {},
				already:false,
				countNum:0,
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		methods: {
			seclectSong(song) {
				Bus.$emit('getSongMsg', song);
				Bus.$emit('show', true);
				Bus.$emit('hasplay', false);
			},
			getData(id, len, data) {
				this.$http.get("http://route.showapi.com/213-4?showapi_appid=49174&showapi_sign=67e1f36ea008490ea96ad4050258e20b&topid=" + id + "&").then((res) => {
					this.countNum++;
					if(this.countNum==3){
						this.already=true;
					}
					let result = res.body.showapi_res_body.pagebean.songlist;
					for(var i = 0; i < len; i++) {
						data.push(result[i])
					}
				})
			}
		},
		created() {
			this.getData(5, 5, this.data1);
			this.getData(3, 5, this.data2);
			this.getData(27, 6, this.data3);
		},
		mounted() {
			
			this.$nextTick(() => {
				new Swiper('.swiper-container', {
					loop: true,
					autoplay: 2000,
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination'
					}
				})
			})
		}
	}
</script>
<style>
	.recommedWrap {
		position: relative;
		width: 100%;
		background: #f4f4f4;
	}
	
	.swiper-slide {
		height: 15rem;
		background: silver;
		text-align: center;
	}
	
	.swiper-slide a {
		display: block;
		height: 100%;
	}
	
	.swiper-slide img {
		width: 100%;
		margin-top: -5rem;
		/*height: 100%;*/
		vertical-align: top;
		object-fit: cover;
	}
	
	.recommeds {
		margin: 1.4rem 1rem;
	}
	
	.recommeds ul {
		overflow: hidden;
		width: 100%;
		margin-left: 0.4rem;
	}
	
	.recommeds h2 {
		margin-bottom: 1rem;
		font-size: 1.6rem;
		text-align: left;
	}
	
	.recommeds ul li {
		float: left;
		width: 50%;
		padding-right: .8rem;
		box-sizing: border-box;
		min-height: 14rem;
	}
	
	.recommeds ul li a {
		position: relative;
		width: 100%;
		min-height: 14rem;
		background: #E5E5E5;
	}
	
	.recommeds ul li img {
		width: 100%;
	}
	
	.recommeds ul li h3 {
		font-size: 1.4rem;
		height: 40px;
		padding: .5rem .7rem;
		text-align: left;
	}
	
	.singname {
		display: inline-block;
		max-width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		vertical-align: bottom;
		font-size: 1.2rem;
		color: #808080;
	}
	
	.playBtn {
		position: absolute;
		height: 2.4rem;
		width: 2.4rem;
		right: .5rem;
		bottom: 1rem;
		background: url(../../assets/list_sprite.png) no-repeat;
		background-size: 2.4rem;
		background-position: 0 0;
	}
</style>