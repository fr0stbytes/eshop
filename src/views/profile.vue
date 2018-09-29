<template>
  <div class="mt-5">
    {{user.email}}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>

<style lang="css">
</style>
