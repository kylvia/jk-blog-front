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
        msg: '分类'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
