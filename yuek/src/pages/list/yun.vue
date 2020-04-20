<template>
  <div class="wym-dian">
    <!-- 排序 -->
    <van-row type="flex">
      <van-col span="4">综合</van-col>
      <van-col span="4">销量</van-col>
      <van-col span="4">新品</van-col>
      <van-col span="5" class="icon">
        价格
        <van-icon name="arrow-up" @click="sort(1)" v-show="pai==1" />
        <van-icon name="arrow-down" @click="sort(2)" v-show="pai==2" />
      </van-col>
    </van-row>
    <!-- 渲染数据 -->
    <ul class="wym-list">
      <li v-for="(item,index) in newList" :key="index">
        <img :src="item.pic" alt />
        <p>{{item.title}}</p>
        <b>￥{{item.price}}</b>
        <s>{{item.old_price}}</s>
        <!-- 添加到购物车 -->
        <van-icon name="cart-o" @click="show = true" />
        <van-overlay :show="show" @click="show = false">
          <div class="wym-block">
             <img :src="item.pic" alt />
             <p>￥{{item.price}}</p>
             <p>{{item.title}}</p>
             <button @click="add(item)">加入购物车</button>
          </div>
        </van-overlay>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "dian",
  // 获取数据
  mounted() {
    this.$axios.get("/static/json/list.json").then(res => {
      console.log(res);
      if (res.status == 200) {
        this.list = res.data.result;
      }
    });
  },
  data() {
    return {
      list: [],
      pai: 1, 
      show: false
    };
  },
  methods: {
    // 排序
    sort(n) {
      this.pai = n == 1 ? 2 : 1;
      this.list.sort((a, b) => {
        return n == 1 ? a.price - b.price : b.price - a.price;
      });
    },
    // 添加购物车信息在控制台输出
    add(item){
        this.show = false;
        console.log(
            `${item.title} ${item.price}元 加入购物车`
        )
    }
  },
  computed:{
    //   筛选数据
    newList(){
        return this.list.filter(item=>{
            return item.cid == '5a0424b8010e711234661437'
        })
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 0.3rem;
}
.wym-dian {
  background-color: #eee;
  .wym-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 45%;
      background-color: #fff;
      margin-top: 0.1rem;
      img {
        width: 2.8rem;
        height: 3rem;
        margin: 0 auto;
      }
      p {
        font-size: 0.2rem;
        text-align: center;
      }
    }
  }
}
.wym-block {
  width: 6.4rem;
  height: 4rem;
  margin-top: 3rem;
  background-color: #fff;
  img{
      width: 2rem;
      height: 1rem;
   }
   button{
       margin-left: 4.5rem;
       font-size: 0.25rem;
   }
}
.icon {
  display: flex;
  align-items: center;
  color: red;
}
</style>