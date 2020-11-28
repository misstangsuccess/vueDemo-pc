import request from "@utils/request"
export const reqCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList"
  })

}