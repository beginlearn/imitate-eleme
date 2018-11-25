<template>
	<div id="city_choice">
		<!-- <scroll :mouseWheel="true"> -->
			<!-- <div> -->
				<!-- <div class="header">
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20">
					    <path d="M16 0 L5 10 L16 18 L16.5 18.5 L5.5 10.5 L16.5 0.5 Z" />
					</svg>
					<span>城市选择</span>
					<div class="input_search">
						<i class="iconfont">&#xe60d;</i>
						<input type="text" placeholder="输入城市名、拼音或首字母查询">
					</div>
				</div> -->
				<div @mousewheel="moveSlow($event)">
					<div class="colorGradient header">
						<span @click="goTo">
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20">
							    <path d="M16 0 L5 10 L16 18 L16.5 18.5 L5.5 10.5 L16.5 0.5 Z" />
							</svg>
						</span>
						<span>城市选择</span>
					</div>
					<div ref="scrollHidden" class="colorGradient header_center" style="height:40px;">
						<div class="input_search">
							<i class="iconfont">&#xe60d;</i>
							<input type="text" placeholder="输入城市名、拼音或首字母查询" v-model="cityInput">
						</div>	
					</div>
					
				</div>
				<scroll :mouseWheel="true" :listenScroll="true" @scroll="betterScroll" ref="bScroll">
					<div class="city_list" ref="elemList">
						<div v-show="cityInput.length===0" v-for="(items,index) in citylist" :key="items.type+index">
							<h4 class="city_title">{{items.type}}</h4>
							<div @click="getCity(item, items.type)" class="city_item" v-for="item in items.city_name">
								<span>{{item}}</span>
							</div>
						</div>
						<div v-show="cityChoiceByInput.length!==0" @click="getCity(todo)" class="city_item" v-for="(todo, todoIndex) in cityChoiceByInput" :key="todo+todoIndex">
							<span>{{todo}}</span>
						</div>
						<div v-show="cityChoiceByInput.length===0 && cityInput.length!==0" class="no_city">
							<span>无结果</span>
						</div>
					</div>
				</scroll>
				
			<!-- </div> -->
		<!-- </scroll> -->
		<div class="right_side" v-if="cityInput.length===0">
			<span @click="scrollTo(ind)" class="zimu" v-if="todos.type.length===1" v-for="(todos, ind) in citylist" :key="ind">{{todos.type}}</span>
		</div>

	</div>
	
