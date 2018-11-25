<template>
	<div id="link">
		<scroll :listenScroll="listenScroll" :pullup='isShow' :showHeight="showHeight" @scroll="scrollMove" :todos="todos">
			<ul ref="uList">
				<li class="list-todo" v-for="(todo, index) in todos">{{todo.text}}</li>
			</ul>
		</scroll>
	</div>
</template>
<script>
	import scroll from "@/common/scroll.vue"
	import {getItem, getMockData, getFilter} from "@/api/getData.js"

	export default {
		data(){
			return {
				listenScroll:true,
				todos:[
					{
						text:'111',
					},
					{
						text:'222',
					},
					{
						text:'333',
					},
					{
						text:'444',
					},
					{
						text:'555',
					},
					{
						text:'666',
					},
					{
						text:'777',
					},
					{
						text:'888',
					},

				],
				isShow:true,
				showHeight:0,
				addArr:[],
				iTodo:[
					{
						text:'111',
					},
					{
						text:'222',
					},
					{
						text:'333',
					},
					{
						text:'444',
					},
					{
						text:'555',
					},
					{
						text:'666',
					},
					{
						text:'777',
					},
					{
						text:'888',
					},

				],
			}
		},
		components:{
			scroll,
		},
		methods:{
			scrollMove(pos){
				let phoneHeight=document.documentElement.clientHeight || document.body.clientHeight;
				let ulHeight=this.$refs.uList.offsetHeight;
				
				if(ulHeight+pos.y<=phoneHeight-50){
					//let me=this;
					this.showHeight=phoneHeight-pos.y-ulHeight;
					getFilter('/restaurants-info/0', {lat:39.935006,lng:116.2055}).then((response)=>{
						//console.log(JSON.parse(response.data));
						this.addArr=this.iTodo;
					}, function (err) {
						console.log(err);
					});
				}
			},
		},
		watch:{
			addArr(newArr, oldArr){
				if(newArr){
					//alert(2);
					this.todos.push(...newArr);
					//this.
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	#link{
		width:100%;
		height:100%;
		background-color: #fff;
		position: relative;
		background-color:pink;
		.list-todo{
			height:200px;
			border:1px solid black;
		}
	}
</style>