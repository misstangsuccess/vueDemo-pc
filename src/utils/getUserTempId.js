/* 读取userTempId */
import { v4 as uuidv4 } from "uuid"
function getUserTempId () {
  /* 获取用户信息 */
  let userTempId = localStorage.getItem("userTempId")
  //若有用户信息则返回
  if (userTempId) {
    return userTempId;
  }
  //若没有则创建并调用uuidv4
  userTempId = uuidv4()
  //设置用户信息并保存在localStorage中
  localStorage.setItem("userTempId", userTempId)
  return userTempId
  
}
export default getUserTempId