<template lang="html">
  <b-navbar variant="dark" type="dark">
    <b-link class="navbar-brand" :to="'/'">Online Store</b-link>
    <b-navbar-nav class="ml-auto">
      <b-link class="navbar-brand" :to="'/cart'">
        <i class="fas fa-shopping-cart"></i>
        <b-badge pill variant="primary" v-if="this.totalCartItems > 0">
          {{totalCartItems}}
        </b-badge>
      </b-link>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    totalCartItems: state => state.cart.totalCartItems
  }),
  methods: {
  }
}
</script>

<style lang="css">
</style>
