<template>
  <section class="app-main" style="min-height: 100%">
    <!--jhuihuih-->
    <transition name="fade" mode="out-in">
      <!--<keep-alive :include="cachedViews">-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </section>
</template>

<script>
  export default {
    name: 'AppMain'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-main{
    position: relative;
    background-color: #ffffff;
  }
</style>
