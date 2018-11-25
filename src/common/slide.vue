<template>
	<div class="slide" ref="slide">
		<div class="slide-group" ref="slideGroup">
			<slot></slot>
		</div>
		<div v-if="showDot" class="dots">
			<span class="dot" v-for="(dot, index) in dots" :key="index" :class="{active:index===currentPageIndex}"></span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'
	import {addClass} from "@/base/base.js"

	export default {
		data(){
			return {
				dots:[],
				currentPageIndex:0,
			}
		},
		props:{
			loop:{
				type:Boolean,
				default:true
			},
			autoPlay:{
				type:Boolean,
				default:true
			},
			click:{
				type:Boolean,
				default:true
			},
			interval:{
				type:Number,
				default:4000
			},
			showDot:{
				type:Boolean,
				default:true
			},
			threshold:{
				type:Number,
				default:0.3
			},
			speed:{
				type:Number,
				default:100
			}
		},
		mounted(){

			 this.update();
		      window.addEventListener('resize', () => {
		        if (!this.slide || !this.slide.enabled) {
		          return
		        }
		        clearTimeout(this.resizeTimer)
		        this.resizeTimer = setTimeout(() => {
		          if (this.slide.isInTransition) {
		            this._onScrollEnd()
		          } else {
		            if (this.autoPlay) {
		              this._play()
		            }
		          }
		          this.refresh()
		        }, 60)
		      })
		},
		activated(){
			 if (!this.slide) {
		        return
		      }
		      this.slide.enable()

		      let pageIndex = this.slide.getCurrentPage().pageX
		      this.slide.goToPage(pageIndex, 0, 0)
		      this.currentPageIndex = pageIndex
		     
		      if (this.autoPlay) {
		        this._play()
		      }
		},
		methods:{
			init(){
				clearTimeout(this.timer);
				this.currentPageIndex=0;
				this._setSlideWidth();
				if(this.showDot){
					this._initDots();
				}
				this._initSlide();
				if(this.autoPlay){
					this._play();
					//alert(1);
				}
			},
			_setSlideWidth(isResize){
				if(this.$refs.slideGroup.children){
					this.children=this.$refs.slideGroup.children;
				}
				
				let slideWidth=this.$refs.slide.clientWidth;
				let w=0;
				for(let i=0; i<this.children.length; i++){
					let child=this.children[i];
					child.style.width=slideWidth+'px';
					//console.log(child);
					addClass(child, 'slide-item');
					w+=slideWidth;
				}
				if(this.loop && !isResize){
					w+=2*slideWidth;
				}
				this.$refs.slideGroup.style.width=w+'px';
			},
			_initSlide(){
				let me=this;
				this.slide=new BScroll('.slide', {
					scrollX:true,
					scrollY:false,
					probeType:3,
					snap:{
						loop:this.loop,
						threshold:this.threshold,
						speed:this.speed
					},
					bounce:false,
					stopPropagation: true,
         			click: this.click
				});
				//尝试中途停止滑动，却没有办法
				/*this.slide.on('scroll', (pos)=>{
					let slideWidth=me.$refs.slide.clientWidth;
					console.log(Math.abs(pos.x)%slideWidth===0);
					if(Math.abs(pos.x)%slideWidth===0){
						me.slide.stop();
					}
				});*/
				
				this.slide.on('scrollEnd', this._onScrollEnd);

				this.slide.on('touchEnd', ()=>{
					if(this.autoPlay){
						this._play();
					}
				});
				
				this.slide.on('beforeScrollStart', ()=>{
					if(this.autoPlay){
						clearTimeout(this.timer);
					}
				})
			},
			_onScrollEnd(){
				let pageIndex=this.slide.getCurrentPage().pageX;

				this.currentPageIndex=pageIndex;
				if(this.autoPlay){
					this._play();
				}
			},
			_initDots(){
				this.dots=new Array(this.children.length);
			},
			_play(){
				clearTimeout(this.timer);
				this.timer=setTimeout(()=>{
					this.slide.next();
				}, this.interval)
			},
			update(){
				if(this.slide){
					this.slide.destroy();
				}
				//console.log(2222222222222)
				this.$nextTick(()=>{
					this.init();
				})
			},
			refresh(){
				this._setSlideWidth(true);
				this.slide.refresh();
			},
			prev(){
				this.slide.prev();
			},
			next(){
				this.slide.next();
			}

		},
		 watch: {
	      loop() {
	        this.update()
	      },
	      autoPlay() {
	        this.update()
	      },
	      speed() {
	        this.update()
	      },
	      threshold() {
	        this.update()
	      }
	    }
	}
</script>
<style scoped lang="scss">
	@import "@/assets/css/variable.scss";
	.slide{
		position:relative;
		width:100%;
		height:100%;
		overflow: hidden;
		.slide-group{
			height:100%;
			.slide-item{
				float:left;
				box-sizing: border-box;
				overflow:hidden;
				text-align:center;
			}
		}
		.dots{
			position:absolute;
			bottom: 10px;
			left:0;
			right:0;
			text-align: center;
			.dot{
				display: inline-block;
				width:6px;
				height:6px;
				border-radius: 50%;
				margin-right: 10px;
				background-color: $dot_color;
				&.active{
					background-color: $dot_active_color;
				}
			}
		}
	}
</style>