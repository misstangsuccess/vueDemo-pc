import axios from "axios";
import { Message } from "element-ui"
/* 引入进度条 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  baseURL: "/api",
  headers: {},
})
instance.interceptors.request.use(
  (config) => {
    /* 开始进度条 */
    NProgress.start();
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