<template>
  <div class="wym-search">
    <!-- 头部返回首页 -->
    <p @click="gohome">
      <van-icon name="arrow-left" />
      <span>搜索</span>
    </p>
    <!-- 搜索商品 -->
    <div class="s-search">
      <input type="text" @blur="add" placeholder="输入关键字" v-model="keyword" />
      <span>取消</span>
      <ul>
        <li v-for="(item,index) in search" :key="index">{{item.title}}</li>
      </ul>
    </div>
    <!-- 历史记录 -->
    <div class="wym-history">
      <div>
        <h4>历史记录</h4>
        <van-icon name="delete" size="25" @click="clear()"/>
      </div>
      <ul class="wym-name">
        <li v-for="(item,index) in history_list" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
  created() {
    let res = localStorage.getItem("lativ");
    if (res == null) {
      this.history_list = [];
    } else {
      this.history_list = JSON.parse(res);
    }
  },
  mounted() {
    // 获取商品名称
    this.$axios.get("/static/json/list.json").then(res => {
      if (res.status == 200) {
        this.list = res.data.result;
      }
    });
  },
  data() {
    return {
      keyword: "",
      list: [],
      history_list: []
    };
  },
  methods: {
    // 回到首页
    gohome() {
      this.$router.push("/home");
    },
    // 添加历史记录
    add() {
      if (this.keyword == "") {
        return false;
      }
      // 追加历史记录
      this.history_list.unshift(this.keyword);
      if (this.history_list.length > 6) {
        //数据大于六条末尾删除
        this.history_list.pop();
      }
      // 把数据存入到缓存中
      localStorage.setItem("lativ", JSON.stringify(this.history_list));
    },
    // 清除数据
    clear(){
        localStorage.removeItem("list");
        this.history_list = [];
    }
  },
  computed:{
    //   搜索列表
   search(){
       let data = this.list.filter(item=>{
        //    判断搜索列表关键字是否为空
        if(this.keyword == ""){
            return "";
        }
        if(item.title.indexOf(this.keyword) !=-1){
            return item;
        }
       })
       return data;
   }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-size: 0.25rem;
}
.s-search {
  input {
    width: 5.4rem;
    background: #eee;
    margin-left: 0.2rem;
    border: 0;
    height: 0.4rem;
    padding-left: 0.2rem;
    border-radius: 0.2rem;
  }
}
.wym-history {
  div {
    width: 5.8rem;
    display: flex;
    justify-content: space-between;
    margin-left: 0.4rem;
  }
  .wym-name {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      height: 0.4rem;
      background-color: #eee;
      text-align: center;
      margin-left: 0.1rem;
      margin-top: 0.1rem;
    }
  }
}
</style>