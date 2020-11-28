import request from "@utils/request"
export const reqLogin = function (phone, password) {
  return request({
    method: "Post",
    url: '/user/passport/login',
    data: {
      phone, password
    }
  })
}
