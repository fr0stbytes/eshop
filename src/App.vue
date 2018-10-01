<template>
  <div id="app">
    <v-app>
      <Navbar />
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/navbar'

export default {
  components: {
    Navbar
  },
  // created () {
  //     const authUser = Object.keys(window.Storage).filter((item) => item.startsWith('firebase:authUser'))
  //     if (authUser) {
  //       console.log(authUser.length)
  //     } else {
  //       console.log('no storage')
  //     }
  // },
  mounted () {
    this.$store.dispatch('getAllProducts')
    this.$store.dispatch('isAuthenticated')
  }
}
</script>

<style lang="scss">
</style>
