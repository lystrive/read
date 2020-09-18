<template>
	<div class="gouwuche">
		<div class="gouwuche_title">
			我的购物车
		</div>
		<div class="gouwuche_tu1">
			<img src="../img/img20.png"/>
		</div>
		<div class="gouwuche_box1" v-show="isTrue1">
			<div class="gouwuche_tu2">
				<img src="../img/img21.png"/>
			</div>
			<button class="toIndex" @click="toIndex">去首页挑选</button>
			<div class="gouwuche_tuijian">
				<img src="../img/img22.png"/>
			</div>
		</div>
		<div class="gouwuche_box2" v-show="isTrue2">
			<div class="gouwuche_list" v-for="data in dataList" :key="data.id">
				<input type="checkbox" v-model="data.isChecked" @click="select(data)"/>
				<img v-bind:src="data.img"/>
				<div class="gouwuche_neirong">
					<div class="gouwuche_descripe">
						<p>{{data.proName}}</p>
						<img src="../img/icon5.png" @click="remove(data)"/>
					</div>
					<div class="gouwuche_amount">
						<div v-show="false">{{data.id}}</div>
						<button @click="minus(data)">-</button>
						<span>{{data.amount}}</span>
						<button @click="add(data)">+</button>
					</div>
					<span>￥{{data.price * data.amount}}</span>
				</div>
			</div>
		</div>
		<div class="pay" v-show="isTrue3">
			<input v-model="isCheckAll" type="checkbox" id="text" @click="selectAll"/> <label for="text"><span>全选</span></label>
			<span class="total">￥{{total}}</span>
			<span class="create" @click="pay">确认支付</span>
		</div>
	</div>
</template>

<script>
	import $http from "vue-resource";
	import { Toast, MessageBox } from 'mint-ui';
	export default {
		name:"Gouwuche",
		data(){
			return {
				dataList:[],
				isTrue1:false,
				isTrue2:false,
				isTrue3:false,
				isCheckAll: true,
				total:0,
				amount:1
			}
		},
		methods:{
			pay(){
				Toast({
					message: '支付成功!',
					position: 'middle',
					duration: 1000
				});
			},
			toIndex:function(){
				this.$router.push("/mall");
			},
			add:function(data){
				data.amount ++;		
				this.calTotal();		
			},
			minus:function(data){
				data.amount --;
				if (data.amount < 1) {
					data.amount = 1;
				}
				this.calTotal();
			},
			select(data){
				data.isChecked = ! data.isChecked;
				let num = 0;
				for (const data of this.dataList) {				
					if(data.isChecked) num++;
				}
				this.dataList.length == num ? this.isCheckAll = true : this.isCheckAll = false;
				this.calTotal();
			},
			calTotal(){
				let num = 0;
				// console.log(this.dataList)
				for (const data of this.dataList) {
					if(data.isChecked) {
						num += data.amount * data.price;
					}
				}
				this.total = num;
			},
			selectAll(){				
				for (const data of this.dataList) {
					data.isChecked = ! this.isCheckAll;					
				}
				this.calTotal();
			},
			remove:function(data){
				MessageBox.confirm("确定删除该商品？", "提示").then(action => {
					for(let i = 0; i < this.dataList.length; i++) {
						if(data.id == this.dataList[i].id) {
							this.dataList.splice(i, 1);
							this.$http.jsonp("http://127.0.0.1:9000/api/cart/delete",{
								jsonpCallback: "getCallBack",
								params: {
									id: data.id
								}
							}).then((res) => {
								console.log(res)
								if(res.status == 200) {
									Toast({
										message: '删除成功!',
										position: 'middle',
										duration: 1000
									});
								}
							})
							return;
						}
					}
					this.calTotal();
				});
				
			}
		},
		mounted(){
			this.$emit("to-parent","gouwuche");
			this.$emit("to-dad","gouwuche");
			let userInfo = JSON.parse(sessionStorage.getItem("user"));
			// console.log(userInfo)
			if(userInfo == null || userInfo.length == 0){
				Toast({
					message: '请先登录！',
					position: 'middle',
					duration: 1000
				});
			} else {
				this.$http.jsonp("http://127.0.0.1:9000/api/cart/getList",{
					jsonpCallback: "getCallBack",
					params: {
						userId: userInfo[0].id
					}
				}).then((res) => {
					// console.log(res.body)
					if(res.body == null || res.body.length == 0){
						this.isTrue1 = true;
						this.isTrue2 = false;
						this.isTrue3 = false;
					} else {
						this.isTrue1 = false;
						this.isTrue2 = true;
						this.isTrue3 = true;
						this.dataList = res.body;
						for (const data of this.dataList) {
							data.isChecked = true;
						}
						this.calTotal();
					}
				})
			}
		}
	}
