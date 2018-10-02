<template>
  <div id="app">
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
  mounted () {
    this.$store.dispatch('getAllProducts')
    this.$store.dispatch('isAuthenticated')
    this.$store.dispatch('getShippings')
  }
}
</script>

<style lang="css">
  .btn {
    border-radius: 0 !important;
  }
  body {
    background-color: #eeeeee;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>
