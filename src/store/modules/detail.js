//search组件的vuex状态
import { reqGetProductDetail } from "@api/detail"
export default {
  state: {
    productDetail: {
      categoryView: {},
      spuSaleAttrList: [],
      skuInfo: {},
      skuImageList: []
    }
  },
  /* 为了组件中方便使用数据 */
  getters: {
    categoryView (state) {
      return state.productDetail.categoryView
    },
    spuSaleAttrList (state) {
      return state.productDetail.spuSaleAttrList
    },
    skuInfo (state) {
      return state.productDetail.skuInfo
    },
    skuImageList (state) {
      return state.productDetail.skuImageList
    }
  },
  actions: {
    async getProductDetail ({ commit }, id) {
      const productDetail = await reqGetProductDetail(id)
      commit("GET_PRODUCT_DETAIL", productDetail)
    }
  },
  mutations: {
    GET_PRODUCT_DETAIL (state, productDetail) {

      state.productDetail = productDetail
    }
  }
}