/* 汇总所有vuex模块 */
import home from "./home"
import search from "./search"
import detail from "./detail"
import shopCart from "./shopCart"
/* 统一暴露出去 */
export default {
  home,
  search,
  detail,
  shopCart
}