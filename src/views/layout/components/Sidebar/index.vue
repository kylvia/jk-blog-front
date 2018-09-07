<template>
  <scroll-bar>
    <div class="backTop">
    </div>
    <div class="backBottom">
      <!--<div class="avatar"><img :src="'static' + formData.avatar" alt=""></div>-->
      <div class="avatar"><div class="avatarImg"><img :src="formData.avatar" alt=""></div></div>
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
        <a target="_blank" href="https://github.com/kylvia" ><el-button class="toGit" size="medium" round>GitHub</el-button></a>
        <div class="email">EMAIL: {{userInfo.email}}</div>
        <div class="Copyright">Copyright 2018 版权所有
          <br>
          <a href="http://www.miitbeian.gov.cn">蜀ICP备18024236号</a></div>
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
      'sidebar',
      'info'
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
        that.$store.dispatch('setInfo', resData.data)
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

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
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
    left: calc(50% - 60px);
    top:-100px;
    width: 140px;
    height: 140px;
    padding:5px;
    z-index: 9;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
    .avatarImg{
      border-radius: 50%;
      width: 130px;
      height: 130px;
      overflow: hidden;
    }
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
    background-color: #4d4d4d;
    color: #ffffff;
    font-weight: 700;
    font-size: 36px;
  }
  .motto{
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 14px;
    color: #999;
  }
  .btContain{
    /*position: absolute;*/
    /*bottom: 10%;*/
    width: 100%;
    text-align: center;
    margin-top: 100px;
    .toGit{
      border: 1px solid rgb(252, 100, 35);
      color: rgb(252, 100, 35);
      background-color: transparent;
      margin-bottom: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      &:hover{
        background-color: rgb(252, 100, 35);
        color: #fff;
      }
    }
  }
  .email{
    color: #333333;
    font-size: 14px;
  }
  .Copyright{
    color: #b2b2b2;
    font-size: 14px;
    margin-top: 40px;
  }
</style>
