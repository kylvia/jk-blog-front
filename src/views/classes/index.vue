<template>
    <div class="classesPage" v-loading="loading">
        <div class="classesBox">
          <ul v-for="item in classesList" :key="item.id">
            <li><a :class="{curOn : item.id === curId}" @click="searchList(item.id)">{{item.name}}<span class="lenNum"> ({{item.len}})</span></a></li>
          </ul>
        </div>
      <div class="listMain">
        <div v-for="item in lists" :key="item.id" class="articleContent">
          <el-row>
            <el-col :span="24">
              <div class="grid-title">
                <router-link :to="{ path:'/index/detail/'+item.id}"><i class="el-icon-arrow-right"></i>&nbsp;<span class="articleTit">{{item.display_time | parseTime('{y}-{m}-{d}')}}&nbsp;&nbsp;{{item.title}}</span> </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="noData" v-if="!lists.length">暂无数据......</div>
        <div class="navblock">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        <el-tooltip placement="top" content="返回顶部">
          <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="0"></back-to-top>
        </el-tooltip>
      </div>
    </div>
</template>

<script>
import { parseTime } from '@/utils'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'about',
  components: { BackToTop },
  data() {
    return {
      total: 0,
      loading: true,
      curId: '',
      classesList: [],
      lists: [{
        id: 1,
        display_time: new Date(1526262855 * 1000),
        classesLabel: '前端',
        image_uri: '',
        articleType: 0,
        title: '做了一个网页版的串口调试助手',
        content_short: '最近这两天在研究如何实现web页面和串口间通信，在网上也查了各种资料，electron、nw或者chrome serial，发现对于我来说都太难实现了，一来可用的资料太少，二来安装东西老是出问题，算了还是放弃吧，自己用常用且最熟悉的方式来实现吧，作为一名前端码农，选用的肯定是node作为服务器了，然后网页请求方式用ajax或websocket都可以，实现方式下文都有。',
        pageviews: 23
      }],
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  filters: {
    parseTime(filterVal, jsonData) {
      return parseTime(filterVal, jsonData)
    }
  },
  methods: {
    // 获取分类
    getClasses() {
      const that = this
      that.loading = true
      // 系统数据
      this.request({
        url: '/messageFront/classes',
        method: 'get'
      }).then(function(res) {
        const resData = res.data
        if (resData.code === 100) {
          that.classesList = resData.data
        }
        that.loading = false
      })
    },
    searchList(classes) {
      const that = this
      let params = {}
      that.curId = classes
      if (classes) {
        params = { limit: 20, classes: classes }
      } else {
        params = { limit: 20 }
      }
      that.loading = true
      this.request({
        url: '/articleFront/list',
        method: 'get',
        params: params
      }).then(function(res) {
        that.loading = false
        const resData = res.data
        if (resData.code === 100) {
          that.lists = resData.data.items
          that.total = resData.data.total
        }
      })
    },
    // 改变页码
    handleCurrentChange(val) {
      this.getList(10, val)
    }
  },
  created() {
    this.getClasses()
    this.searchList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .classesPage{
    min-height: 100%;
  }
  .classesBox {
    text-align: left;
    padding: 20px 0;
    ul{
      display: flex;
      flex-direction: column;
      li{
        margin-left: 50px;
        align-items: center;
        line-height: 2.5em;
        text-decoration: underline;
        a{
          &:hover{
            color: #86ca5e;

          }
        }
      }

    }
  }
  .lenNum{
    color: #999;
  }
  .listMain{
    text-align: left;
    color: #666;
    border-top:1px solid #dcdcdc;
  }
  .articleContent{
    padding: 10px 20px;
    border-bottom: 1px dashed #efefef;

    &:first-child{
      margin-top: 0;
    }
    &:last-child{
      border-bottom: none;
    }
  }
  .listIcon {
    font-size: 18px;
    margin-right: 5px;
    vertical-align: bottom;
  }
  .articleTit{
    color: #666;
    position: relative;
    line-height: 30px;
    display: inline-block;
    color: #333;
    .titIcon{
      position: absolute;
      left: -20px;
      width: 5px;
      height: 110%;
      background-color: #666;
    }
    .article-type{
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #f4ced0;
      color: #fc6423;
      border-radius: 50%;
      text-align: center;
      font-size: 12px;
      vertical-align: middle;
      margin-right: 7px;
      margin-top: -2px;
      &.type1{
        color: #86ca5e;
        border: 1px solid #e7f4df;
      }
    }
    &:hover{
      color: #fc6423;
      cursor: pointer;
    }
  }
  .rows{
    color: #6b6b6b;
    margin: 10px 0;
    font-size: 14px;
  }
  .contentShort{
    margin-top: 20px;
    line-height: 1.8em;
    color: #999999;
    font-size: 15px;
  }
  .imgContent{
    width: 150px;
    height: 100px;
    float: left;
    margin-right: 10px;

    img{
      width: 100%;
    }
  }
  .split{
    color: #999;
    padding: 0 7px;
  }
  .curOn{
    color: #86ca5e;
    font-weight: 700;

    .lenNum{
      color: #86ca5e;
    }
  }
  .el-icon-arrow-right{
    color: #dcdcdc;
  }
  .navblock{
    padding-top: 30px;
    padding-bottom: 20px;
    text-align: center;
  }
  .noData{
    text-align: center;
    padding: 15px;
  }
</style>
