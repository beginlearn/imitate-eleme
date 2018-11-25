<template>
	<div id="home-bottom">
		<h3>推荐商家</h3>
		<home-nav></home-nav>
	</div>
</template>
<script type="text/javascript">
	import homeNav from "@/components/homeNav.vue"
	export default {
		data(){
			return {

			}
		},
		components:{
			homeNav,
		}
	}
</script>
<style lang="scss" scoped>
	@import "@/assets/css/variable.scss";

	#home-bottom{
		color:$font_color_small;
		h3{
			color:$font_color_main;
			font-size: 15px;
			font-weight: 300;
			display: flex;
			align-items:center;
			justify-content:center;
			&:before, &:after{
				display:block;
				content:'';
				width:20px;
				height:1px;
				background-color: $font_color_small;
				margin:0 5%;
			}
		}
	}
</style>
