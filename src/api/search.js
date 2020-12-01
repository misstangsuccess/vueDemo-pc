import request from "@utils/request"
/* 获取所有商品数据 */
export const reqGetProductList = function (data) {
  return request({
    method: "POST",
    url: '/list',
    data,
  })
}