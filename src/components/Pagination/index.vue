<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage <= 1"
      @click="setCountPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <button :class="{ active: myCurrentPage === 1 }" @click="setCountPage(1)">
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <button
      v-for="item in mapCount"
      :key="item"
      @click="setCountPage(startEnd.start + item - 1)"
      :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
    >
      {{ startEnd.start + item - 1 }}
    </button>

    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button
      v-show="totalPages > 1"
      :class="{ active: myCurrentPage === totalPages }"
      @click="setCountPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="myCurrentPage >= totalPages"
      @click="setCountPage(myCurrentPage + 1)"
    >
      下一页
    </button>
    <button>总页数:{{ total }}</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    /* 当前页码 */
    currentPage: {
      type: Number,
      default: 1,
    },
    /* 显示按钮的数量 */
    pagerCount: {
      type: Number,
      /* validator校验 */
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
    /* 每页条数  */
    pageSize: {
      type: Number,
      default: 5,
    },
    /* 总条数 */
    total: {
      type: Number,
      /*  required: true, */
      default: 10,
    },
  },
  data() {
    return {
      /* 为了修改当前页码数据,因为props数据是只读*/
      myCurrentPage: this.currentPage,
    };
  },
  watch: {
    /* 每次页码发生变化加载新数据 */
    myCurrentPage(currentPage) {
      // this.$listeners['current-change'](currentPage);
      this.$emit('current-change', currentPage);
    },
    /* 当外面页面发生变化,里面页面也要发生变化 */
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
  computed: {
    /* 总页数 */
    totalPages() {
      /* 总条数除以每页条数,Math.ceil向上取整,Math.floor向下取整 */
      return Math.ceil(this.total / this.pageSize);
    },
    /* 中间页码按钮的起始和结束页码数量 */
    startEnd() {
      /* 获取所有需要计算的参数 */
      const { myCurrentPage, totalPages, pagerCount } = this;
      /* 中间总计的按钮数量(不包含开始和结尾按钮) */
      const count = pagerCount - 2;
      const halfCount = Math.floor(count / 2);
      let start, end;
      // 1 [2] 3 4 5 6 ...10
      // 1...3 4 [5] 6 7...10
      // 1 ... 5 6 7 8 [9] 10
      // 1 [2] 3
      // [1] --> 如果start大于总页数，不显示
      if (myCurrentPage >= totalPages - halfCount) {
        // 1 ... 5 6 7 8 [9] 10
        start = totalPages - count;
      } else {
        //正常情况
        start = myCurrentPage - halfCount;
      }
      if (start <= 1) {
        // 1 [2] 3 4 5 6 ...10
        start = 2;
      }
      //正常情况
      end = start + count - 1;
      if (end >= totalPages) {
        end = totalPages - 1;
      }
      //返回计算结果
      return {
        start,
        end,
      };
    },
    /* 遍历按键显示数量 */
    mapCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    },
  },
  methods: {
    setCountPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
  button.active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
