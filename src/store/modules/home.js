//home组件的vuex状态
import { reqCategoryList, reqGetBanners, reqGetFloors } from "@api/home"
export default {
  state: {
    categoryList: [],//三级分类数据
    banners: [],//首页轮播图数据
    floors: []//首页楼层数据
  },
  actions: {
    /* 获取三级分类数据 */
    async getCategoryList ({ commit }) {
      //console.log("actinos");
      /* 发送请求 */
      const categoryList = await reqCategoryList();
      /* 触发mutations函数 */
      commit("GET_CATEGORY_LIST", categoryList)
    },
    /* 获取首页轮播图数据 */
    async getBanners ({ commit }) {
      // console.log("mutations");
      /* 发送请求 */
      const banners = await reqGetBanners();
      /* 触发mutations函数 */
      commit("GET_BANNERS", banners)
    },
    /* 获取首页楼层数据 */
    async getFloors ({ commit }) {
      /* 发送请求 */
      const floors = await reqGetFloors();
      /* 触发mutations函数 */
      commit("GET_FLOORS", floors)
    }
  },
  mutations: {
    GET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    },
    GET_BANNERS (state, banners) {
      state.banners = banners
    },
    GET_FLOORS (state, floors) {
      state.floors = floors
    }
  }
}

