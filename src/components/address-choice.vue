<template>
	<div id="address-choice">
		<div class="header">
			<span @click="goBack">
				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20">
				    <path d="M16 0 L5 10 L16 18 L16.5 18.5 L5.5 10.5 L16.5 0.5 Z" />
				</svg>
			</span>
			<span>选择收货地址</span>
		</div>
		<div class="city_list">
			<div class="city_left" @click="showCityList">
				<span v-if="this.city.length!==0">{{city}}</span>
				<span v-else>选择收货地址</span>
				<span class="daosanjiao"></span>
			</div>
			<div class="city_right">
				<input type="text" placeholder="请输入地址" v-model="addressInput">
				<i class="iconfont">&#xe60d;</i>
				<span @click="clearInput" class="clear" v-show="addressInput.length!==0">
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height='20'>
						<path d="M7 7 L13 13 Z" />
						<path d="M7 13 L13 7 Z" />
					</svg>
				</span>
			</div>
		</div>
		<div class="city_search" v-if="addressInput.length!==0">
			<div @click="changePos(todos)" class="city_search_li" v-for="(todos,index) in searchResult" :keys="todos.city_id">
				<div class="city_search_li_left">
					<h4>{{todos.name}}</h4>
					<span>{{todos.address}}</span>
				</div>
				<p class="city_search_li_right">{{todos.distance}}</p>
			</div>
			<section class="search_error" v-if="searchError">
				<img src="https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif">
				<p>没有搜索结果</p>
				<p>换个关键词试试</p>
			</section>
		</div>
		<city-choice v-if="cityListShow" :citylist="arr" @pageGoBack="cityListShowWhether"></city-choice>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters, mapMutations} from "vuex"
	import {getMockData, getFilter} from "@/api/getData.js"
	import cityChoice from "@/components/cityChoice.vue"

	export default {
		data(){
			return {
				arr:[],    //存储城市信息
				//choiceCity:false,   
				cityListShow:false,
				addressInput:'',
				searchResult:[],   //存储城市内地址搜索获取到的数据
				searchError:false,  //地址搜索返回是否成功
				show:true,
			}
		},
		created(){
			if(this.city.length!==0){
				this.arr.push({
					type:"当前定位城市",
					city_name:[this.city]
				});
			}
			//获取城市列表信息
			getMockData().then((response)=>{
				this.arr.push(...response.data.data.city);
				//console.log(this.arr);
			}).catch(function (err){
				console.log(err);
			})
		},
		computed:{
			...mapGetters([
				'city',
				'position',
			])
		},
		components:{
			cityChoice,
		},
		methods:{
			showCityList(){
				this.cityListShow=true;
			},
			clearInput(){
				this.addressInput='';
			},
			cityListShowWhether(bool, name){
				this.cityListShow=bool;
				this.addressInput='';
				if(name){
					this._changeArr({
						type:"当前定位城市",
						city_name:[name]
					});
				}
			},
			goBack(){
				this.$emit("goBack", false);
			},
			changePos(todos){   //该方法点击后改变收货地址
				this.setOrderAddress(todos.address);
				this.setPosition({
					lng:todos.longitude,
					lat:todos.latitude
				});
				this.$emit("goBack", false);
				this.$emit("clickAddress", todos);
			},
			_changeArr(obj){
				if(this.arr[0].type==="当前定位城市"){
					this.arr.splice(0,1,obj);
				}
				else{
					this.arr.unshift(obj);
				}
			},
			...mapMutations({
				setPosition:'SET_POSITION',
				setOrderAddress:'SET_ORDERADDRESS',
			})

		},
		watch:{
			addressInput(newValue, oldValue){
				this.searchResult=[];
				if(newValue.length!==0){
					getFilter(`/searchaddress/${newValue}`, this.position).then((res)=>{
						if(JSON.parse(res.data).length===0){
							this.searchError=true;
						}
						else{
							this.searchError=false;
							//console.log(JSON.parse(res.data));
							this.searchResult.push(...JSON.parse(res.data));
						}
						
					}).catch((err)=>{
						console.log(err);
					});
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	#address-choice{
		/*position:relative;*/
		position: absolute;
   		top: 0;
   		left:0;
		background-color: #f4f4f4;
		width:100%;
		height:100%;
		z-index:50;
		.header{
			 background: -webkit-linear-gradient(left, #0af , #0085ff); /* Safari 5.1 - 6.0 */
			 background: -o-linear-gradient(right, #0af, #0085ff); /* Opera 11.1 - 12.0 */
			 background: -moz-linear-gradient(right, #0af, #0085ff); /* Firefox 3.6 - 15 */
			 background: linear-gradient(to right, #0af , #0085ff); /* 标准的语法 */
			 width:100%;
			 height:sizeChange(43px);
			 line-height: sizeChange(43px);
			 font-size: 19px;
			 color:$bg_color;
			 /*position: fixed;*/
			 position: absolute;
			 z-index:20;
			 svg{
			 	position: absolute;
			 	left:5px;
			 	top:10px;
			 	stroke: $bg_color;
			 	stroke-width:2px;
			 }
		}
		.city_list{
			display: flex;
			position: relative;
			top: sizeChange(43px);
			height:sizeChange(55px);
			background-color: #fff;
			align-items:center;
			.city_left{
				width:20%;
				box-sizing: border-box;
				padding:5%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 12px;
				position: relative;
				.daosanjiao{
					position: absolute;
					display: inline-block;
					width:0;
					height:0;
					border-top: 3px solid black;
					border-left: 3px solid  transparent;
					border-right: 3px solid  transparent;
					top:50%;
					right:5px;
					margin-top: -1px;
				}
			}
			.city_right{
				flex-grow:2;
				margin:0 3%;
				height:sizeChange(40px);
				position: relative;
				input{
					background-color:#f4f4f4; 
					outline: none;
					border:none;
					width:100%;
					height:100%;
					box-sizing: border-box;
					padding-left: 20px;
				}
				i{
					position: absolute;
					font-size: 12px;
					left:5px;
					top:50%;
					margin-top:-6px;
				}
				.clear{
					position: absolute;
					right:15px;
					top:50%;
					transform: translateY(-50%);
					display: flex;
					align-items: center;
					svg{
						stroke: #3c66ab;
				 		stroke-width:2px;
					}
				}
			}
		}
		.city_search{
			position: absolute;
			top:sizeChange(95px);
			width:100%;
			background-color: #fff;
			.city_search_li{
				display: flex;
				border-bottom: 1px solid #eee;
				font-size: 12px;
				padding:2.5% 3%;
				color:#333;
				font-weight:400;
				/*height:sizeChange(60px);*/
				.city_search_li_left{
					width:85%;
					text-align: left;
					margin-left: 2%;
					h4{
						font-size: 15px;
						font-weight: 700;
					}
				}
				.city_search_li_right{
					
					text-align: center;
				}
			}
			.search_error{
				padding-top: 40%;
				width:100%;
				height:70vw;
				background-color:#f4f4f4;
				img{
					width:53vw;
				}
				p{
					padding-top: 10px;
					color:#6a6a6a;
					font-size:18px;
					&:last-child{
						font-size:12px;
						color:#999;
					}
				}
			}
		}
		}
</style>