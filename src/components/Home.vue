<template>
<!-- 注意，这个总的div元素必须设置高度，否则div元素会被撑大，导致scroll无法滚动 -->
	<div style="position: relative; height:100vh; width:100%;">
		<scroll :mouseWheel="true" :listenScroll="listenScroll" :pullup='isShow' :showHeight="showHeight" @scroll="scrollMove" :todosData="restOrderByZonghe">
		<div id="home" ref="uList">
			<e-header @getout="show"></e-header>
			<div class="top">
				<slide :autoPlay="autoplay" class="content">
					<!-- <div class="content"> -->
						<div class="leftRight">
							<router-link v-if="qianTen.length!==0" v-for="(dataInfo, index) in qianTen" :key="index" to="/link" class="flex-item diyiye">
								<div>
									<img :src="chuliStr(qianTen[index])">
								</div>
								<span>{{qianTen[index].name}}</span>
							</router-link>
						</div>
						<div class="leftRight">
							<router-link v-if="lastOne.name" to="/link" class="flex-item">
								<div>
									<img :src="chuliStr(lastOne)">
								</div>
								<span>{{lastOne.name}}</span>
							</router-link>
						</div>
					<!-- </div> -->
				</slide>
			</div>
			<div class="home-center">
				<router-link v-for="(mock, index) in mockData" :key="index" to="/" class="home-center-img">
					<div>
						<h4>{{mock.title}}</h4>
						<p>{{mock.describe}}</p>
						<span>{{mock.pro}}</span>
					</div>
					<img :src="mock.img">
				</router-link>
			</div>
			<!-- <home-bottom></home-bottom> -->
			<div class="home-bottom">
				<h3>推荐商家</h3>
				<!-- <home-nav v-if="JSON.stringify(outsideFilter)!=='{}'&&JSON.stringify(filterBar)!=='{}'" :outsideFilter="outsideFilter" :filterBar="filterBar"></home-nav> -->
				<home-nav ref="hnav" v-if="JSON.stringify(outsideFilter)!=='{}'&&JSON.stringify(filterBar)!=='{}'" :transToNav="transToNav" @listenMsgFromNav="showListenMsg"></home-nav>
				<restaurants-list v-if="restOrderByZonghe.length!==0" :restOrderByZonghe="restOrderByZonghe" ref="reListHeight"></restaurants-list>
			</div>
		</div>
		</scroll>
		<e-header class="eheader-fixed" v-if="headerShow"></e-header>
		<home-nav v-if="navShow" class="nav-fixed" :transToNav="transToNav" @listenMsgFromNav="showListenMsg"></home-nav>
		<transition name="fadeDom">
			<address-choice v-if="showpage" @goBack="fadeOut" @clickAddress="changePos"></address-choice>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui'
	import {getItem, getMockData, getFilter} from "@/api/getData.js"
	import {arrTheSame} from "@/base/base.js"
	import {mapGetters} from "vuex"
	import eHeader from "@/components/eHeader.vue"
	import slide from "@/common/slide.vue"
	import homeNav from "@/components/homeNav.vue"
	import restaurantsList  from "@/components/restaurantsList.vue"
	import addressChoice from "@/components/address-choice.vue"
	import scroll from "@/common/scroll.vue"
	    
	//该变量表明每拖拽一次，推荐的餐厅就会增加8个数据，数据接口中的一个翻页的参数也会加8
	let REST_NUMBER=8; 
	let WIDTH=document.documentElement.clientWidth || document.body.clientWidth;
	export default {
		data(){
			return {
				//resData:[],
				todos:{},
				showpage:false,  //用于确定地址选择页面是否出现
				qianTen:[],   //把获取到的数据分成10个一组和
				lastOne:{},   //获取到的数组一共两项，其中第一项包含11个小项，因此需要再次分配为10项和1项
				cheapZQ:{},    //获取数组的第二项
				autoplay:false,    //控制幻灯片不再自动播放
				mockData:[],     //首页中部的mockData数据
				outsideFilter:{},   //综合排序那一栏的数据
				filterBar:{},     //筛选那一栏的数据
				transToNav:[],    // 传入综合排序的导航的数据,结构为对象，一个是数据，一个是表示是否有字体图标
				restOrderByZonghe:[],  //综合排序获取的商铺信息
				////该段的参数是用于scroll组件
				listenScroll:true,
				isShow:true,
				showHeight:0,
				addArr:[],        //使用这个过渡数组，将scroll过程中新加载的数据放在该数组
				////
				//当滚动时显示是否出现
				headerShow:false,
				navShow:false,
				idNum:0,      //滚动加载的页面,是否停止
				reList:0,    //restaurants-list的高度，通过监听该高度的变化，确定是idNum加8

			}
		},
		created(){
			this.getDataBy();
		},
		computed:{
			...mapGetters([
				'position',
			])
		},
		watch:{
			todos:function (newObj, oldObj){
				if(newObj[0].entries){
					const len=newObj[0].entries.length;
					this.qianTen=newObj[0].entries.slice(0,len-1);
					this.lastOne=newObj[0].entries[len-1];
					this.cheapZQ=newObj[1].entries[0];
					//console.log(this.qianTen);
					//console.log(this.lastOne);
					//console.log(newObj[1]);
					//console.log(this.mockData);
				}
			},
			addArr(newArr, oldArr){
				if(oldArr.length!==0){
					console.log(oldArr[0]['restaurant'].name);
				}
				//console.log(arrTheSame(newArr, oldArr));
				if(newArr && !arrTheSame(newArr, oldArr)){ 
					this.restOrderByZonghe.push(...newArr);
					//this.idNum+=8;
				}
			},
			//只有当restaraunt-list部分的视图高度发生变化时，才会使this.idNum+8，此时可以继续下拉刷新
			reList(newValue, oldValue){
				if(newValue>=oldValue+200){
					this.idNum+=8;
				}
			}
		},
		methods:{
			chuliStr(obj){
				let str=obj.image_hash;
				let baseUrl="https://fuss10.elemecdn.com";
				let first=str[0];
				let second=str.slice(1,3);
				let last=str.slice(3);
				return `https://fuss10.elemecdn.com/${first}/${second}/${last}.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`;
			},
			//show方法和fadeOut方法用于决定地址选择页面进入和离开
			show:function (value){
		      this.showpage=value;
		      //alert(this.showpage);
		    },
		    fadeOut(boo){
		    	this.getDataBy();
		    	this.showpage=boo;
		    },
		    changePos(todos){
		    	console.log(todos);
		    },
		    showListenMsg(data){
		    	console.log(data);
		    },
		    /*
			**该方法用于滚动加载过程
		    */
		    scrollMove(pos){
		    	this.reList=this.$refs.reListHeight.$el.offsetHeight;
				let phoneHeight=document.documentElement.clientHeight || document.body.clientHeight;
				let ulHeight=this.$refs.uList.offsetHeight;

				if(-pos.y>=WIDTH/10){
					//this.$refs.oDiv.style.position='fixed';
					this.headerShow=true;
				}
				else{
					this.headerShow=false;
				}
				//console.log(this.$refs.hnav.$el.offsetTop);
				if(this.$refs.hnav.$el.offsetTop+pos.y<=0.16*WIDTH){
					this.navShow=true;
				}
				else{
					this.navShow=false;
				}

				if(ulHeight+pos.y<=phoneHeight-50){
					this.showHeight=phoneHeight-pos.y-ulHeight;
					console.log('0000000'+this.idNum+'000'+this.reList);
					getFilter('/restaurants-info/'+this.idNum, this.position).then((response)=>{
						console.log('-----------------');
						this.addArr=JSON.parse(response.data).items;
						//this.idNum+=8;
					}, function (err) {
						console.log(err);
					});
				}
			},
			changeAddress(boo){
				alert(boo);
				this.addressShow=boo;
			},
			//页面数据请求
			getDataBy(){
				let me=this;
				let req1=false;
				let req2=false;
				let req3=false;
				let req4=false;
				let req5=false;
				this.transToNav[1]={
					'msg':'距离最近'
				};
				this.transToNav[2]={
					'msg':'品质联盟'
				};
				
				//这种异步获取数据的方式有什么更好的解决措施吗？
				//
				let dsqId=setInterval(function (){
					
					if(req1 && req2 && req3 && req4){
						clearInterval(dsqId);
						//me.idNum+=8;
						me.reList=me.$refs.reListHeight.$el.offsetHeight;
						//console.log('1111111'+me.reList);
					}
					
					if(me.position.lng){
						//clearInterval(dsqId);
						
						getItem(me.position).then(function (response){
							//console.log(response.data);
							me.todos=response.data;
							req1=true;
							Indicator.close();
						});
						getFilter('/outsidefilter', me.position).then(function (response){
							//console.log(JSON.parse(response.data));
							me.outsideFilter=JSON.parse(response.data);
							let paixu={
								'msg':me.outsideFilter.inside_sort_filter[0].name,
								'qT':'三角'
							};
							me.transToNav[0]=paixu;
							req3=true;
						}, function (err){
							console.log(err);
						});

						getFilter('/filterbar', me.position).then(function (response){

							//console.log(JSON.parse(response.data));
							me.filterBar=JSON.parse(response.data);
							let shaixuan={
								'msg':'筛选',
								'qT':'字体图标'
							};
							me.transToNav[3]=shaixuan;
							req4=true;
						}, function (err){
							console.log(err);
						});

					}
					getMockData().then(function (response){
						if(response.status===200){
							me.mockData=response.data.data.msg;
							req2=true;
						}
					});

					getFilter('/restaurants-info/'+me.idNum, me.position).then(function (response){
						//console.log(JSON.parse(response.data));
						me.restOrderByZonghe=JSON.parse(response.data).items;

					}, function (err) {
						console.log(err);
					});
				}, 500);
				
				/*setTimeout(function (){
				 	getItem(params).then(function (response){
				 			console.log(response);
						});
				}, 5000);*/
				Indicator.open({
				  text: '加载中...',
				  spinnerType: 'fading-circle'
				});
			}
		},
		components:{
			eHeader,
			slide,
			homeNav,
			restaurantsList,
			scroll,
			addressChoice,
		}
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	#home{
		width:100%;
		position: relative;
		.content{
			height:25vh;
			padding-bottom: 5%;
			.leftRight{
				height:100%;
				display:flex;
				flex-wrap: wrap;
				&.diyiye{
					justify-content:space-around;
				}
				.flex-item{
					text-decoration: none;
					color:$font_color_small;
					width:20%;
					height:50%;
					box-sizing: border-box;
					div{
						margin-left:15px;
						margin-top: 10px;
						width:12vw;
						height:12vw;
						img{
							width:100%;
							height:100%;
						}
					}
					span{
						font-size: $font-small;
					}
				}
			}
		}
		.home-center{
			box-sizing: border-box;
			margin:0 3% 4%;
			height:22vh;
			display: flex;
			.home-center-img{
				background-color: $bg_color;
				width:50%;
				text-decoration: none;
				position: relative;
				color:$font_color_small;
				&:first-child{
					margin-right:1%;
				}
				div{
					text-align: left;
					margin-left: 8%;
					margin-top: 8%;
					p{
						margin:3% 0;
					}
					p, span{
						font-size: $font-small;
					}
				}
				img{
					position: absolute;
					right:0;
					bottom:0;
					width:70%;
				}
				&:first-child{
					h4{
						color:$font_color_main;
					}
					span{
						color:#af8260;
					}
				}
			}
		}
		.home-bottom{
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
	}
	.eheader-fixed{
		position: fixed;
		top:-40px;
		left:0;
		box-sizing: border-box;
		width:100%;
		z-index:10;
	}
	.nav-fixed{
		position: fixed;
		padding: 15px 0;
		top:15vw;
		left:0;
		box-sizing: border-box;
		width:100%;
		z-index:10;
		background-color: #fff;
	}
	.fadeDom-enter-active, .fadeDom-leave-active{
		transition: all .5s ease;
	}
	.fadeDom-enter, .fadeDom-leave-to{
		transform: translateX(100vw);
		//left:100vw;
	}
</style>