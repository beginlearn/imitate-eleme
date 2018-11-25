<template>
	<div class="wrapper" ref="wrapper">
		<div>
			<slot>
				
			</slot>
			<div v-if="pullup" class="pullup" ref="pullUp">
				<div v-if="!isDone" class="clear">
					<span>数据加载中...</span>
				</div>
				<div v-if="isDone && !isLoading">
					<span>没有更多数据了</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from "better-scroll"

	export default {
		data(){
			return {
				isDone:false,
				isLoading:false,
			}
		},
		props:{
			click:{
				type:Boolean,
				default:true
			},
			probeType:{
				type:Number,
				default:3
			},
			refreshDelay:{
				type:Number,
				default:20
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			pullup:{
				type:Boolean,
				default:false
			},
			mouseWheel: {
		        type: Boolean,
		        default: false
		    },
			showHeight:{
				type:Number,
				default:0
			},
			todosData:{
				type:Array,
				default:function () {
					return [];
				}
			},
			//表示移动端屏幕高度，用于在scroll组件中和撑开的滚动元素的高度对比，来做上拉加载功能
/*			phoneHeight:{   
				type:Number,
				default:0
			},
			ulHeight:{
				type:Number,
				default:0
			}*/
		},
		mounted(){
			this.$nextTick(() => {
				  if (!this.scroll) {
                    this._initScroll();
                  } else {
                    this.bScroll.refresh();
                  };
		      });
		},
		methods:{
			_initScroll(){
				
				if(!this.$refs.wrapper){
					return;
				}
				//alert(this.pullup);
				this.bScroll=new BScroll(this.$refs.wrapper, {
					click:this.click,
					probeType:this.probeType,
					scrollbar:{
						fade:true,
						interactive: false
					},
					scrollY:true,
					mouseWheel: this.mouseWheel,
				});
				
				if(this.listenScroll){
					let me=this;
					this.bScroll.on('scroll', (pos)=>{
						//console.log(pos);
						//console.log(this.bScroll.movingDirectionY);
						let movingDirectionY=this.bScroll.movingDirectionY;
						if(pos.y>0){
							//该方法是为了使bScroll滚动到最顶部之后停止，避免被下拉出一个空白区域
							this.bScroll.stop();
							this.bScroll.scrollTo(0, 0, 0);
						}
						/*if(this.ulHeight+pos.y<=this.phoneHeight-50){
							//let me=this;
							this.pullup=true;
							let newValue=this.phoneHeight-this.ulHeight-pos.y;
							this.$refs.pullUp.style.height=newValue+'px';
							this.$refs.pullUp.style.lineHeight=newValue+'px';
							this.$refs.pullUp.style.bottom=-newValue+'px';
						}*/
						me.$emit('scroll', pos, movingDirectionY);
					});
				}
				
				if(this.pullup){
					this.bScroll.on('scrollEnd',(pos)=>{
						console.log(pos);
			            this.$emit('scroll-end', pos);
					});
					this.bScroll.on('touchEnd',(pos)=>{
						//console.log(pos);
			            this.$emit('touch-end', pos);
					});
				}
			},
			disable(){
		      this.bScroll && this.bScroll.disable();
		    },
		    enable(){
		      this.bScroll && this.bScroll.enable();
		    },
		    refresh(){
		      this.bScroll && this.bScroll.refresh();
		    },
		    scrollToElement(){
		   	  /*
		   	  **this.bScroll.scrollToElement.apply(this.bScroll, arguments)
		   	  **用这个写法主要是因为向里面传参数的时候，不确定会传入几个参数，所以可以改写成这种写法
		   	  **在scroll组件中定义的这种enable、refresh等方法，是为了在实际实例化应用的时候可以调用这些方法
		   	  */
		   	  this.bScroll && this.bScroll.scrollToElement.apply(this.bScroll, arguments);
		   	  //this.bScroll && this.bScroll.scrollToElement(el, num);
		    }
		},
		watch:{
			showHeight(newValue, oldValue){
				//console.log(newValue>=50 && this.pullup);
				if(newValue>=50){
					this.$refs.pullUp.style.height=50+'px';     
					//或者直接把拉上的区域的宽高固定为50，然后拉倒这个高度就可以让滚动停止
					this.$refs.pullUp.style.lineHeight=newValue+'px';
					this.$refs.pullUp.style.bottom=-newValue+'px';
					this.bScroll.stop();     //这一项应该是根据设计要求，决定是否使用
					
				}
			},
			todosData(newArr, oldArr){
				//console.log(newArr);
				if(newArr){
					this.$nextTick(function () {
						this.refresh();
					})
					
				}
			}
		}

	}
</script>
<style scoped lang="scss">
	.wrapper{
		position:relative;
		height:100%;
		overflow: hidden;
		.pullup{
			position: absolute;
			left:0;
			width:100%;
			background-color:#ccc;
			height:0px;
		}
	}
</style>