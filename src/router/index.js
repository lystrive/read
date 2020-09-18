import Vue from 'vue'
import Router from 'vue-router'
import Mall from "@/components/Mall"
import Tuijian from "@/components/Tuijian"
import Wode from "@/components/Wode"
import Login from "@/components/Login"
import Register from "@/components/Register"
import Gouwuche from "@/components/Gouwuche"
import Fenlei from "@/components/Fenlei"
import Detail from "@/components/Detail"
import Person from "@/components/Person"
import $http from "vue-resource"

Vue.use(Router)

export default new Router({
  routes: [
  	{ path: '/', redirect: '/mall' },
    {
    	path: '/mall',
      	name: 'Mall',
      	component: Mall,
      	children:[
					{ path: '/', component: Tuijian },
					{ path:"/mall/wode", component:Wode},
					{ path:"/mall/gouwuche", component:Gouwuche},
					{ path:"/mall/fenlei/:id", component:Fenlei}
	    	]
    },
    {
    	path:"/login",
    	name:"Login",
    	component:Login
    },
    {
    	path:"/register",
    	name:"Register",
    	component:Register
    },
    {
    	path:"/detail/:id",
    	name:"Detail",
    	component:Detail
	},
	{
		path:"/person",
    	name:"Person",
    	component:Person
	}
  ]
})
