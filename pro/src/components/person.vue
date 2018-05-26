<template>
  <div class="person">
		<div class="title">
			<img src="../img/icon2.png" @click="fanhui"/>
			<span>个人信息</span>
		</div>
        <div class="content">
            <input type="text" placeholder="请输入用户名" v-model="userInfo.username" disabled/>
		    <input type="password" placeholder="请输入原密码" @blur="checkOld" v-model="oldPassworld"/>
            <input type="password" placeholder="请输入新密码" v-model="password" />
            <input type="password" placeholder="请再次输入新密码" v-model="respassword" @blur="checkSame" />
            <button class="update" @click="update">确认修改</button>
        </div>
	</div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: 'Person',
        data(){
            return {
                userInfo: {},
                oldPassworld: "",
                password: "",
                respassword: ""
            }
        },
        methods:{
            update(){
                if(this.oldPassworld == "" || this.oldPassworld == null){
						Toast({
							message: '请输入原密码！',
							position: 'top',
							duration: 1000
						})
                } else {
                    if(this.password == "" || this.password == null || this.respassword == "" || this.respassword == null){
                            Toast({
                                message: '请输入新密码！',
                                position: 'top',
                                duration: 1000
                            })
                    } else {
                        this.$http.jsonp('http://127.0.0.1:9000/api/user/update', {
                            jsonpCallback: "getCallBack",
                            params:{id: this.userInfo.id, password: this.password}
						}).then((res)=>{
                            console.log(res);
                            if(res.status == 200) {
                                Toast({
                                    message: '修改成功！',
                                    position: 'top',
                                    duration: 1000
                                })
                            }
                        })
                    }
                }
            },
            fanhui:function(){
				window.history.back()
            },
            checkOld(){
                if(this.oldPassworld !== this.userInfo.password) {
                    this.oldPassworld = "";
                    Toast({
						message: '密码错误！',
						position: 'top',
						duration: 1000
					});
                }
            },
            checkSame(){
                if(this.password !== this.respassword) {
					Toast({
						message: '输入的密码不一致！',
						position: 'top',
						duration: 1000
					});
				} 
            }
        },
        mounted(){
            this.userInfo = JSON.parse(sessionStorage.getItem("user"))[0];
        }
    }
</script>

<style>
    .person{
        height: 100%;
    }
    .person .title{
        width: 100%;
		height: 2.05rem;
		line-height: 2.05rem;
		border-bottom: 0.075rem solid #ededed;
    }
    .person .title img{
        width: 0.675rem;
		height: 1.05rem;
		margin-left: 0.6rem;
    }
    .person .title span:nth-of-type(1){
		font-size: 0.75rem;
		color: #191919;
		padding-left: 6.5rem;
	}
    .person .content{
        margin-top: 2rem;
    }
    .person .content input{
        width: 80%;
		height: 2.625rem;
		display: block;
		margin: 0 auto;
		font-size: 0.75rem;
		border: none;
		border-bottom: 0.05rem solid #ededed;
		padding-left: 1.575rem;
        background: url(../img/icon4.png) 0 center no-repeat;
		background-size: 1.3rem;
    }
    .person .content input:nth-of-type(1){
		background: url(../img/icon3.png) 0 center no-repeat;
		background-size: 1.3rem;
		margin-top: 0.4rem;
	}
    .person .content .update{
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