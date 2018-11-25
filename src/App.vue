<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import eHeader from "@/components/eHeader.vue"

export default {
  name: 'App',
  data(){
    return {
      //showpage:false,
    }
  },
  components:{
    //eHeader,
  },
  methods:{
    /*show:function (value){
      this.showpage=value;
    }*/
  }
}
</script>

<style lang='scss'>
*{
  margin:0;
  padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh;
  .header{
    position:fixed;
    top:0;
    left:0;
  }
}
</style>
