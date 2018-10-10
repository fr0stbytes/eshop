<template>
  <div class="home">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '../components/navbar'
export default {
  name: 'home',
  components: {
    Navbar
  }
}
</script>
