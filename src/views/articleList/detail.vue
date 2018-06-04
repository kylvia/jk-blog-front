<template>
    <section class="detailMain">
      <div class="grid-title">
        <h3 class="articleTit"><div class="article-type" :class="'type'+details.articleType">{{details.articleType | typeFilter}}</div>{{details.title}}</h3>
        <div class="rows">
          <svg-icon class="listIcon" iconClass="rili"></svg-icon>{{details.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}&nbsp;<span class="split">|</span>
          <svg-icon class="listIcon" iconClass="fenlei"></svg-icon>{{details.classesLabel}}&nbsp;<span class="split">|</span>
          <svg-icon class="listIcon" iconClass="ydl"></svg-icon>{{details.pageviews}}&nbsp;
        </div>
        <div class="splitLine"></div>
        <div class="contentTxt">
          <div v-html='details.content'></div>
        </div>
      </div>
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="0"></back-to-top>
      </el-tooltip>
    </section>
</template>

<script>
import { parseTime } from '@/utils'
import BackToTop from '@/components/BackToTop'
export default {
  name: 'detail',
  components: { BackToTop },
  data() {
    return {
      details: {
        id: 1,
        timestamp: new Date(1526262855 * 1000),
        classesLabel: '前端',
        articleType: 0,
        title: '做了一个网页版的串口调试助手',
        content: '最近这两天在研究如何实现web页面和串口间通信，在网上也查了各种资料，electron、nw或者chrome serial，发现对于我来说都太难实现了，一来可用的资料太少，二来安装东西老是出问题，算了还是放弃吧，自己用常用且最熟悉的方式来实现吧，作为一名前端码农，选用的肯定是node作为服务器了，然后网页请求方式用ajax或websocket都可以，实现方式下文都有。',
        pageviews: 23
      },

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
  created() {
    const that = this
    // 详情数据
    this.request({
      url: '/article/detail',
      method: 'get',
      params: { id: this.$route.params.id }
    }).then(function(res) {
      const resData = res.data
      if (resData.code === 100) {
        that.details = resData.data
      }
    })
  },
  filters: {
    parseTime(filterVal, jsonData) {
      return parseTime(filterVal, jsonData)
    },
    typeFilter(filterVal) {
      if (!filterVal) {
        return '原'
      } else {
        return '转'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .detailMain{

    text-align: left;
    color: #666;
    padding: 20px 50px;
  }
  .listIcon {
    font-size: 18px;
    margin-right: 5px;
    vertical-align: bottom;
  }
  .articleTit{
    color: #666;
    position: relative;
    font-weight: 600;
    line-height: 30px;
    display: inline-block;
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
  .splitLine{
    border-bottom: 1px dashed #e3e3e3;
  }
  .contentTxt{
    margin-top: 30px;
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
  .navblock{
    padding-top: 30px;
    background: #efefef;
    text-align: center;
  }
</style>
