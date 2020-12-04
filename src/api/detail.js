import request from "@utils/request"
export const reqGetProductDetail = function (id) {
  return request({
    method: "GET",
    url: `/item/${id}`,
  })
}
