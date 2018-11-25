<template>
	<div id="eHeader">
		<div class="top" @click="getout">
			<i class="iconfont">&#xe790;</i>
			<span v-if="cityName.length===0">正在搜索所在位置...</span>
			<span class="shenglue" v-else>{{cityName}}</span>
			<div class="sanjiao"></div>
		</div>
		<div class="bottom" @click="">
			<i class="iconfont">&#xe60d;</i>
			<span>搜索饿了么商家、商品名称</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapMutations, mapGetters} from "vuex"
	export default {
		data(){
			return {
				cityName:'',
				showRight:false,
			}
		},
		created(){
			var me=this;
			if(this.orderAddress.length!==0){
				this.cityName=this.orderAddress;
			}
			else{
				this.$nextTick(function  () {
					function myFun(result){
						var obj=result.center;
						var myGeo = new BMap.Geocoder();   
						myGeo.getLocation(new BMap.Point(obj.lng, obj.lat), function(res){      
						    if (res){
							    console.log(res.point);     
							    me.cityName=res.address;
							    me.setPosition(res.point);
							    me.setCity(res.address.slice(0,3));
						    }      
						});
					}

					var myCity = new BMap.LocalCity();
					myCity.get(myFun);
					/*var geolocation = new BMap.Geolocation();
					 geolocation.enableSDKLocation();
					 geolocation.getCurrentPosition(function(r){
					 	if(this.getStatus() == BMAP_STATUS_SUCCESS){
					 		console.log(r);
					 		 var mk = new BMap.Marker(r.point);
					 		 map.addOverlay(mk);
					 		 map.panTo(r.point);
					 		 alert('您的位置：'+r.point.lng+','+r.point.lat);
					 	}
					 	else {
					 		alert('failed'+this.getStatus());
					 	}        
					 });
					 */
				});
			}
		},
		methods:{
			getout:function (){
				this.showRight=true;
				this.$emit("getout",this.showRight);
				//alert(1);
			},
			...mapMutations({
				setPosition:'SET_POSITION',
				setCity:'SET_CITY',
			})
		},
		computed:{
			...mapGetters([
				'orderAddress',
				'position',
			])
		},
		watch:{
			orderAddress(newValue, oldValue){
				this.cityName=this.orderAddress;
			}
		}
	}
</script>
<style scoped lang='scss'>
	@import "@/assets/fonts/fonts.scss";
	@import "@/assets/css/variable.scss";

	#eHeader{
		padding:15px 15px 10px;
		background-image: linear-gradient(90deg,$blue-start,$blue-color);
		background-image: -webkit-linear-gradient(90deg,$blue-start,$blue-color);
		background-image: -o-linear-gradient(90deg,$blue-start,$blue-color);
		background-image: -ms-linear-gradient(90deg,$blue-start,$blue-color);
		.top{
			font-size: $font-main;
			font-weight: 700;
			color:#fff;
			display: flex;
			align-items: center;
			.shenglue{
				width:50%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin:0 10px 0 2px;
			}
			.sanjiao{
				border-width: 3px;
				border-style: solid;
				border-color: #fff transparent transparent transparent;
			}
		}
		.bottom{
			width:100%;
			font-size: 14px;
			font-family: simsun;
			margin-top: 15px;
			height:9.6vw;
			background-color: #fff;
			text-align:center;
			line-height: 9.6vw;
			color: #999;
			i{
				font-size: 14px;
				font-weight: 600;
			}
		}
	}
</style>