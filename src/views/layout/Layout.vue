<template>
  <el-container class="jk-container">
    <el-aside class="jk-aside" width="20.8333%">
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <app-main></app-main>
    </el-main>
  </el-container>
</template>

<script>
  import { Sidebar, AppMain } from './components'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .jk-container {
    @include clearfix;
    position: relative;
    height: 100%;
  }
</style>
