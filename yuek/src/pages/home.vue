<template>
  <div class="wym-home">
    <h4>lativ 诚衣</h4>
    <!-- 搜索商品 -->
    <div class="wym-header">
      <p @click="gosearch">
        <van-icon name="search"></van-icon>搜索商品
      </p>
    </div>
    <!-- 导航 -->
    <van-tabs @click="golist">
      <van-tab v-for="(item,index) in arr" :key="index" :name="index" :title="item.title"></van-tab>
    </van-tabs>
    <!-- 内容 -->
    <div class="wym-con">
        <router-view></router-view>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact">个人</van-tabbar-item>
    </van-tabbar>
    <div id="top" @click="top">返回</div>
  </div>
</template>
<script>
import rem from "@/assets/js/rem.js";
export default {
  name: "home",
//   获取分类数据
  mounted() {
    this.$axios.get("/static/json/fenlei.json").then(res => {
    //   console.log(res);
      if (res.status == 200) {
        // console.log(res.data);
        this.arr = res.data.result;
      }
    });
    window.addEventListener("scroll",this.scrollToTop);
  },
  data() {
    return {
      arr: [],
      active: 0
    };
  },
  methods:{
    //   跳转到点击页面
    golist(name){
        if(name == 0){
            this.$router.push('/home/dian')
        }else if(name == 1){
            this.$router.push('/home/nv')
        }else if(name == 2){
            this.$router.push('/home/yun')
        }else if(name == 3){
            this.$router.push('/home/shou')
        }else if(name == 4){
            this.$router.push('/home/hua')
        }
    },
    // 跳转到搜索页
    gosearch(){
        this.$router.push('/search')
    },
    // 返回顶部
    top(){
        document.body.scrollToTop = 0;
        document.documentElement.scrollTop = 0;
    },
    scrollToTop(){
        let top1 = document.getElementById("top");
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop>70){
            top1.style.display = "block";
        }else{
            top1.style.display = "none";
        }
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
.wym-home {
  h4 {
    margin-left: 0.2rem;
  }
  .wym-header {
    margin-top: 0.1rem;
    p {
      width: 5.4rem;
      height: 0.6rem;
      background: #eee;
      border-radius: 0.5rem;
      margin-left: 0.4rem;
      padding-left: 0.3rem;
      line-height: 0.6rem;
      color: #999;
    }
  }
}
#top{
    width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    text-align: center;
    border-radius: 2rem;
    background: #eee;
    color: #999;
    font-size: 0.3rem;
    position: fixed;
    right: 0.06rem;
    bottom:2rem;
    display: none;
}
</style>