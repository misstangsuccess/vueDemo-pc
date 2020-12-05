import request from "@utils/request"
export const reqGetShopCart = function () {
  return request({
    method: "GET",
    url: "/cart/cartList",
  })
}
export const reqGetUpdateCart = function (skuId, skuNum) {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  })
}
export const reqGetCheckCart = function (skuID, isChecked) {
  return request({
    method: "GET",
    url: `/cart/checkCart/${skuID}/${isChecked}`,
  })
}
export const reqGetDeleteCart = function (skuId) {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  })
}