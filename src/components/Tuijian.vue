<template>
	<div class="tuijian">
		<div class="tuijian_banner">
			<mt-swipe :show-indicators="false">
			  	<mt-swipe-item v-for="data in datalist1" :key="data.id">
					<router-link :to="'/detail/'+data.id">
						<img :src="data.img"/>
					</router-link>			 
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="tuijian_new">
			<h2>十大好书</h2>
			<div class="tuijian_huadong">
				<swiper :options="swiperOption">
					<swiper-slide class='swiper1'  v-for="data in datalist2" :key="data.id">
						<router-link :to="'/detail/'+data.id">
							<div class="pro">
								<img v-bind:src="data.img"/>
								<p class="title">{{data.proName}}</p>
								<p>￥{{data.price}}</p>
							</div>
						</router-link>	
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="tuijian_show">
			<h2>BOOK SHOW</h2>
			<div class="show_lunbo">
				<swiper :options="swiperOption2">					
					<swiper-slide class="swiper2" v-for="data in datalist3" :key="data.id">
						<div class="tuijian_box">
							<div class="tuijian_show_top">
								<div class="tuijian_touxiang"></div>
								<span>{{data.author}}</span>
							</div>
							<router-link :to="'/detail/'+data.id">
								<img :src="data.img"/>
							</router-link>
							<div class="tubiao">
								<i class="iconfont icon-zan"></i>
								<i class="iconfont icon-shoucang"></i>
								<i class="iconfont icon-BAI-pinglun"></i>
							</div>
							<p>{{data.proName}}</p>
						</div>
					</swiper-slide>				
				</swiper>
			</div>
		</div>
		<div class="tuijian_like">
			<h2>猜你喜欢</h2>
			<div class="like_box">
				<router-link :to="'/detail/'+ data1.id">
					<img :src="data1.img"/>
				</router-link>
				<h3>{{data1.proName}}</h3>
				<p>{{data1.description}}</p>
				<span>￥{{data1.price}}</span>
				<router-link :to="'/detail/'+ data1.id" class="buy">
					<span>购买</span>
				</router-link>			
			</div>
		</div>
		<div class="tuijian_like">
			<h2>猜你喜欢</h2>
			<div class="like_box">
				<router-link :to="'/detail/'+ data2.id">
					<img :src="data2.img"/>
				</router-link>
				<h3>{{data2.proName}}</h3>
				<p>{{data2.description}}</p>
				<span>￥{{data2.price}}</span>
				<router-link :to="'/detail/'+ data2.id" class="buy">
					<span>购买</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import $http from 'vue-resource'
	import 'swiper/dist/css/swiper.css'
	import {swiper,swiperSlide} from "vue-awesome-swiper"
	import { Swipe, SwipeItem } from 'mint-ui';
	export default {
		name:"Tuijian",
		components:{
			swiper,swiperSlide
		},
		data(){
			return {
				data1: {},
				data2: {},
				datalist:[],
				datalist1:[],
				datalist2:[],
				datalist3:[],
				swiperOption:{
					autoplay:false,
//					slidesPerView: 3
					pagination: '.swiper-pagination',
		            slidesPerView: 'auto',
		            paginationClickable: true,
		            spaceBetween: 10
				},
				swiperOption2:{
					autoplay:false,
//					slidesPerView: 3
					pagination: '.swiper-pagination',
					type: 'fraction',
		            slidesPerView: 'auto',
		            paginationClickable: true,
		            spaceBetween: 10
				}
			}
		},
		mounted(){
			this.$emit("to-father","tuijian");
			this.$http.jsonp("http://127.0.0.1:9000/api/product/getList",{
				jsonpCallback: "getCallBack"
			})
			.then((res)=>{
					// console.log(res.body)
					this.datalist = res.body;	
					this.datalist1 = res.body.slice(8,12);
					this.datalist2 = res.body.slice(0, 8);
					this.datalist3 = res.body.slice(12,14);	
					this.data1 = this.datalist[16];
					this.data2 = this.datalist[17];
				}).catch(e => {
				// 打印一下错误
				console.log("wr",e)
		  	});
		}
	}
