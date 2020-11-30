//home组件的vuex状态
import { reqCategoryList } from "@api/category"
export default {
  state: {
    categoryList: [],//三级分类数据
  },
  actions: {
    /* 获取三级分类数据 */
    async getCategoryList ({ commit }) {
      /* 发送请求 */
      const categoryList = await reqCategoryList();
      /* 触发mutations函数 */
      commit("GET_CATEGORY_LIST", categoryList)
    }
  },
  mutations: {
    GET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    }
  }
}

