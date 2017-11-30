<template>
	<div class="hotWrap section" id="toplist">
		<template v-if="already">
			<ul class="rating">
			<li>
				<router-link to='/toplist/list?id=3'>
					<img :src="[!data1 ? '': data1[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">
					<div class="innerRight">
						<h3>欧美</h3>
						<p v-for="(item,index) in data1">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>
				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=4'>
					<img :src="[!data2 ? '': data2[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">

					<div class="innerRight">
						<h3>流行</h3>
						<p v-for="(item,index) in data2">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=5'>
					<img :src="[!data3 ? '': data3[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">

					<div class="innerRight">
						<h3>内地</h3>
						<p v-for="(item,index) in data3">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=6'>
					<img :src="[!data4 ? '' : data4[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">

					<div class="innerRight">
						<h3>港台</h3>
						<p v-for="(item,index) in data4">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=16'>
					<img :src="[!data5 ? '' : data5[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">

					<div class="innerRight">
						<h3>韩国</h3>
						<p v-for="(item,index) in data5">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=17'>
					<img :src="[!data6 ? '' : data6[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">
					<div class="innerRight">
						<h3>流行</h3>
						<p v-for="(item,index) in data6">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=26'>
					<img :src="[!data7 ? '' : data7[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">
					<div class="innerRight">
						<h3>流行</h3>
						<p v-for="(item,index) in data7">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
			<li>
				<router-link to='/toplist/list?id=27'>
					<img :src="[!data8 ? '' : data8[0].albumpic_small]" /><span></span>
				</router-link>
				<div class="rateRight">
					<div class="innerRight">
						<h3>流行</h3>
						<p v-for="(item,index) in data8">{{index+1}}.
							<span class="text_name">{{item.songname}}</span>-{{item.singername}}</p>
					</div>

				</div>
			</li>
		</ul>
	</template>
	<template v-else>
		<img src="../../assets/loading.gif"/>
	</template>	
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>

</template>
<script>
	import list from "../list/list"
	import Vue from 'vue'
	import Router from 'vue-router'
//	Vue.use(Router)
//	const routes = [{
//		path: '/list',
//		component: list
//	}, ]
//	const router = new Router({
//		routes // （缩写）相当于 routes: routes
//	})
	export default {
		name: 'toplist',
		data() {
			return {
				data1: [],
				data2: [],
				data3: [],
				data4: [],
				data5: [],
				data6: [],
				data7: [],
				data8: [],
				data9: [],
				countNum:0,
				already:false,
			}
		},
//		router,
		methods: {
			getData(id, len, data) {
				this.$http.get("http://route.showapi.com/213-4?showapi_appid=49174&showapi_sign=67e1f36ea008490ea96ad4050258e20b&topid=" + id + "&").then((res) => {
					this.countNum++;
					if(this.countNum==7){
						this.already=true;
					}
					let result = res.body.showapi_res_body.pagebean.songlist;
					for(var i = 0; i < len; i++) {
						data.push(result[i])
					}
				})
			}
		},
		created() { //api限制所以很难看-_-
			this.getData(3, 3, this.data1);
			this.getData(4, 3, this.data2);
			this.getData(5, 3, this.data3);
			this.getData(6, 3, this.data4);
			this.getData(16, 3, this.data5);
			this.getData(17, 3, this.data6);
			this.getData(26, 3, this.data7);
			this.getData(27, 3, this.data8);
			this.getData(28, 3, this.data9);
		}
	}
</script>

<style>
	.rating {
		margin: 0 1rem;
		overflow: hidden;
	}
	
	.rating li {
		width: 100%;
		min-height: 3rem;
		margin-top: 1rem;
		background: #fff;
		height: 10rem;
		overflow: hidden;
		/*display: flex;
	flex-direction: row;
	flex-wrap: nowrap;*/
	}
	
	.rating li a {
		height: 10rem;
		width: 10rem;
		position: relative;
		float: left;
	}
	
	.rating li a img {
		width: 100%;
		height: 100%;
	}
	
	.rateRight {
		margin-left: 10rem;
		height: 100%;
	}
	
	.innerRight {
		margin: 0 10px 0 15px;
		height: 100%;
		box-sizing: border-box;
		padding: .4rem 0;
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: space-around;
		text-align: left;
	}
	
	.innerRight h3 {
		font-size: 16px;
		flex: 1;
		color: #000000;
	}
	
	.innerRight p {
		font-size: 14px;
		margin: 0;
		flex: 1;
		color: rgba(0, 0, 0, .5);
		height: 24px;
		/*max-width: 80%;*/
		overflow: hidden;
		white-space: nowrap;
	}
	
	.innerRight p span {
		color: #000000;
	}
	.fade-leave-active{
		transition: opacity .3s
	}
	.fade-enter-active
	 {
		transition: opacity .3s .3s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>