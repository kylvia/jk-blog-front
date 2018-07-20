<template>
  <div class="aboutPage">
    <!--<div class="aboutPage">-->
      {{info.aboutMe}}
    <!--</div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'info'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .aboutPage{
    background: url(/static/images/back.jpg);
    background-size: 100%;
    background-position-y: 30%;
    width: 100%;
    height: 100%;
    min-height: 600px;
    padding: 10% 20%;
    line-height: 1.8em;
  }
</style>
