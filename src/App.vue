<template>
  <div>
    <Header />
    <Footer />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>