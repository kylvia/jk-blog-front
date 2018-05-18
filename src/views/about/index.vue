<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
  export default {
    name: 'about',
    data() {
      console.log('about')
      return {
        msg: '你好'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
