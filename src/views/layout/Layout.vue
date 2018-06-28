<template>
  <el-container class="jk-container" :class="{hideSidebar:!sidebar.opened}">
    <el-aside class="jk-aside" width="21%">
      <sidebar></sidebar>
    </el-aside>
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <el-main class="jk-main">
      <nav class="topNav">
        <navbar></navbar>
      </nav>
      <app-main  class="jk-main-container"></app-main>
    </el-main>
  </el-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Sidebar, AppMain, Navbar } from './components'
  import Hamburger from '@/components/Hamburger'

  export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain,
      Navbar,
      Hamburger
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      ...mapGetters([
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
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
  .jk-main{

    position: relative;
    height: fit-content;
    background-color: #efefef;
  }
  .topNav{

  }
</style>
