import { reqRegister, reqLogin } from "@api/user"
export default {
  state: {
    //从localStorage读取name和token作为用户登录的标识
    name: localStorage.getItem("name") || "",
    token: localStorage.getItem("token") || ""
  },
  getters: {},
  actions: {
    async register ({ commit }, { phone, password, code }) {
      console.log(commit);
      await reqRegister({ phone, password, code })
    },
    async login ({ commit }, { phone, password }) {
     // console.log(phone, password)
      const user = await reqLogin(phone, password)
     // console.log(user)
      commit("REQ_LOGIN", user)
    }
  },
  mutations: {
    REQ_LOGIN (state, user) {
      state.name = user.name;
      state.token = user.token
    }
  }
}