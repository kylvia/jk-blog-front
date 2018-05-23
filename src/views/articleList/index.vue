<template>
  <div class="listMain">
    <div v-for="item in lists" :key="item.id">
      <el-row>
        <el-col :span="24">
          <div class="grid-title">
            <h2 class="articleTit"><div class="titIcon"></div>{{item.title}}</h2>
            <div class="rows">
              <svg-icon class="listIcon" iconClass="rili"></svg-icon>{{item.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}&nbsp;<span class="split">|</span>
              <svg-icon class="listIcon" iconClass="fenlei"></svg-icon>{{item.classesLabel}}&nbsp;<span class="split">|</span>
              <svg-icon class="listIcon" iconClass="ydl"></svg-icon>{{item.pageviews}}&nbsp;
            </div>
            <div class="contentShort"><div class="imgContent"><img src="/static/images/13.jpg" alt=""></div>{{item.content_short}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'articleList',
  data() {
    return {
      lists: [{
        id: 11111,
        timestamp: new Date(1526262855 * 1000),
        classesLabel: '前端',
        title: '做了一个网页版的串口调试助手',
        content_short: '最近这两天在研究如何实现web页面和串口间通信，在网上也查了各种资料，electron、nw或者chrome serial，发现对于我来说都太难实现了，一来可用的资料太少，二来安装东西老是出问题，算了还是放弃吧，自己用常用且最熟悉的方式来实现吧，作为一名前端码农，选用的肯定是node作为服务器了，然后网页请求方式用ajax或websocket都可以，实现方式下文都有。',
        pageviews: 23
      }]
    }
  },
  filters: {
    parseTime(filterVal, jsonData) {
      return parseTime(filterVal, jsonData)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .listMain{
    text-align: left;
    padding: 20px;
    color: #666;
  }
  .listIcon {
    font-size: 18px;
    margin-right: 5px;
    vertical-align: bottom;
  }
  .articleTit{
    color: #333;
    position: relative;
    .titIcon{
      position: absolute;
      left: -20px;
      width: 5px;
      height: 110%;
      background-color: #666;
    }
  }
  .rows{
    color: #999;
    margin: 10px 0;
  }
  .contentShort{
    margin-top: 20px;
    line-height: 1.5em;
  }
  .imgContent{
    width: 300px;
    height: 200px;
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
</style>
