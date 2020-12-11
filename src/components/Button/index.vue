<template>
<!--  减少请求数量：登陆按钮、注册按钮、订单按钮使用开关在请求完成之前让其只能点击一次-->
  <button @click="handleClick"><slot/></button>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {
      isClick: false,
    };
  },
  methods: {
    handleClick(event) {
      console.log(222);
      if (this.isClick) return;
      this.isClick = true;
      // this.$emit("click", event);
      this.$listeners.click(event).finally(() => {
        this.isClick = false;
      });
    },
  },
};
</script>

<style>
</style>