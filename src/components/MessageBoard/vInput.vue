<template>
  <div class="input-con">
    <span>昵称:</span>
    <input type="text" :value="value" @input="updateVal">
  </div>
</template>

<script>
export default {
  name: 'vInput',
  // 接收父组件传过来的value
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    // 监听input输入事件
    updateVal: function(e) {
      // 触发父组件的自定义事件
      // target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
      // 将input的value值传给父组件
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.input-con{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
span{
  width: 100px;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  line-height: 32px;
  margin-right: 8px;
}
input{
  border: 1px solid #e6e6ee;
  padding: 4px 5px;
  line-height: 32px;
  height: 32px;
  border-radius: 5px;
  width: 300px;
}
</style>
