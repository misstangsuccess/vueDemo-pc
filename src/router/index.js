import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
/* 重写push和replace方法,是为了让编程式导航重复点击时不报错 */
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, onComplete, onAbrot) {
  //若用户想处理失败,就处理
  if (onComplete, onAbrot) {
    return push.call(this, location, onAbrot)
  }
  /* 若用户不处理失败就给空函数 */
  return push.call(this, location, () => { })
}
VueRouter.prototype.replace = function (location, onComplete, onAbrot) {
  if (onComplete && onAbrot) {
    return replace.call(this, location, onAbrot)
  }
  return replace.call(this, onComplete, onAbrot, () => { })
}

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
      /* 当组件加载显示时,meta中的参数会传到$route中
      当组件不加载显示时,meta中参数不会传
       */
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