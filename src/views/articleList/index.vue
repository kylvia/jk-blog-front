<template>
  <section class="articleMain" style="min-height: 100%">
    <router-view></router-view>
  </section>
</template>


<script>
  export default {
    name: 'ArticleMain'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .articleMain{
    width: 100%;
    height: 100%;
  }
</style>
