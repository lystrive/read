<template>
	<div class="detail">
			<div class="zhezhao" v-show="isTrue">
				
			</div>
			<div class="detail_bg" >
				<img :src="data.img"/>
				<span @click="fanhui">
					<i class="mintui mintui-back" style="color: black;"></i>
				</span>
				
			</div>
			<div class="detail_content" >
				<h2>{{data.proName}}</h2>
				<p class="des">{{data.description}}</p>
				<p>￥{{data.price}}</p>
				<img src="../img/img20.png"/>
			</div>
			<div class="add_to_cart"  v-show="isShow">
				<img :src="data.img"/>
				<div class="detail_box">
					<p><span>￥{{data.price}}</span><span @click="cha">×</span></p>
					<div class="detail_amount">
						<button @click="minus">-</button>
						<span>{{amount}}</span>
						<button @click="add">+</button>
					</div>
				</div>
			</div>
			<footer class="detail_add">
				<span class="mycart" @click="myCart">我的购物车</span>
				<span @click="toCart">加入购物车</span>
			</footer>
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name:"Detail",
		data(){
			return {
				data:{},
				isShow:false,
				amount:1,
				isTrue:false
			}
		},
		methods:{
			fanhui:function(){
				// window.history.back();
				this.$router.go(-1);
			},
			toCart:function(){
				let userInfo = JSON.parse(sessionStorage.getItem("user"));
				if(userInfo == null || userInfo.length == 0){
					Toast({
						message: '请先登录！',
						position: 'middle',
						duration: 1000
					});
				}else{
					if(!this.isShow){
						this.isShow=true
						this.isTrue=true
					}else{
						console.log(this.data)
						this.$http.jsonp("http://127.0.0.1:9000/api/cart/getList",{
							jsonpCallback: "getCallBack",
							params: {
								userId: userInfo[0].id
							}
						}).then((res) => {
							console.log(res.body)
							let flag = true;
							for (const pro of res.body) {
								if (pro.proId == this.data.id) {
									// let proInfo = this.getCart(pro.id);
									// console.log(typeof pro.amount)
									let num = this.amount + pro.amount;
									flag = false;
									this.updateCart(pro.id, num);
								}
							}
							if (flag) this.addCart(this.amount);
						})					
					}
				}				
			},
			updateCart(id, amount){
				let userInfo = JSON.parse(sessionStorage.getItem("user"));
				this.$http.jsonp("http://127.0.0.1:9000/api/cart/update",{
						jsonpCallback: "getCallBack",
						params: { 
							amount: amount,
							userId: userInfo[0].id,
							id: id	
						}
					}).then((res)=>{
							console.log(res);
							if(res.status == 200) {
								Toast({
									message: '添加成功！',
									position: 'middle',
									duration: 1000
								});
							}
							
						}).catch(e => {
						// 打印一下错误
						console.log("wr",e)
					});
			},
			addCart(amount){
				let userInfo = JSON.parse(sessionStorage.getItem("user"));
				this.$http.jsonp("http://127.0.0.1:9000/api/cart/add",{
						jsonpCallback: "getCallBack",
						params: { 
							proId: this.data.id,
							proName: this.data.proName,
							price: this.data.price,
							amount: amount,
							userId: userInfo[0].id,
							img: this.data.img,		
						}
					}).then((res)=>{
							// console.log(res);
							if(res.status == 200) {
								Toast({
									message: '添加成功！',
									position: 'middle',
									duration: 1000
								});
							}
						}).catch(e => {
						// 打印一下错误
						console.log("wr",e)
					});
			},
			myCart(){
				this.$router.push("/mall/gouwuche")
			},
			cha:function(){
				console.log(1)
				this.isShow=false
				this.isTrue = false
			},
			add:function(){			
				this.amount++
			},
			minus:function(){
				if(this.amount == 1){
					return this.amount = 1
				}else{
					this.amount--
				}
			}
		},
		mounted(){
			let id = this.$route.params.id;
			this.$http.jsonp("http://127.0.0.1:9000/api/product/getList",{
				jsonpCallback: "getCallBack"
			}).then((res)=>{
					var datalist = res.body;
					for (const data of datalist) {
						if(id == data.id) {
							this.data = data;
							return;
						}
					}					
				}).catch(e => {
				// 打印一下错误
				console.log("wr",e)
			});
		}
	}
