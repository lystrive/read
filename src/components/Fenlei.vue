<template>
	<div class="fenlei">
		<section class="nav">
			<div v-for="data in dataList" :key="data.id"  @click="selectType(data)" :class="{'active': currId == data.id}">
				<!-- <router-link :to="'/mall/fenlei/'+ data.id" :class="{'active': currId == data.id}" @click="selectType(data)">{{data.name}}</router-link> -->
				<p>{{data.name}}</p>
			</div>
		</section>
		<div class="content">
			<div class="pro" v-for="data in proTypeList" :key="data.id">					
				<router-link :to="'/detail/'+data.id" class="cont">
					<div><img v-bind:src="data.img"/></div>					
					<p class="title">{{data.proName}}</p>
					<p class="price">￥{{data.price}}</p>
				</router-link>				
			</div>
		</div>
	</div>
	
</template>

<script>
	export default {
		name:"Fenlei",
		data(){
			return {
				currId: 0,
				dataList:[
					{id: 0, name: "文学"},
					{id: 1, name: "小说"},
					{id: 2, name: "经济"},
					{id: 3, name: "旅游"},
					{id: 4, name: "育儿"},
					{id: 5, name: "游戏"}
				],
				proList: [],
				proTypeList: []
			}
		},
		methods: {
			selectType(data){
				this.currId = data.id;
				this.$router.push('/mall/fenlei/'+ data.id);
				this.getList();
				// console.log(this.proTypeList)
			},
			getList(){
				this.proTypeList = [];
				for (const pro of this.proList) {
					if(pro.type == this.currId) {
						this.proTypeList.push(pro);
					}
				}
			}
		},
		mounted(){
			this.$emit("to-dad","fenlei");
			this.$emit("to-parent","fenlei");
			this.currId = this.$route.params.id;
			this.$http.jsonp("http://127.0.0.1:9000/api/product/getList",{
				jsonpCallback: "getCallBack"
			})
			.then((res)=>{
					// console.log(res.body)
					this.proList = res.body;
					this.getList();					
				}).catch(e => {
				// 打印一下错误
				console.log("wr",e)
		  	});
		}
	}
</script>

<style scoped>
	.fenlei{
		height: calc(100% - 3.2rem);
		display: flex;
	}
	.nav {
		border-right: 1px solid grey; 
		width: 20%;
	}
	.nav div {
		height: 16.4%;
		border-bottom: 1px solid grey;
		position:relative;
	}
	.nav div p{
		position: absolute;
		top: 50%;
		left: 50%;
        transform: translateY(-50%);
		transform: translateX(-50%);
		width: 50px;
    	text-align: center;
	}
	.active {
		background: skyblue;
	}
	.content{
		width: 80%;
		padding-top: 1rem;
		overflow-y: auto;
	}
	.content .pro{
		width: 100%;
		height: 31.5%;	
		margin-bottom: 10px;
		font-size: 16px;		
	}
	.content .pro .cont{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: center;
		color: #6f6f6f;
	}
	.content .pro .cont .price{
		color: red;
	}
	.content .pro .cont img{
		width: 45%;
		height: 7.2rem;
	}
</style>