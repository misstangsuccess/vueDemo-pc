import request from "@utils/request"
export const reqLogin = function (phone, password) {
  return request({
    method: "POST",
    url: 'user/passport/login',
    data: {
      phone, password
    }
  })
}
//3个参数情况用对象,1到2个参数用普通
export const reqRegister = function ({ phone, password, code }) {
  return request({
    method: "POST",
    url: 'user/passport/register',
    data: {
      phone, password, code
    }
  })
}
//退出操作
export const reqLogout = function () {
  return request({
    method: "GET",
    url: '/user/passport/logout',
  })
}