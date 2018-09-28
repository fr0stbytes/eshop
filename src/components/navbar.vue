<template lang="html">
  <div class="pr-3 pl-3 border-bottom">
    <b-navbar variant="white" type="light" toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-link class="navbar-brand" :to="'/'">Online Store</b-link>
      <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto" >
        <b-nav-item variant="link" :to="'/login'">
          Login / Signup
        </b-nav-item>
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <i class="fas fa-user"></i><span class="sr-only">User</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Orders</b-dropdown-item>
          <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="'/cart'">
          <i class="fas fa-shopping-cart"></i>
          <b-badge pill variant="primary" v-if="this.totalCartItems > 0">
            {{totalCartItems}}
          </b-badge>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    totalCartItems: state => state.cart.totalCartItems
  }),
  methods: {
    logout() {
      confirm('Are you sure you want to logout?')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="css">
  .border-bottom {
    border-bottom: 1px solid #dbdbdb;
  }
</style>
