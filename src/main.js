import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
/* 引入是为了加载里面的代码,
一旦加载就会去启动服务器,
从而拦截相应的请求
 */
import "./mock/mockServer"
import "./styles/reset.css";
import './plugins/element.js';
import './plugins/loading.js';
import "./styles/iconfont.css"
import 'swiper/swiper-bundle.min.css';
Vue.config.productionTip = false;
new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store,
}).$mount("#app")