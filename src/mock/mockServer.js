/* 相当于服务器,处理请求 */
import Mock from "mockjs"
import banners from "./rbanners.json"
import floors from "./rfloors.json"
/* 一旦支行会拦截get请求,请求地址/mock/banners 
最后参数作为响应结果响应
*/
Mock.mock('/mock/banners', "get", {
  code: 200,
  /* banners数据会生成4条 */
  "data|4": banners,
})
Mock.mock('/mock/floors', "get", {
  code: 200,
  /* floors数据会生成3-5条 */
  "data|3-5": floors,
})
