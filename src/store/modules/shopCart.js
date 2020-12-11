//search组件的vuex状态
import {
  reqGetShopCart, reqGetUpdateCart,
   /* reqGetCheckCart , */reqGetDeleteCart,
  reqGetCheckCart
} from "@api/shopCart"
export default {
  state: {
    //所有购物车数据
    cartList: []
  },
  getters: {
    //总数量
    totalCount (state) {
      return state.cartList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum : p
      }, 0)
    },
    //总价格
    totalPrice (state) {
      return state.cartList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum * c.skuPrice : p
      }, 0)
    },
    //是否全选
    isCheckeAll (state) {
      return state.cartList.length > 0 && state.cartList.every(cart => cart.isChecked === 1)
    },
    //勾选的商品
    selectCart (state) {
      return state.cartList.filter((cart) => cart.isChecked === 1)
    }
  },
  actions: {
    /* 获取所有数据 */
    async getShopCart ({ commit }) {
      const cartList = await reqGetShopCart()
      commit('GET_SHOP_CART', cartList)
      // console.log(cartList);
    },
    //actions只能接收外面的一个参数
    //发送请求为了更新服务器数据
    async getUpdateCart ({ commit }, { skuId, skuNum }) {
      console.log(commit);
      /* 发送请求更新服务器数据 */
      await reqGetUpdateCart(skuId, skuNum,)
      /* 手动更新vuex的数据和重新请求所有购物车数据*/
    //  commit('GET_UPDATE_CART', { skuId, skuNum, isChecked: 1 })
    },
    /* 选中商品 */
    async getCheckCart ({ commit }, { skuId, isChecked }) {
      console.log(commit);
      await reqGetCheckCart(skuId, isChecked)
      // commit("GET_CHECK_CART",{skuID,isChecked})
    },
    //删除商品
    async getDeleteCart ({ commit }, skuId) {
      console.log(commit);
      await reqGetDeleteCart(skuId)
    },
  },
  mutations: {
    GET_SHOP_CART (state, cartList) {
      state.cartList = cartList
      // console.log(cartList);
    },
    //手动更新页面的方法
    GET_UPDATE_CART (state, { skuId, skuNum }) {
      //一旦更新会重新渲染组件
      state.cartList = state.cartList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart
      })
    },
    //手动选中商品
    // GET_CHECK_CART (state, skuId) {
    //   state.cartList = state.cartList.map((cart) => {
    //     if (cart.skuId === skuId) {
    //       return{...cart}
    //     }
    //     return cart
    //   })
    // }
  }
}