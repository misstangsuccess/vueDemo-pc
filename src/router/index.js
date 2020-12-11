import Vue from "vue";
import VueRouter from "vue-router";
//为了拿到token数据
import store from "../store";
// Vue 的异步组件和 Webpack 的代码分割功能,实现路由组件的懒加载。
//const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Home = () => import(/* webpackChunkName: "Home" */'../views/Home')
const Login = () => import(/* webpackChunkName: "Login" */'../views/Login')
const Register = () => import(/* webpackChunkName: "Register" */'../views/Register')
const Search = () => import(/* webpackChunkName: "Search" */'../views/Search')
const Detail = () => import(/* webpackChunkName: "Detail" */'../views/Detail')
const ShopCart = () => import(/* webpackChunkName: "ShopCart" */'../views/ShopCart')
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess" */'../views/AddCartSuccess')
const Trade = () => import(/* webpackChunkName: "Trade" */'../views/Trade')
const Center = () => import(/* webpackChunkName: "Center" */'../views/Center')
const Pay = () => import(/* webpackChunkName: "Pay" */'../views/Pay')
const PaySuccess = () => import(/* webpackChunkName: "PaySuccess" */'../views/PaySuccess')
const GroupBuy = () => import(/* webpackChunkName: "GroupBuy" */ '../views/Center/GroupBuy')
const MyOrder = () => import(/* webpackChunkName: "MyOrder" */ '../views/Center/MyOrder')
/* import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "../views/Detail";
import ShopCart from "../views/ShopCart";
import AddCartSuccess from "../views/AddCartSuccess"
import Trade from "../views/Trade"
import Center from "../views/Center"
import Pay from "../views/Pay"
import PaySuccess from "../views/PaySuccess" */
// import GroupBuy from "../views/Center/GroupBuy"
// import MyOrder from "../views/Center/MyOrder"
/* 重写push和replace方法,是为了让编程式导航重复点击时不报错 */
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, onComplete, onAbrot) {
  //若用户想处理失败,就处理
  if (onComplete, onAbrot) {
    return push.call(this, location, onComplete, onAbrot)
  }
  /* 若用户不处理失败就给空函数 */
  return push.call(this, location, onComplete, () => { })
}
VueRouter.prototype.replace = function (location, onComplete, onAbrot) {
  if (onComplete && onAbrot) {
    return replace.call(this, location, onComplete, onAbrot)
  }
  return replace.call(this, location, onComplete, onAbrot, () => { })
}

Vue.use(VueRouter)
const router = new VueRouter({
  //默认模式是hash,但是生产环境中应该改为history
  mode: "history",
  /* 路由配置 */
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
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail
    },
    {
      name: "shopCart",
      path: "/shopCart",
      component: ShopCart
    },
    {
      name: "AddCartSuccess",
      path: "/addCartSuccess",
      component: AddCartSuccess,
      //路由独享守卫
      /*  beforeEnter: (to, from, next) => {
         //判断路径是否从detail路径跳转过来的并且从内存中获取加入到购物车的数据
         //若是则可以直接进到加入到购物的页面,否则进入购物车清单页面
         if (from.name === "detail" && sessionStorage.getItem("cart")) {
           return next()
         }
         next("/shopCart")
       } */
    },
    {
      name: "Trade",
      path: "/trade",
      component: Trade
    },
    {
      name: "Center",
      path: "/center",
      component: Center,
      children: [
        {
          path: "/center/myorder",
          component: MyOrder
        },
        {
          path: "/center/groupbuy",
          component: GroupBuy,
        },
        //重定向
       /*  {
          path: "/center",
          redirect: "/center/myorder"
        } */
      ]
    },
    {
      name: "Pay",
      path: "/pay",
      component: Pay
    },
    {
      name: "PaySuccess",
      path: "/paysuccess",
      component: PaySuccess
    },
  ],
  /* 页面跳转到顶部设置*/
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
//配置全局路由守卫
//需要进行权限验证的地址
//权限验证：
//如果用户未登录，不允许去 trade pay center 等路由
const promissionPath = ['/trade', '/pay', '/center']
router.beforeEach((to, from, next) => {
  /* to:要去的路由对象
    from:从哪里来的路由对象(当前路由对象)
    next:是一个函数：跳转到哪个路由的方法
    比如：要去to这个路由 next()	
    要去登录路由 next('/login')  next({path: '/login'})  next({name: 'login'})
   */
  if (promissionPath.indexOf(to.path) > -1 && !store.state.user.token) {
    return next('/login')
  }
  console.log(to, from, next);
  next()
})
export default router