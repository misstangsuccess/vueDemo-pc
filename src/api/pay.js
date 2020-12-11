import request from "@utils/request";
//获取订单信息
export const reqGetTrade = () => {
  return request({
    method: "GET",
    url: "/order/auth/trade"
  })
}
//获取订单列表数据
export const reqGetOrderList = (page, limit) => {
  console.log(page,limit);
  return request({
    method: "GET",
    url: `order/auth/${page}/${limit}`
  })
}
//提交订单信息
export const reqsubmitOrder = ({
  tradeNo,
  consignee,
  consigneeTel,
  deliveryAddress,
  paymentWay,
  orderComment,
  orderDetailList,
}) => {
  return request({
    method: "POST",
    url: "/order/auth/submitOrder",
    params: {//query参数
      tradeNo,//会拼接中路径中,实际的参数和定义的参数有点出入
    },
    data: {//body参数
      consignee,
      consigneeTel,
      deliveryAddress,
      paymentWay,
      orderComment,
      orderDetailList,
    }
  })
}
//支付订单信息
export const reqGetQRCode = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/createNative/${orderId}`
  })
}
//获取支付状态
export const reqGetPayStatus = (orderId) => {
  return request({
    method: "GET",
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}