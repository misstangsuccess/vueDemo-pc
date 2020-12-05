import axios from "axios";
import { Message } from "element-ui"
import getUserTempId from "@utils/getUserTempId"
/* 引入进度条 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
/* 
1.userTempId未登录用户的临时Id
通过uuid来生成,
2.每个userTempId有自己的购物车数据,后台会根据userTempId的值来返回购物车数据
如果userTempId刷新,购物车数据就淌有了
所以生成要永久存储起来,未来将来可以反复使用
localStoragec
 */
//调用函数保存在内存中,请求速度较快
const getUserTemp = getUserTempId()
const instance = axios.create({
  baseURL: "/api",
  headers: {},
})
instance.interceptors.request.use(
  (config) => {
    /* 开始进度条 */
    NProgress.start();

    //设置请求头信息
    config.headers.userTempId = getUserTemp
    return config
  }
)
instance.interceptors.response.use(
  (response) => {
    /* 进度条结束 */
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data
    }
    const { message } = response.data
    Message.error(message)
    return Promise.reject(message)

  },
  (error) => {
    /* 进度条结束 */
    NProgress.done();
    const message = error.message || "网络错误"
    Message.error(message)
    return Promise.reject(message)
  }
)
export default instance