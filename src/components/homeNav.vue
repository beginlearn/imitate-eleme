<template>
	<div id="home-nav">
		<!-- <span @click="alertWindow">{{outsideFilter.inside_sort_filter[0].name}}<i class="sanjiao"></i></span>
		<span @click="showJuli">距离最近</span>
		<span @click="showPinzhi">品质联盟</span>
		<span @click="alertFilter">筛选<i class="iconfont">&#xeac3;</i></span> -->
		<span v-for="(navMsg, index) in transToNav" :class="index===indexCount?'ziti':''" @click="changeIndex(index)">
			{{navMsg.msg}}
			<i v-if="navMsg.qT==='三角'" class='sanjiao'></i>
			<i v-if="navMsg.qT==='字体图标'" class="iconfont">&#xeac3;</i>
		</span>
	</div>
	
</template>
<script type="text/javascript">
	import {mapGetters} from "vuex"
	export default {
		data(){
			return {
				indexCount:0	
			}
		},
		props:[
			"transToNav",
		],
		created(){
			console.log(this.transToNav);
		},
		computed:{
			...mapGetters([
				'position',
			])
		},
		methods:{
			changeIndex(index){
				this.indexCount=index;
				this.$emit('listenMsgFromNav', index);
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	#home-nav{
		color:$font_color_small;
		font-size: $font-small;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height:6vw;
		span{
			font-family: 'Helvetica Neue','Tahoma','Arial','PingFangSC-Regular','Hiragino Sans GB','Microsoft Yahei','sans-serif';
			-webkit-tap-highlight-color: transparent;
			.sanjiao{
				margin-left: 5px;
				display: inline-block;
				border-width:3px;
				border-style: solid;
				border-color: #000 #fff #fff #fff; 
			}
			&.ziti{
				font-weight: bold;
			}
		}
	}
</style>