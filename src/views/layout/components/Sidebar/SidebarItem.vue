<template>
  <div class="menu-wrapper">

    <template v-for="item in routes[0].children" >

      <router-link :to="item.path"
                            :key="item.name">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon class="listIcon" v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span class="navTxt" v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>

    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      msg: 'SidebarItem'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .menu-wrapper{
    color: #666;
  }
  .listIcon {
    font-size: 18px;
    margin-right: 5px;
  }
  .navTxt{
    font-size: 16px;
  }
  .menu-wrapper{
    width: 100%;
  }

  .el-menu-item:focus, .el-menu-item:hover{
    background-color: transparent;
  }
</style>

