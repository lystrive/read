<template>
	<div class="register">
		<div class="register_title">
			<img src="../img/icon2.png" @click="fanhui"/>
			<span>注册Book</span>
		</div>
		<div class="register_logo">
			<img src="../img/logo2.png"/>
		</div>
		<input type="text" placeholder="请输入用户名" v-model="username" />
		<input type="password" placeholder="请输入密码" v-model="password"/>
		<input type="password" placeholder="请再次输入密码" v-model="respassword" @blur="confirm"/>
		<button class="register_register" @click="_register">注册</button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name:"Register",
		data(){
			return {
				username:"",
				password:"",
				respassword:""
			}
		},
		methods:{
			fanhui:function(){
				window.history.back()
			},
			confirm(){
				if(this.password !== this.respassword) {
					Toast({
						message: '输入的密码不一致！',
						position: 'top',
						duration: 1000
					});
				} 
			},
			_register:function(){
				if(this.username == "" || this.username == null){
					Toast({
						message: '请输入用户名！',
						position: 'top',
						duration: 1000
					});
				} else {
					if(this.password == "" || this.password == null || this.respassword == "" || this.respassword == null){
						Toast({
							message: '请输入密码！',
							position: 'top',
							duration: 1000
						})
					} else {
						this.check().then((val) => {
							if(val.length > 0){
								Toast({
									message: '用户已注册！',
									position: 'top',
									duration: 1000
								});
							} else {
								this.$http.jsonp('http://127.0.0.1:9000/api/user/register',{
									params:{username:this.username, password:this.password}
								}).then((res)=>{
									console.log(res);
									if(res.status == 200) {
										Toast({
											message: '用户注册成功！',
											position: 'top',
											duration: 1000
										});
									} else {
										Toast({
											message: '用户注册失败！',
											position: 'top',
											duration: 1000
										});
									}							
								});
							}	
						})
												
					}
				}			
			},
			check(){
				return new Promise((resolve, reject) => {
					this.$http.jsonp('http://127.0.0.1:9000/api/user/login', {
						params:{username:this.username}
					}).then((res)=>{
						console.log(res.body)
						resolve(res.body);
					});
				})
				
			}
		}
	}
</script>

<style scoped>
	.register_title{
		width: 100%;
		height: 2.05rem;
		line-height: 2.05rem;
		border-bottom: 0.075rem solid #ededed;
	}
	.register_title img{
		width: 0.675rem;
		height: 1.05rem;
		margin-left: 0.6rem;
	}
	.register_title span:nth-of-type(1){
		font-size: 0.75rem;
		color: #191919;
		padding-left: 6.5rem;
	}
	.register_title span:nth-of-type(2){
		display: inline-block;
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
	.register_logo{
		height: 1.9rem;
		text-align: center;
		margin-top: 1.375rem;
	}
	.register_logo img{
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
	input:nth-of-type(3){
		background: url(../img/icon4.png) 0 center no-repeat;
		background-size: 1.3rem;
	}
	.register_register{
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