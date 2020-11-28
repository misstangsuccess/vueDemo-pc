<template>
  <p>
    Login
    <el-button type="warning" @click="login">按钮</el-button>
  </p>
</template>

<script>
import { reqLogin } from '@api/user';
export default {
  name: 'Login',
  methods: {
    login() {
      reqLogin('13700000000', '111111')
        .then((res) => {
          console.log(res, 'res');
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    },
  },
};
</script>

<style>
</style>