<template>
	<div class="wode">
		<div class="wode_top">
			<div class="wode_shezhi">
				<img src="../img/icon1.png"/>
			</div>
			<div class="wode_touxiang"></div>
			<button class="wode_login" v-if="!isLogin" @click="login"><router-link to="/login">点击登录</router-link></button>
			<p class="username" v-if="isLogin">{{userInfo.username}}</p>
			<p class="already" v-if="isLogin" @click="exit">注销</p>				
			<div class="content" v-if="isLogin">
				<mt-cell title="个人信息管理" :to="'/person'" is-link></mt-cell>	
			</div>
			<div class="banner">
				<img src="../img/img1.jpg" >
			</div>					
		</div>
	</div>
</template>

<script>
	import { Cell } from 'mint-ui';
	export default {
		name:"Wode",
		data(){
			return {
				userInfo: {},
				isLogin: false
			}
		},
		methods:{
			login:function(){
				this.isLogin = true
			},
			checkUser(){
				let userInfo = JSON.parse(sessionStorage.getItem("user"));
				if(userInfo == null || userInfo.length == 0){
					this.isLogin = false;
				} else {
					this.isLogin = true;
					this.userInfo = userInfo[0];
				}
			},
			exit(){
				sessionStorage.removeItem("user");
				this.checkUser();
			}
		},		
		mounted(){
			this.$emit("to-parent","wode");
			this.$emit("to-dad","wode");
			this.checkUser();
		}		
	}
</script>

<style scoped>
	.wode_shezhi{
		width: 100%;
		height: 1.95rem;
	}
	.wode_shezhi img{
		width: 1.55rem;
		height: 1.95rem;
		margin-left: 0.65rem;
	}
	.wode_touxiang{
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: url("../img/img17.png") no-repeat center center ;
		background-size: 100%;
		margin: 0 auto;
	}
	.wode_login{
		width: 6.75rem;
		height: 2rem;
		background: #f9cf18;
		display: block;
		margin: 0 auto;
		margin-top: 1.4rem;
		margin-bottom: 1.375rem;
		border: none;
		border-radius: 0.3rem;
	}
	.already{
		width: 6.75rem;
		height: 2rem;
		background: #f9cf18;
		display: block;
		margin: 0 auto;
		margin-top: 1.4rem;
		margin-bottom: 1.75rem;
		border: none;
		border-radius: 0.3rem;
		text-align: center;
		line-height: 2rem;
	}
	.wode_login a{
		font-size: 0.75rem;
		color: #4b4b4b;
	}
	.username{
		margin-top: 10px;
		text-align: center;
	}
	.banner img{
		width: 100%;
		height: 100%;
	}
</style>