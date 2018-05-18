<template>
  <div class="listMain">
    <div v-for="item in lists" :key="item.id">
      <el-row>
        <el-col :span="24">
          <div class="grid-title">
            <h2>{{item.title}}</h2>
            <div class="rows">
              <svg-icon class="listIcon" iconClass="rili"></svg-icon>{{item.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}&nbsp;<span class="split">|</span>
              <svg-icon class="listIcon" iconClass="fenlei"></svg-icon>{{item.classesLabel}}&nbsp;<span class="split">|</span>
              <svg-icon class="listIcon" iconClass="ydl"></svg-icon>{{item.pageviews}}&nbsp;
            </div>
            <div>{{item.content_short}}</div>
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
        classesLabel: 11111,
        title: 11111,
        content_short: 11111,
        pageviews: 11111
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
  }
  .listIcon {
    font-size: 18px;
    margin-right: 5px;
    vertical-align: bottom;
  }
  .rows{
    color: #999;
  }
  .split{
    color: #999;
    padding: 0 7px;
  }
</style>
