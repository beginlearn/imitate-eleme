<template>
	<div id="restaurants-list" ref='restaurantsList'>
		<div class="list-item" v-for="(restaurant, index) in restOrderByZonghe" :key='index'>
			<div class="left-picture">
				<img :src="_chuliData(restaurant).img">
			</div>
			<div class="right-content">
				<section class="list1">
					<h4>{{_chuliData(restaurant).name}}</h4>
					<p>
						<span v-if="_chuliData(restaurant).supports.length!==0" v-for="arr in _chuliData(restaurant).supports">{{arr.icon_name}}</span>
					</p>
					
				</section>
				<section class="list2">
					<div class="list2-xx">
						<div :ref="'huixing'+index">
							<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+">
						</div>
						<div :style="{width:_chuliData(restaurant).rating/5*w+'px'}" class="showXing">
							<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=">
							}
						
						</div>
					</div>
					<!-- 评分、打星 -->
					<div class="list2-sp list2-margin">
						<div>
							<span>{{_chuliData(restaurant).rating}}</span>
							<span>月售{{_chuliData(restaurant).recent_order_num}}单</span>	
						</div>
						<div v-if="_chuliData(restaurant).delivery_mode">
							<span :style="colorGradient(_chuliData(restaurant).delivery_mode)">{{_chuliData(restaurant).delivery_mode.text}}</span>
						</div>
					</div>
					<!-- 配送费、距离 -->
					<div class="list2-sp">
						<p>
							<span>{{_chuliData(restaurant).description.qiSong}}</span>
							<span>{{_chuliData(restaurant).description.description}}</span>
						</p>
						<p>
							<span>{{Math.round(_chuliData(restaurant).distance/10)/100+'km'}}</span>
							<span>{{_chuliData(restaurant).order_lead_time+'分钟'}}</span>
						</p>
					</div>
					<!-- 描述、口碑 -->
					<div class="list2-sp">
						<div>
							<span :style="{color:'#'+tag.color, border:'1px solid #'+tag.border}" v-for="(tag, idx) in _chuliData(restaurant).support_tags" :key=idx>{{tag.text}}</span>
						</div>
					</div>
					<!-- 活动 -->
					<div class="list2-active">
						<div  v-if="ind<2 || (ind>=2 && really[index])" v-for="(active, ind) in _chuliData(restaurant).activities" :key="ind">
							<p class="active-text">
								<i :style="{background:'#'+active.icon_color}">{{active.icon_name}}</i>
								<span>{{active.description}}</span>
							</p>
							<p @click="sanjiaoTransform(index)" class="active-first" v-if="ind===0 && _chuliData(restaurant).activeLen>2">{{_chuliData(restaurant).activeLen}}个活动<span class="sanjiao"></span></p>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {strChuli, vendor} from "@/base/base.js"

	export default {
		data(){
			return {
				w:0,    //设置打分星星的宽度
				cssBefore:'',   //食品快递方式，蜂鸟专送的style动态设置用，存储浏览器前缀
				len:2,     //商家活动展示数量
				really:[],
			}
		},
		props:[
			"restOrderByZonghe",
		],
		created(){
			//console.log(this.restOrderByZonghe);
			console.log('111'+this.idNum);
			this._trueFalse(this.restOrderByZonghe);
			//console.log(this.really);
			//this.xingWidth();  把这一项挪入mounted钩子函数中是因为created时还没有渲染dom，无法获取星星图片的宽度数据
		},
		mounted(){
			this.xingWidth();
		},
		methods:{
			//使用es6语法中的类来重新处理获取到的参餐厅信息
			_chuliData(obj){
				class Restaurant{
					constructor(data){
						this.img=`https://fuss10.elemecdn.com/${strChuli(data.image_path)[0]}/${strChuli(data.image_path)[1]}/${strChuli(data.image_path)[2]}.${strChuli(data.image_path)[3]}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`;
						this.name=data.name;
						this.activities=data.activities;
						this.delivery_mode=data.delivery_mode;
						this.description={
							description:data.piecewise_agent_fee.description,
							qiSong:`￥${data.piecewise_agent_fee.rules[0].price}起送`,
						};
						this.support_tags=data.support_tags;
						this.rating=data.rating;
						this.recent_order_num=data.recent_order_num;
						this.flavors=data.flavors;
						this.distance=data.distance;
						this.order_lead_time=data.order_lead_time;
						this.supports=data.supports;
						this.activeLen=data.activities.length;
						this.showOrNot=false;
					}

					flagChange(){
						if(this.showOrNot){
							this.showOrNot=false;
						}
						else{
							this.showOrNot=true;
						}
						console.log('111'+this.showOrNot);
					}
				}
				return new Restaurant(obj.restaurant);
			},
			xingWidth(){
				this.$nextTick(function (){
					//this.w=this.$refs.huixing0[0].clientWidth;
					this.w=60;
					//console.log(this.$refs.huixing0[0].clientWidth);
					this.cssBefore=vendor(this.$refs.huixing0[0]);
				});
			},
			colorGradient(obj){    //制作一个颜色渐变的背景样式
				//使用一个浏览器前缀检测方法，确定css样式
				let css='';
				if(this.cssBefore){
					if(this.cssBefore==='standard'){
						css=`linear-gradient(to right, #${obj.gradient.rgb_from}, #${obj.gradient.rgb_to})`;
					}
					else if(this.cssBefore==='webkit'){
						css=`-webkit-linear-gradient(left, #${obj.gradient.rgb_from}, #${obj.gradient.rgb_to})`;
					}
					else{
						css=`-${this.cssBefore}-linear-gradient(right, #${obj.gradient.rgb_from}, #${obj.gradient.rgb_to})`;
					}
					console.log(css);
				}
				else{
					css=`linear-gradient(to right, #${obj.gradient.rgb_from}, #${obj.gradient.rgb_to})`;
				}

				let style={
					color:`#${obj.text_color}`,
					background:css,
					borderRadius: '2px'
				}
				return style;
			},
			sanjiaoTransform(index){            //活动数量中的小三角形变换
				let spanDom=event.target.children[0];
				if(!this.cssBefore || this.cssBefore==="standard"){
					if(spanDom.style.transform==="rotate(180deg)"){
						spanDom.style.transform="rotate(0deg)";
					}
					else{
						spanDom.style.transform="rotate(180deg)";
					}
					spanDom.style.transformOrigin="50% 20%";
				}
				else{
					if(spanDom.style[`-${this.cssBefore}-transform`]==="rotate(180deg)"){
						spanDom.style[`-${this.cssBefore}-transform`]="rotate(0deg)";
					}
					else{
						spanDom.style[`-${this.cssBefore}-transform`]="rotate(180deg)";
					}
					spanDom.style[`-${this.cssBefore}-transform-origin`]="50% 20%";
				}
				if(this.really[index]){
					this.really.splice(index, 1, false);
				}
				else{
					this.really.splice(index, 1, true);
				}

				/*this._chuliData(restaurant).flagChange();  使用那个showOrNot属性没能够处理了那个数据
				console.log(this._chuliData(restaurant).showOrNot);*/
			},
			_trueFalse(obj){
				for(let i=0; i<obj.length; i++){
					this.really[i]=false;
				}
			}
		},
		watch:{
			restOrderByZonghe(newValue, oldValue){
				this._trueFalse(newValue);
			}
		}
		
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	#restaurants-list{
		width:100%;
		color:$font_color_small;
		font-size: $font-very-small;
		.list-item{
			margin:6% 2% 0;
			display: flex;
			.left-picture{ 
				width:20%;
				height:20%;
				padding:0;
				margin-right: 3%;
				img{
					width:20vw;
					height:20vw;

				}
			}
			.right-content{
				width:100%;
				box-sizing:border-box;
				.list1{
					position:relative;
					width:100%;
					h4{
						color:#000;
						font-size: $font-main;
						text-align: left;
					}
					p{
						position: absolute;
						right:0;
						top:0;
						font-size: 8px;
					}
				}
				.list2{
					.list2-xx{
						margin-top: 2%;
						position: relative;
						div{
							position: absolute;
							left:0;
							top:2px;
							&.showXing{
								overflow: hidden;
							}
						}
					}
					.list2-margin{
						margin-left: 60px;
					}
					.list2-sp{
						margin-top: 2%;
						display: flex;
						justify-content: space-between;
						div{
							span:first-child{
								display: inline-block;
								margin:0 4px;
							}
						}
						p{
							span:first-child:after{
								content:'|';
								color:#ddd;
								display: inline-block;
								margin:0 4px;
							}
						}
					}
					.list2-active{
						text-align: left;
						margin-top: 4%;
						div{
							padding-top: 2%;
							display: flex;
							justify-content: space-between;
							align-items: center;
							.active-text{
								width:75%;
								overflow:hidden;
								word-break:keep-all;
								white-space:nowrap;
								text-overflow:ellipsis;
								i{
									font-style: normal;
									color:#fff;
									border-radius: 2px;
								}
							}
							.active-first{
								.sanjiao{
									display: inline-block;
									border-width: 3px;
									border-color: #666 #fff #fff;
									border-style: solid;
									margin-left: 5px;
									transition:all 1s;
									-moz-transition:all 0.5s;
									-webkit-transition:all 0.5s;
									-o-transition:all 0.5s;
								}	
							}
						}
					}
				}
				
			}
		}
	}
</style>