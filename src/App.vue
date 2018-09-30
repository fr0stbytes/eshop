<template>
  <div id="app">
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <Navbar />
    <router-view/>
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
  .btn {
    border-radius: 0 !important;
  }
</style>
