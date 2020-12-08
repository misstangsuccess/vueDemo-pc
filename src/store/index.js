import Vue from "vue";
import Vuex from "vuex";
/* 引入模块的组件数据 */
import modules from "./modules"
Vue.use(Vuex);
const state = {
  count: 0
}
const getters = {}
const actions = {}
const mutations = {}
export default new Vuex.Store({
  state,//总数据
  getters,//总数据
  actions,//总数据
  mutations,//总数据
  modules//其他模块数据
})