</script>

<style scoped>
	.tuijian{
		flex: 1;
		overflow: auto;
		margin-bottom: 2.875rem;
	}
	.tuijian_new{
		width: 100%;
	}
	.tuijian_new h2{
		height: 3.2rem;
		font-size: 0.75rem;
		color: #555555;
		text-align: center;
		line-height: 3.2rem;
	}
	.tuijian_huadong{
		padding: 0 6%;
	}
	.tuijian_huadong .swiper-wrapper{
		display: flex;
		/* justify-content: space-between; */
		/* flex-wrap: nowrap; */
	}
	.swiper1{
		width: 48%;
		height: 9.7rem;
		/* margin-right: 12% !important; */
	}
	.swiper1 div{
		height: 9.7rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.swiper1 div p:nth-of-type(1){
		font-size: 0.65rem;
		color: #6f6f6f;
	}
	.swiper1 div p:nth-of-type(2){
		font-size: 0.45rem;
		color: #e75058;
	}
	.swiper1 div img{
		width: 100%;
		height: 6.95rem;
	}
	.tuijian_morenew{
		width: 100%;
		height: 3.975rem;
		font-size: 0.65rem;
		text-align: center;
		line-height: 3.975rem;
	}
	.tuijian_show{
		width: 100%;
		height: 27.8rem;
		/*background: paleturquoise;*/
	}
	.tuijian_show h2{
		width: 100%;
		height: 3.6rem;
		font-size: 0.75rem;
		color: #555555;
		text-align: center;
		line-height: 3.6rem;
	}
	.show_lunbo{
		padding-left: 2rem;
	}
	.swiper2{
		width: 98%;
		height: 21.975rem;
		margin-right: 0.25rem;
		/*background: palevioletred;*/
	}
	.swiper2 .tuijian_box{
		height: 21.975rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.swiper2 div img{
		width: 17.25rem;
		height: 15rem;
	}
	.swiper2 div .tuijian_show_top span{
		font-size: 0.7rem;
		color: #606060;
		padding-left: 0.5rem;
	}
	.swiper2 div .tuijian_show_top {
		height: 2.1rem;
		line-height: 2.1rem;
		display: flex;
		align-items: center;
		padding-left: 0.5rem;
	}
	.tuijian_touxiang{
		width: 1.35rem;
		height: 1.35rem;
		border-radius: 50%;
		display: inline-block;
		background: #ffd914;
		
	}
	.swiper2 div p{
		font-size: 0.6rem;
		color: #5d5d5d;
		height: 2rem;
		line-height: 1rem;
	}
	.tubiao{
		padding-left: 0.75rem;
	}
	.tuijian_like{
		width: 17.25rem;
		margin: 0 auto;
		/*background: palegreen;*/
	}
	.tuijian_like h2{
		width: 100%;
		height: 3.15rem;
		font-size: 0.75rem;
		color: #555555;
		text-align: center;
		line-height: 3.15rem;
	}
	.tuijian_like .like_box{
		width: 100%;
		height: 21.5rem;
	}
	.tuijian_like .like_box img{
		width: 100%;
		height: 15rem;
	}
	.tuijian_like .like_box h3{
		font-size: 0.75rem;
		color: #636363;
		line-height: 2rem;
	}
	.tuijian_like .like_box p{
		font-size: 0.65rem;
		color: #7b7b7b;
		height: 2rem;
		line-height: 1rem;
		margin-bottom: 0.35rem;
	}
	.tuijian_like .like_box span:nth-of-type(1){
		font-size: 0.6rem;
		color: #e75058;
	}
	.tuijian_like .buy{
		float: right;
		/* display: inline-block; */
		width: 3.625rem;
		height: 1.4rem;
		font-size: 0.65rem;
		color: #7b7b7b;
		line-height: 1.4rem;
		text-align: center;
		border: 0.075rem solid #5e5e5e;
		border-radius: 0.3rem;
	}
	.title{
		width:100%;
		height: 2rem;
		line-height: 2rem;
		white-space: nowrap;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
	}
</style>