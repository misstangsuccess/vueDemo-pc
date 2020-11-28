import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
        meta: {
          isFooterHide: true
        }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFooterHide: true
      }
    },
    {
      name: "search",
      /* 可传递params参数  ?代表参数可选的*/
      path: "/search/:searchText?",
      component: Search
    }
  ]
})