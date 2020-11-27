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
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./imgs/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="search-area">
        <form action="###" class="search-form">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
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
  methods: {
    search() {
      this.$router.push('/search');
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
/* .search-form input:focus {
  outline: none;
} */
.search-form button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
/* .search-form button:focus {
  outline: none;
} */
</style>