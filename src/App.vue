<template>
	<div id="app">
		<div class="top">
			<!--头部-->
			<header><i></i></header>
			<!--导航-->
			<nav>
				<router-link to='/'>推荐</router-link>
				<router-link to='/toplist'>排行榜</router-link>
				<router-link to='/search'>搜索</router-link>
			</nav>
		</div>
		<div class="wrap">
			<transition name="fade">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
		<div class="miniPlay" 
			v-show="miniPlay"
			@click="showPlay()">
			 <img :src="img"/>
			 <div class="Minicover">
			 	<playingicon 
			 	class='aa'
			 	v-show="iconani"
			 	:heights=2>
			 </playingicon>
			 </div>
		</div>
		<play 
			 ref="minis"
			 @showMini='getMini'
			 @icon="getIcon">
			
		</play>
	</div>
</template>
<script>
	import play from "./components/play/play"
	import playingicon from"./components/playingicon/playingicon"
	export default {
		name: 'app',
		data(){
			return{
				miniPlay:false,
				iconani:true,
				img:"",
			}
		},
		components:{
			play,
			playingicon,
		},
		methods:{
			showPlay(){
				this.$refs.minis.show()
			},
			getMini(msg){
				this.miniPlay = true;
				this.img = msg;
			},
			getIcon(msg){
				this.iconani = msg;
			}
			
		},
	}
</script>
<style>
	html,
	body {
		padding: 0;
		margin: 0;
		height: 100%;
		overflow: hidden;
		-webkit-tap-highlight-color: transparent;
		-webkit-text-size-adjust: none;
		font-size: 10px;
		background: #f4f4f4;
	}
	
	a {
		text-decoration: none;
		color: #000000;
		display: inline-block;
	}
	
	p {
		margin: 0;
	}
	
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	
	li {
		float: left;
	}
	
	h1,
	h2,
	h3 {
		margin: 0;
		font-weight: lighter;
	}
	input {
		outline: none;
		border: none;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
		overflow: auto;
	}
	
	.top {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}
	
	header {
		height: 4.4rem;
		background: #31c27c;
		width: 100%;
		overflow: hidden;
	}
	
	header i {
		display: block;
		background: url(./assets/logo.png) no-repeat;
		background-size: cover;
		height: 2.5rem;
		width: 9rem;
		margin: .9rem 0 0 1rem;
	}
	
	nav {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: space-around;
		align-content: space-around;
		background: #fff;
	}
	
	nav a {
		display: block;
		flex-grow: 1;
		height: 4rem;
		font-size: 1.6rem;
		line-height: 4rem;
		text-align: center;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.active {
		color: #31c27c;
		border-bottom: 2px solid #31c27c;
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
	.wrap {
		position: absolute;
		top: 8.4rem;
		bottom: 0;
		width: 100%;
		overflow: auto;
		font-size: 1.6rem;
	}
	.miniPlay{
		position: fixed;
		right: 1.5rem;
		bottom: 4rem;
		z-index: 101;
		height: 5rem;
		width: 5rem;
		border-radius: 50%;
		background: #2C3E50;
		overflow: hidden;
		box-shadow:  -5px 5px 50px #2C3E50;
	}
	.miniPlay img{
		width: 100%;
		height: 100%;
	}
	.Minicover{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,.3);
	}
	.aa{
		top: 50% !important;
		left: 50%;
		 transform: translate(-50%, -50%);  
	}
</style>