</template>
<script>
	import scroll from "@/common/scroll.vue"
	import {mapMutations} from "vuex"
	export default {
		data(){
			return {
				scrollHiddenDom:false,   // 表示输入城市的那一栏是否被滚动上去
				cityInput:'',
				cityChoiceByInput:[],
			}
		},
		props:{
			citylist:{
				type:Array,
				default:function (){
					return [];
				}
			}
		},
		created(){
			console.log(this.citylist);
		},
		components:{
			scroll,
		},
		methods:{
			moveSlow(ev){
				let h=this.$refs.scrollHidden.offsetHeight;
				if(ev.wheelDeltaY<0){   //表示向上滚动
					this.$refs.scrollHidden.style.marginTop=ev.wheelDeltaY+'px';
					this.scrollHiddenDom=true;
				}
				else{
					this.$refs.scrollHidden.style.marginTop='-1px';
					this.scrollHiddenDom=false;
				}
			},
			goTo(){         //点击左上角返回键返回
				this.$emit("pageGoBack", false);
			},
			/*
			**该方法是由于滚动到最顶部时，由于在scroll组件中设置了向下拉会调用BScroll的stop方法，导致页面**出现一个卡顿，所以在此定义此方法，主要是借用了better-scroll的movingDirectionY这个表示方向的**属性
			*/
			betterScroll(pos, movingDirectionY){
				if(pos.y>=0 && this.scrollHiddenDom && movingDirectionY===-1){
					this.$refs.scrollHidden.style.marginTop='-1px';
					this.scrollHiddenDom=false;
				}
			},
			getCity(name, type){           //获取点击的城市名称，并返回上一个页面
				let me=this;
				let myGeo = new BMap.Geocoder();
				if(type==="当前定位城市"){
					return;
				}
				// 将地址解析结果显示在地图上,并调整地图视野
				myGeo.getPoint(name, function(point){
					if (point) {
			          	console.log(point);
			          	me.setPosition(point);
			          	me.setCity(name);
			          	me.$emit("pageGoBack", false, name);
					}else{
						alert("您选择地址没有解析到结果!");
					}
				});
			},
			scrollTo(ind){
				//console.log(ind);
				let domList=this.$refs.elemList.children;
				let me=this;
				//console.log([].slice.call(domList));
				[].slice.call(domList).forEach(function (el, index){
					if(index===ind){
						me.$refs.bScroll.scrollToElement(el,0);
					}
				})
			},
			...mapMutations({
				setPosition:'SET_POSITION',
				setCity:'SET_CITY',
			})
		},
		watch:{
			cityInput(newValue, oldValue){    //用于监控城市搜索输入框中是否
					let flag=false;
					if(newValue.length!==0){
						this.citylist.forEach((items)=>{
							items.city_name.forEach((item)=>{
								if(item.indexOf(newValue)>=0){
									this.cityChoiceByInput.push(item);
									flag=true;
								}
							});
							if(!flag){
								this.cityChoiceByInput=[];
							}
						});	
					}
					else{
						this.cityChoiceByInput=[];
					}
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	#city_choice{
		width:100%;
		z-index:100;
		background-color: #fff;
		position: fixed;
		top:0;
		left:0;
		height: 100%;
		overflow: hidden;
		.colorGradient{
			 background: -webkit-linear-gradient(left, #0af , #0085ff); /* Safari 5.1 - 6.0 */
			 background: -o-linear-gradient(right, #0af, #0085ff); /* Opera 11.1 - 12.0 */
			 background: -moz-linear-gradient(right, #0af, #0085ff); /* Firefox 3.6 - 15 */
			 background: linear-gradient(to right, #0af , #0085ff); /* 标准的语法 */
			 width:100%;
		}
		.header{
			 height:sizeChange(46px);
			 line-height: sizeChange(46px);
			 padding-bottom:5px;
			 font-size: 19px;
			 color:$bg_color;
			 position: relative;
			 z-index:200;
			 svg{
			 	position: absolute;
			 	left:5px;
			 	top:10px;
			 	stroke: $bg_color;
			 	stroke-width:2px;
			 }
		}
		.header_center{
			height:sizeChange(40px);
			z-index:150;
			transition:0.3s;
			.input_search{
			 	height:sizeChange(32px);
			 	width:85%;
			 	margin:-1px auto 0;
			 	border-radius: sizeChange(16px);
			 	background-color: #fff;
			 	display: flex;
			 	align-items: center;
			 	i{
			 		color:black;
			 		font-size: 13px;
			 		margin:0 10px;
			 	}
			 	input{
			 		outline: none;
			 		border:none;
			 		width:86%;
			 		height:100%;
			 		box-sizing: border-box;
			 		font-size: 12px;
			 	}
			 }
		}
		.city_list{
			font-size: 14px;
			overflow: hidden;
			.city_title{
				background-color: #f5f5f5;
				height:35px;
				padding-left: 10px;
				text-align: left;
				line-height: 35px;
				font-weight: normal;
			}
			.city_item{
				height:48px;
				line-height: 48px;
				text-align: left;
				margin-left: 10px;
				border-bottom: 1px solid #ddd;
			}
			.no_city{
				margin-top:60%;  /*这个60%是以宽度为基准*/
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.right_side{
			position: absolute;
			right:0;
			top:sizeChange(200px);
			width:10%;
			font-size: 12px; 
			color:#999;
			display: flex;
			flex-direction: column;
			.zimu{
				margin-top:5px;
			}
		}
	}
</style>