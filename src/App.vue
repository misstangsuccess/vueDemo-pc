<template>
  <div>
    <Header />
    <router-view></router-view>
    <!-- 可设置不是登录或注册时就显示footer组件 -->
    <Footer v-if="$route.path !== '/login' && $route.path !== '/register'" />
    <!--  <Footer v-if="!$route.meta.isFooterHide"></Footer> -->
  <!--    <Footer v-if="isFooterShow"></Footer> -->
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
 /*  data() {
    return {
      isFooterShow: true,
    };
  }, */
 /*    watch: {
    $route: {
      handler(newVal) {
        this.isFooterShow =
          newVal.path !== '/login' && newVal.path !== '/register';
      },
      immediate: true,
    },
  }, */
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>