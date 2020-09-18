<template>
	<div class="mall">
		<div class="mall_header" v-if="isTrue">
			<div class="mall_header_top">
				<span>Book</span>	
				<div class="mall_header_top_search">
					<img src="../img/search.png"/>
					<input type="text" placeholder="搜索商品" @click="search" />
				</div>
				<i class="iconfont icon-xiaoxi"></i>
			</div>
		</div>
		<router-view @to-parent="getChildData" @to-dad="clickU" class="view"></router-view>
		<!--<div class="footer">-->
			<mt-tabbar fixed>
			  <mt-tab-item id="" @click.native="clickShangcheng" :class="{active:f1}">
			    <i class="iconfont icon-store_icon" slot="icon"></i>
			   商城
			  </mt-tab-item>
			  <mt-tab-item id="" @click.native="clickFenlei" :class="{active:f2}">
			    <i class="iconfont icon-Community" slot="icon"></i>
			    分类
			  </mt-tab-item>
			  <mt-tab-item id="" @click.native="clickGouwuche" :class="{active:f3}">
			    <i class="iconfont icon-gouwuche" slot="icon"></i>
			    购物车
			  </mt-tab-item>
			  <mt-tab-item id=""  @click.native="clickWode" :class="{active:f4}">
			  	
			    <i class="iconfont icon-daohanglan-05" slot="icon"></i>
			  我的
			  </mt-tab-item>
			</mt-tabbar>
		<!--</div>-->
	</div>
</template>

<script>
	import { Tabbar, TabItem, MessageBox, Toast } from 'mint-ui';
	export default {
		name:"Info",
		data(){
			return {
				isTrue:true,
				f1:true,
				f2:false,
				f3:false,
				f4:false,
			}
		},
		methods:{
			search(){
				MessageBox.prompt('请输入商品').then(({ value, action }) => {
					this.$http.jsonp("http://127.0.0.1:9000/api/product/getPro",{
						jsonpCallback: "getCallBack",
						params: {proName: value}
					})
					.then((res)=>{
							console.log(res)
							if(res.status == 200) {
								this.$router.push('/detail/'+ res.body[0].id)
							}else {
								Toast({
									message: '没有该商品！',
									position: 'middle',
									duration: 1000
									});
							}	
						}).catch(e => {
						// 打印一下错误
						console.log("wr",e)
					});
				});
			},
			clickWode:function(){
				this.$router.push("/mall/wode")
				
			},
			clickShangcheng:function(){
				this.isTrue=true
				this.$router.push("/")
				this.f1=true
				this.f2=false
				this.f3=false
				this.f4=false
			},
			clickGouwuche:function(){
				this.$router.push("/mall/gouwuche")
			},
			clickFenlei:function(){
				this.$router.push("/mall/fenlei/0")
				
			},
			clickU(value){
				if(value == "gouwuche"){
					this.f1=false
					this.f2=false
					this.f3=true
					this.f4=false
				}else if(value == "fenlei"){
					this.f1=false
					this.f2=true
					this.f3=false
					this.f4=false
				}else if(value == "wode"){
					this.f1=false
					this.f2=false
					this.f3=false
					this.f4=true
				}else{
					this.f1=true
					this.f2=false
					this.f3=false
					this.f4=false
				}
			},
			getChildData(value){
				console.log(value)
		  		if(value == "gouwuche"||value == "wode"||value == "fenlei"){
			  		this.isTrue = false
		  		}else{
		  			this.isTrue = true
		  		}
			}
		}
	}
</script>

<style>
	/*.view{
		margin-bottom: 2.875rem;
	}*/
</style>