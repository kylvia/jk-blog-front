<template>
  <el-menu mode="horizontal"
           :collapse-transition="false"
           :show-timeout="200"
           :default-active="$route.path"
           text-color="#666"
           background-color="#efefef"
           active-text-color="#fc6423">
    <template v-for="item in routers[0].children">
      <el-menu-item :index="item.path">

        <router-link :to="item.path"
                     :key="item.name">
          <div>
            <svg-icon class="listIcon" v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
            <span class="navTxt" v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </div>

        </router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import LangSelect from '@/components/LangSelect'
  import ThemePicker from '@/components/ThemePicker'

  export default {
    data() {
      return {
        routers: this.$router.options.routes,
        isNest: {
          type: Boolean,
          default: false
        }
      }
    },
    components: {
      Breadcrumb,
      Hamburger,
      ErrorLog,
      Screenfull,
      LangSelect,
      ThemePicker
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar',
        'sidebar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
