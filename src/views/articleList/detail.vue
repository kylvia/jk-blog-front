<template>
    <section class="detailMain">
      <div class="grid-title">
        <i class="el-icon-back backBtn" @click="$router.back(-1)"></i>
        <h3 class="articleTit"><div class="article-type" :class="'type'+details.articleType">{{details.articleType | typeFilter}}</div>{{details.title}}</h3>
        <div class="rows">
          <svg-icon class="listIcon" iconClass="rili"></svg-icon>{{details.display_time | parseTime('{y}-{m}-{d} {h}:{i}')}}&nbsp;<span class="split">|</span>
          <svg-icon class="listIcon" iconClass="fenlei"></svg-icon>{{details.classesLabel}}&nbsp;<span class="split">|</span>
          <svg-icon class="listIcon" iconClass="ydl"></svg-icon>{{details.pageviews}}&nbsp;
        </div>
        <div class="splitLine"></div>
        <div class="contentTxt">
          <div v-html='details.content'></div>
        </div>
      </div>
      <div class="messageContent">
        <div class="message">
          <p class="messageTit">留言板：</p>
          <v-input v-model="username"></v-input>
          <v-textarea v-model="message" ref="message"></v-textarea>
          <div class="btn-con">
            <input type="button" @click="handleSend" class="btn" value="发布">
          </div>
        </div>
        <v-list :list="details.list" @reply="handleReply"></v-list>
      </div>
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="0"></back-to-top>
      </el-tooltip>
    </section>
</template>

<script>
import { parseTime } from '@/utils'
import BackToTop from '@/components/BackToTop'
import vInput from '@/components/MessageBoard/vInput'
import vList from '@/components/MessageBoard/vList'
import vTextarea from '@/components/MessageBoard/vTextarea'
export default {
  name: 'detail',
  components: {
    BackToTop,
    vInput,
    vTextarea,
    vList
  },
  data() {
    return {
      username: '',
      message: '',
      details: {
        id: 1,
        display_time: new Date(1526262855 * 1000),
        classesLabel: '前端',
        articleType: 0,
        title: '做了一个网页版的串口调试助手',
        content: '最近这两天在研究如何实现web页面和串口间通信，在网上也查了各种资料，electron、nw或者chrome serial，发现对于我来说都太难实现了，一来可用的资料太少，二来安装东西老是出问题，算了还是放弃吧，自己用常用且最熟悉的方式来实现吧，作为一名前端码农，选用的肯定是node作为服务器了，然后网页请求方式用ajax或websocket都可以，实现方式下文都有。',
        pageviews: 23,
        list: []
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
  },
  methods: {
    getMsg() {
      const that = this
      // 详情数据
      that.request({
        url: '/messageFront/list',
        method: 'get',
        params: { id: that.details.msgid }
      }).then(function(res) {
        const resData = res.data
        if (resData.code === 100) {
          that.details.list = resData.data
        } else {
          that.$notify({
            title: '提示',
            message: '未知错误，请稍后再试',
            type: 'error',
            duration: 2000
          })
          return
        }
      })
    },
    handleSend: function() {
      const that = this
      if (that.username === '') {
        that.$notify({
          title: '提示',
          message: '请输入昵称',
          type: 'error',
          duration: 2000
        })
        return
      }
      if (that.message === '') {
        that.$notify({
          title: '提示',
          message: '请输入留言内容',
          type: 'error',
          duration: 2000
        })
        return
      }
      // 详情数据
      that.request({
        url: '/messageFront/update',
        method: 'post',
        data: {
          id: that.details.id,
          username: that.username,
          message: that.message
        }
      }).then(function(res) {
        const resData = res.data
        if (resData.code === 100) {
          // 数组list存储了所有的留言内容，通过函数给list添加一项留言数据，添加成功后把文本框置空
          that.getMsg()
          that.message = ''
        } else {
          that.$alert(res.message, '提示')
          return
        }
      })
    },
    handleReply: function(index) {
      var name = this.details.list[index].username
      this.message = '回复@' + name + ':'
      this.$refs.message.focus()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .detailMain{
    position: relative;
    text-align: left;
    color: #666;
    padding: 20px 50px;
  }
  .backBtn{
    position: absolute;
    right: 40px;
    font-size: 22px;
    cursor: pointer;
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
  .messageContent{
    margin-top: 50px;
  }
  .message {
    display: flex;
    flex-direction: column;
  }
  .message div{
    margin-bottom: 12px;
    flex-direction: row;
  }
  .message input:focus,
  .message textarea:focus{
    border: 1px solid #3399ff;
    border-radius: 5px;
  }
  .message .btn-con{
    /*text-align: center;*/
    display: inline-block;
    padding-left: 200px;
  }
  .message .btn{
    padding: 6px 15px;
    border: 1px solid #39f;
    border-radius: 4px;
    color: #fff;
    background-color: #39f;
    cursor: pointer;
    outline: none;
  }
  .messageTit{
    margin-top: 25px;
    margin-bottom: 22px;
    padding-left: 10px;
    font-size: 16px;
    border-bottom: 2px solid #dcdcdc;
    padding: 10px;
  }
</style>
