import request from "@utils/request"
import mockRequest from "@utils/mockRequest";
/* 获取三级分类数据 */
export const reqCategoryList = () => {
  return request({
    method: "GET",
    url: "/product/getBaseCategoryList"
  })
}
/* 获取首页轮播图数据 */
export const reqGetBanners = () => {
  return mockRequest({
    method: "GET",
    url: "/banners"
  })
}
/* 获取首页楼层数据 */
export const reqGetFloors = () => {
  return mockRequest({
    method: "GET",
    url: "/floors"
  })
}