import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Home from "@/components/Home"
import Link from "@/components/link.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
     path:'/home',
     component:Home,
    },
    {
      path:'/link',
      component:Link,
    },
    {
    	path:'/',
    	redirect:'/home',
    }
  ]
})
