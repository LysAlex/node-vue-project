<template>
  <div class="container">
    <div class="row">
      <div class="col-10 col-lg-6 m-auto">
        <h1>Welcome {{ user }} !</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
}
</script>

<style lang="scss">
</style>