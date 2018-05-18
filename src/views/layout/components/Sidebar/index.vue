<template>
  <scroll-bar>
    <div class="backTop"></div>
    <div class="backBottom">
      <div class="avatar"><img :src="'static' + formData.avatar" alt=""></div>
      <div class="blockBox"></div>
      <div class="sysName">{{formData.sysName}}</div>
      <div class="motto">{{formData.motto}}</div>
      <el-menu
        mode="vertical"
        :collapse-transition="false"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        text-color="#666"
        active-text-color="#fc6423"
      >
        <sidebar-item :routes="routers"></sidebar-item>
      </el-menu>
      <div class="btContain">
        <el-button class="toGit" size="medium" round>GitHub</el-button>
        <div class="email">邮箱: {{userInfo.email}}</div>
      </div>
    </div>

  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import routerMap from '@/router'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar, routerMap },
  data() {
    return {
      formData: {
        avatar: '/images/icon1524737568182.png',
        sysName: 'xxx',
        motto: 'xxxxxxxxxx'
      },
      userInfo: {
        email: 'hh.todd@qq.com'
      },
      routers: this.$router.options.routes
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    const that = this
    // 系统数据
    this.request({
      url: '/sysInfoFront/list',
      method: 'get'
    }).then(function(res) {
      const resData = res.data
      if (resData.code === 100) {
        const avatear = resData.data.avater
        resData.data.avatar = avatear
        that.formData = resData.data
      }
    })
    // 个人信息
    this.request({
      url: '/userFront/info',
      method: 'get'
    }).then(function(res) {
      const resData = res.data
      if (resData.code === 100) {
        that.userInfo = resData.data
      }
    })
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .backTop{
    width: 100%;
    height: 20%;
    background-color: #b4b4b4;
  }
  .el-menu{
    border-right: none;
  }
  .backBottom{
    position: relative;
    width: 92%;
    height: 80%;
    margin: 0 auto;
    background-color: #fff;
  }
  .avatar{
    position: absolute;
    left: 140px;
    top:-90px;
    width: 120px;
    height: 120px;
    z-index: 9;
    border-radius: 50%;
    overflow: hidden;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .blockBox{
    width: 100%;
    height: 80px;
  }
  .sysName{
    display: inline-block;
    padding: 5px 30px;
    background-color: #666666;
    color: #ffffff;
    font-size: 28px;
  }
  .motto{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .btContain{
    position: absolute;
    bottom: 10%;
    width: 100%;
    text-align: center;
    .toGit{
      border: 1px solid rgb(252, 100, 35);
      color: rgb(252, 100, 35);
      background-color: transparent;
      margin-bottom: 10px;
      margin-bottom: 10px;
      &:hover{
        background-color: rgb(252, 100, 35);
        color: #fff;
      }
    }
  }
</style>
