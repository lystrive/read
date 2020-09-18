<template>
	<div class="login">
		<div class="login_title">
			<img src="../img/icon2.png" @click="fanhui"/>
			<span>登录Book</span>
			<span @click="toRegister">注册</span>
		</div>
		<div class="login_logo">
			<img src="../img/logo2.png"/>
		</div>
		<input type="text" placeholder="请输入用户名" v-model="username" />
		<input type="password" placeholder="请输入密码" v-model="password" />
		<button class="login_login" @click="_login">登录</button>
	</div>
</template>

<script>
   	import { Toast } from 'mint-ui';
	export default {
		name:"Login",
		data(){
		 	return {
		 	  username:"",
		 	  password:""
		 	}
		 },
		methods:{
			fanhui:function(){
				window.history.back()
			},
			toRegister:function(){
				this.$router.push("/register")
			},
			_login:function(){
				if(this.username == "" || this.username == null){
					Toast({
						message: '用户名为空！',
						position: 'top',
						duration: 1000
					});
				} else {
					if(this.password == "" || this.password == null){
						Toast({
							message: '密码为空！',
							position: 'top',
							duration: 1000
						})
					} else {
						this.$http.jsonp('http://127.0.0.1:9000/api/user/login', {
							params:{username:this.username}
						}).then((res)=>{
							// console.log(res.body)
							let userInfo = res.body;
							if(userInfo == null || userInfo.length == 0){
								Toast({
									message: '用户未注册！',
									position: 'top',
									duration: 1000
								});
							} else {
								if(this.password == userInfo[0].password){
									this.$router.push("/mall");
									sessionStorage.setItem("user", JSON.stringify(userInfo));
								} else {
									Toast({
										message: '密码错误！',
										position: 'top',
										duration: 1000
									});
								}
							}
						});
					}
				}

				
			}
		}
	}
</script>

<style scoped>
	.login_title{
		width: 100%;
		height: 2.05rem;
		line-height: 2.05rem;
		border-bottom: 0.075rem solid #ededed;
	}
	.login_title img{
		width: 0.675rem;
		height: 1.05rem;
		margin-left: 0.6rem;
	}
	.login_title span:nth-of-type(1){
		font-size: 0.75rem;
		color: #191919;
		padding-left: 6.5rem;
	}
	.login_title span:nth-of-type(2){
		/* display: inline-block; */
		float: right;
		width: 2.25rem;
		height: 1.05rem;
		background: #f9cf18;
		font-size: 0.75rem;
		text-align: center;
		line-height: 1.05rem;
		margin-top: 0.5rem;
    	margin-right: 0.75rem;
    	border-radius: 0.3rem;
	}
	.login_logo{
		height: 1.9rem;
		text-align: center;
		margin-top: 1.375rem;
	}
	.login_logo img{
		width: 5.675rem;
		height: 1.9rem;
	}
	input{
		width: 14.675rem;
		height: 2.625rem;
		display: block;
		margin: 0 auto;
		font-size: 0.75rem;
		border: none;
		border-bottom: 0.05rem solid #ededed;
		padding-left: 1.575rem;
	}
	input:nth-of-type(1){
		background: url(../img/icon3.png) 0 center no-repeat;
		background-size: 1.3rem;
		margin-top: 0.4rem;
	}
	input:nth-of-type(2){
		background: url(../img/icon4.png) 0 center no-repeat;
		background-size: 1.3rem;
	}
	.login_login{
		width: 14.675rem;
		height: 2rem;
		display: block;
		margin: 0 auto;
		font-size: 0.75rem;
		border: none;
		border-radius: 0.3rem;
		background: #f9cf18;
		font-size: 0.75rem;
		margin-top: 1.05rem;
		color: #a98e15;
	}
</style>