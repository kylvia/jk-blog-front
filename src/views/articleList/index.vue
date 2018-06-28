<template>
  <div>

    <section class="articleMain" style="min-height: 100%">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </section>
  </div>
</template>


<script>
  export default {
    name: 'ArticleMain'
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .articleMain {
    width: 100%;
    height: 100%;
  }
</style>
