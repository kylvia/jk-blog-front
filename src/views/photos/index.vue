<template>
  <div v-loading="loading">
    <div>
      <div v-for="(items,ind) in list" :key="ind">
        <h2 class="timeTitle">{{items.time}}</h2>
        <div  class="imgBox">
          <div v-for="(item,index) in items.photos" :key="index" class="imgItem" :class="{'curItem': (item.ind === isActiveNum)}">
            <img :src="item.src" @click="showBigImage(item.src, item.ind)">
            <div class="image-preview-action">
              <i @click="rmImage(item._id, item.ind)" class="el-icon-delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogTableVisible"
               center
               @close="handleClose"
               @keyup.left.native="preBtnClick"
               @keyup.right.native ="nextBtnClick"
               custom-class="imgWin">
      <div @click="preBtnClick" class="preBtn controlBtn">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="imgPreview">
        <img :src="curUrl">
      </div>
      <div @click="nextBtnClick" class="nextBtn controlBtn">
        <i class="el-icon-arrow-right"></i>
      </div>
    </el-dialog>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="0"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import BackToTop from '@/components/BackToTop'

export default {
  components: {
    BackToTop
  },
  data() {
    return {
      list: [],
      imgurl: '',
      isActiveId: '',
      curUrl: '', // 当前选中的图片src
      loading: true,
      dialogTableVisible: false,
      isActiveNum: -1, // 当前选中的图片序号
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
    this.fetchData()
    const component = this
    document.onkeydown = function(e) {
      if (!component.dialogTableVisible) {
        return
      }
      if (e.keyCode === 39) {
        component.nextBtnClick()
      } else if (e.keyCode === 37) {
        component.preBtnClick()
      }
    }
  },
  filters: {
    parseTime(filterVal, jsonData) {
      return parseTime(filterVal, jsonData)
    }
  },
  methods: {

    fetchData(limit, page) {
      const that = this
      // 系统数据
      this.request({
        url: '/photos/list',
        method: 'get'
      }).then(function(res) {
        that.loading = false
        const result = res.data
        if (result.code === 100) {
          that.list = result.data
        } else {
          that.$notify({
            title: '失败',
            message: result.msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(err => {
        that.loading = false
        that.$notify({
          title: '异常',
          message: err,
          type: 'error',
          duration: 2000
        })
      })
    },
    showBigImage(url, index) {
      const that = this
      that.isActiveNum = index
      that.dialogTableVisible = true
      that.curUrl = url
    },
    preBtnClick() {
      const that = this
      const curInd = this.isActiveNum
      const listItem = this.list[this.list.length - 1]
      const len = listItem.photos[listItem.photos.length - 1].ind
      if (curInd > 0) {
        that.isActiveNum = curInd - 1
      } else {
        that.isActiveNum = len
      }
      that.list.map((items) => {
        items.photos.map(function(item) {
          item.ind === that.isActiveNum && (that.curUrl = item.src)
        })
      })
    },
    nextBtnClick() {
      const curInd = this.isActiveNum
      const that = this
      const listItem = this.list[this.list.length - 1]
      const len = listItem.photos[listItem.photos.length - 1].ind
      if (curInd >= len) {
        that.isActiveNum = 0
      } else {
        that.isActiveNum = curInd + 1
      }
      that.list.map((items) => {
        items.photos.map(function(item) {
          item.ind === that.isActiveNum && (that.curUrl = item.src)
        })
      })
    },
    handleClose() {
      console.log('handleClose')
      this.isActiveNum = -1
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .imgBox{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  .imgItem{
    position: relative;
    width: 18%;
    min-width: 300px;
    height: 240px;
    line-height: 240px;
    text-align: center;
    overflow: hidden;
    margin: 5px 1%;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    padding: 5px;
  img{
    max-width: 100%;
  }
  .image-preview-action {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    right: -50px;
    top:  -50px;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s;
    cursor: pointer;
    text-align: center;
    line-height: 200px;
  .el-icon-delete {
    font-size: 36px;
    position: absolute;
    top: 54px;
    right: 50px;
  }
  }
  &:hover {
     box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
     background-color: rgba(0,0,0,.5);
  .image-preview-action {
    opacity: 1;
  }
  }
  &.curItem {
     box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
     background-color: rgba(0,0,0,.5);
   }
  }
  }
  .controlBtn{
    position: absolute;
    width: 15px;
    top: 48%;
  i{
    font-size: 64px;
    font-weight: 700;
    cursor: pointer;
  &:hover{
     color: #333333;
   }
  }
  }
  .imgPreview{
    text-align: center;

    background: rgba(0,0,0,05);
  img{
    max-width: 100%;
  }

  }
  .preBtn{
    left: -200px;
  }
  .nextBtn{
    right: -200px;
  }
  .timeTitle{
    padding-left: 20px;
    text-align: left;
    padding-top: 20px;
  }
</style>