</script>

<style scoped>
	.gouwuche{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.gouwuche_title{
		width: 100%;
		height: 2.25rem;
		font-size: 0.75rem;
		text-align: center;
		line-height: 2.25rem;
	}
	.gouwuche_box1,.gouwuche_box2{
	flex: 1;
	overflow: auto;
	margin-bottom: 2.875rem;

	}
	.gouwuche_tu1{
		width: 100%;
		height: 1.75rem;
	}
	.gouwuche_tu1 img{
		height: 100%;
		width: 100%;
	}
	.gouwuche_tu2{
		width: 100%;
		height: 11.775rem;
	}
	.gouwuche_tu2 img{
		width: 100%;
		height: 100%;
	}
	.toIndex{
		width: 4.95rem;
		height: 1.65rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.5rem;
		font-size: 0.65rem;
		color: #fdb400;
		border: 0.075rem solid #fdb400;
		border-radius: 0.3rem;
		background: white;
	}
	.gouwuche_tuijian{
		width: 100%;
		height: 1.1rem;
		margin-top: 2.75rem;
	}
	.gouwuche_tuijian img{
		width: 100%;
		height: 100%;
	}
	.gouwuche_jingpin{
		margin-top: 0.5rem;
		display: flex;
		flex-wrap: wrap;
   		justify-content: space-around;
	}
	.gouwuche_mall{
		width: 8.625rem;
		height: 12.875rem;
	}
	.gouwuche_mall img{
		width: 100%;
		height: 8.625rem;
	}
	.gouwuche_mall p:nth-of-type(1){
		width: 8.625rem;
		font-size: 0.6rem;
		color: #9c9c9c;
		height: 2rem;
		line-height: 2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.gouwuche_mall p:nth-of-type(2){
		font-size: 0.5rem;
		color: #e75058;
		text-align: center;
	}
	
	.gouwuche_box2{
		flex: 1;
	}
	.gouwuche_list{
		width: 100%;
		height: 5.4rem;
		border-bottom: 0.025rem solid #979797;
		/*background: palevioletred;*/
	}
	.gouwuche_list>input{
		margin-left: 0.75rem;
	}
	.gouwuche_list>img{
		margin-top: 0.825rem;
		width: 3.75rem;
		height: 3.75rem;
		margin-left: 0.5rem;
	}
	.gouwuche_descripe p{
		color: #4e4e4e;
		font-size: 0.65rem;
		width: 9.575rem;
		height: 1.125rem;
		line-height: 1.125rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		display: inline-block;
	}
	.gouwuche_neirong{
		float: right;
		height: 3.75rem;
		width: 12.25rem;
		/*background: paleturquoise;*/
		margin-top: 0.825rem;
	}
	.gouwuche_neirong img{
		width: 1.025rem;
		height: 1.125rem;
		float: right;
    	margin-right: 1rem;
	}
	.gouwuche_amount{
		width: 5.5rem;
		height: 1.75rem;
		border: 0.025rem solid #979797;
		border-radius: 0.3rem;
		overflow: hidden;
		display: inline-block;
		margin-top: 0.45rem;
		margin-right: 2.85rem;
	}
	.gouwuche_amount button{
		width: 1.5rem;
		height: 1.75rem;
		border: none;
		background: white;
	}
	.gouwuche_amount button:nth-of-type(1){
		border-right: 0.025rem solid #979797;
	}
	.gouwuche_amount button:nth-of-type(2){
		border-left: 0.025rem solid #979797;
	}
	.gouwuche_amount span{
		display: inline-block;
		width: 1.9rem;
		text-align: center;
		font-size: 16px;
		
	}
	.gouwuche_neirong>span{
		font-size: 0.65rem;
		color: #ee686b;
	    float: right;
	    margin-right: 1rem;
	    margin-top: 1.25rem;
	}
	.pay{
		position: fixed;
		bottom: 3.5rem;
		height: 2rem;
		line-height: 2rem;
		padding-left: 1rem;
		width: 100%;
	}
	.pay .total{
		color: red;
	}
	.pay .create {
		width: 4.95rem;
		height: 1.675rem;
		line-height: 1.675rem;
		border-radius: 0.3rem;
		font-size: 0.7rem;
		color: #777777;
		text-align: center;
		background: #ffd914;
		float: right;
		margin-right: 1.5rem;
		margin-top: 2px;
	}
</style>