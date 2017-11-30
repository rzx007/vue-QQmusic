<template>
	<span class="playing" :style="{height:heights+'rem'}">
			<i></i>
			<i></i>
			<i></i>
			<i></i>
	</span>
</template>

<script>
	export default{
		name:'palyingicon',
		props:["heights"],
		data(){
			return{
				
			}
		}
	}
</script>

<style>
.playing {
	position: absolute;
	display: block;
	width: auto;
	top: 0;
	overflow-y: hidden;
}

.playing  i {
	display: block;
	float: left;
	margin-left: 2px;
	width: .2rem;
	height: 100%;
	background-color: #31c27c;
	font-weight: bolder;
	animation-name:move;
	animation-timing-function: ease-in-out;
	animation-direction: alternate;
	animation-iteration-count: infinite;
	animation-fill-mode: forwards;
}
.playing i:nth-child(1){
	margin-left:0 ;
	animation-duration: 400ms;
}
.playing i:nth-child(2){
	animation-duration: 600ms;
}
.playing i:nth-child(3){
	animation-duration: 700ms;
}
.playing i:nth-child(4){
	animation-duration: 500ms;
}
@keyframes move{
	from{margin-top: 0;}
	to{margin-top: 100%;}
}
</style>