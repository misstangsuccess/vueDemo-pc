// 使用 Mock
var Mock = require('mockjs');
Mock.Random.title()
Mock.Random.color();
Mock.Random.cname();
Mock.Random.image()
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  // 'list|1-5': [{
  //   // 属性 id 是一个自增数，起始值为 1，每次增 1
  //   'id|+1': 1
  // }]
  /* 随机中文字 */
  title: "@ctitle(1,6)",
  /* 随机英文字体,长度为1-4 */
  "subTitle|3-5": ["@ctitle(1,4)"],
  "carouceList|4": [
   "@image('200x100', '@color', '#FFF', 'png', '@cname')"
 ]
})
// 输出结果
/* console.log(JSON.stringify(data, null, 4)) */
console.log(data);