</script>

<style scoped>
	.zhezhao{
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		z-index: 6;
	}
	.detail{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	/*.detai_zhezhao{
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: rgba(255,255,255,.9);
		z-index: 88;
	}*/
	.detail_bg{
		width: 100%;
		height: 17rem;
		/*background: url(../img/img10.png) center center no-repeat;
		background-size: 100% 100%;*/
	}
	.detail_bg img{
		width: 100%;
		height: 100%;
	}
	.detail_bg span{
		display: inline-block;
		position: absolute;
	    top: 0.5rem;
	    left: 0.5rem;
	}
	.detail_content{
		flex:1;
		width: 100%;
		/*overflow: auto;*/
		/*height: 5.375rem;*/
		/*background: palevioletred;*/
	}
	.detail_content h2{
		
		font-size: 0.8rem;
		color: #101010;
		height: 2.5rem;
		display: flex;
		align-items: center;
		padding-left: 0.75rem;
		box-sizing: border-box;
	}
	.detail_content p{
		color: #e75058;
		font-size: 0.7rem;
		line-height: 1.2rem;
		padding-left: 0.75rem;
		box-sizing: border-box;
	}
	.detail_content .des{
		color: black;
	}
	.detail_content img{
		width: 100%;
		height: 1.75rem;
		float: left;
	}
	.detail_add{
		width: 100%;
		height: 2.45rem;
		line-height: 2.45rem;
		box-sizing: border-box;
		background: white;
		position: relative;
		z-index: 10;
	}
	.detail_add span{
		display: inline-block;
		width: 4.95rem;
		height: 1.675rem;
		border-radius: 0.3rem;
		font-size: 0.7rem;
		color: #777777;
		text-align: center;
		line-height: 1.675rem;
		background: #ffd914;
		position: absolute;
		right: 0;
		top: 16%;
	}
	.detail_add .mycart{
		margin-right: 6rem;
	}
	.add_to_cart{
		width: 100%;
		height: 7.25rem;
		position: fixed;
		z-index: 10;
		bottom: 2.45rem;
		background: white;
	}
	.detail_box{
		float: right;
		width: 12.5rem;
		height: 4.75rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: 1.225rem;
	}
	.add_to_cart img{
		width: 4.75rem;
		height: 4.75rem;
		margin-left: 0.65rem;
		margin-top: 1.225rem;
	}
	.add_to_cart p{
		display: inline-block;
		width: 12.5rem;
	}
	.add_to_cart p span:nth-of-type(1){
		font-size: 0.65rem;
		color: #e75058;
	}
	.add_to_cart p span:nth-of-type(2){
		float: right;
		font-size: 2rem;
		color: #333333;
		margin-right: 1rem;
    	margin-top: -0.45rem;
	}
	.add_to_cart .detail_amount{
		width: 5.5rem;
		height: 1.75rem;
		border: 0.025rem solid #979797;
		border-radius: 0.3rem;
		overflow: hidden;
		display: inline-block;
	}
	.add_to_cart .detail_amount button{
		width: 1.5rem;
		height: 1.75rem;
		border: none;
		background: white;
	}
	.add_to_cart .detail_amount button:nth-of-type(1){
		border-right: 0.025rem solid #979797;
	}
	.add_to_cart .detail_amount button:nth-of-type(2){
		border-left: 0.025rem solid #979797;
	}
	.add_to_cart .detail_amount span{
		display: inline-block;
		width: 1.9rem;
		text-align: center;
	}
	footer{
		border-top: 0.025rem solid #eaeaea;
	}
</style>