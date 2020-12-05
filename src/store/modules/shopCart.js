//search组件的vuex状态
import {
  reqGetShopCart, reqGetUpdateCart,
  reqGetCheckCart, /* reqGetDeleteCart */
} from "@api/shopCart"
export default {
  state: {
    //所有购物车数据
    cartList: []
  },
  actions: {
    /* 获取所有数据 */
    async getShopCart ({ commit }) {
      const cartList = await reqGetShopCart()
      commit('GET_SHOP_CART', cartList)
      console.log(cartList);
    },
    //actions只能接收外面的一个参数
    //发送请求为了更新服务器数据
    async getUpdateCart ({ commit }, { skuId, skuNum }) {
      console.log(commit);
      /* 发送请求更新服务器数据 */
      await reqGetUpdateCart(skuId, skuNum)
      /* 手动更新vuex的数据和重新请求所有购物车数据*/
      commit('GET_UPDATE_CART', { skuId, skuNum })
    },
    /* 加入购物车 */
    async getCheckCart ({ commit }, { skuID, isChecked }) {
      console.log(commit);
      await reqGetCheckCart(skuID, isChecked)
    },
  },
  mutations: {
    GET_SHOP_CART (state, cartList) {
      state.cartList = cartList
      console.log(cartList);
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
    }
  }
}