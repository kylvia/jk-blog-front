<template>
  <div>
    {{info.aboutMe}}
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

<style scoped>
</style>
