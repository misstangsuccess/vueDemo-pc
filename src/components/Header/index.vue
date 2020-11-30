<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="login-list">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请 </span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="type-list">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logo-area">
        <router-link class="logo" title="尚品汇" to="/">
          <img src="./imgs/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="search-area">
        <form action="###" class="search-form">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchText"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="search"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    /*  search() {
     //获取搜索数据
      const { searchText } = this;
      //判断是否加params参数
      const params = searchText ? `/${searchText}` : '';
      //生成跳转路径
      const location = '/search' + params;
      //编程式导航:将来要做搜索功能(发送请求)
      this.$router.push(location);
       编程式导航重复跳转到同一个路径会报错：
          Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/search".    
    }, */
    search() {
      const { searchText } = this;
      //编程式导航：原因将来要做搜索功能（要发送请求）
      const location = {
        name: 'search', //使用命名路由
      };
      if (searchText) {
        location.params = { searchText };
      }
      /* 添加query参数 */
      const { categoryName } = this.$route.query;
      if (categoryName) {
        location.query = this.$route.query;
      }
      this.$router.push(location);
      /* .then(() => {
        console.log('成功').catch(() => {
          console.log('err');
        }); */
      //});
    },
  },
};
</script>

<style lang="less" scoped>
/* 头部第一行样式 */
.top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
  /* overflow: hidden; */
}
.container .login-list {
  float: left;
}
.login-list p {
  float: left;
  margin-right: 10px;
}
.register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.container .type-list {
  float: right;
}
.type-list a {
  padding: 0 10px;
}
.type-list a + a {
  border-left: 1px solid #b3aeae;
}
/* 头部第二行样式 */
.bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.bottom .logo-area {
  float: left;
}
.logo-area img {
  width: 175px;
  margin: 25px 45px;
}
.search-area {
  float: right;
  margin-top: 35px;
}
.search-area .search-form {
  overflow: hidden;
}
.search-form input {
  box-sizing: border-box;
  width: 480px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.search-form input:focus {
  outline: none;
}
.search-form button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.search-form button:focus {
  outline: none;
}
</style>