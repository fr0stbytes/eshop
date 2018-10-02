<template lang="html">
  <div class=" border-bottom">
    <b-navbar variant="white" type="light" toggleable="md">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-link class="navbar-brand" :to="'/'">Online Store</b-link>
      <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto" >
        <b-nav-item variant="link" :to="'/login'" v-if="!user">
          Login / Signup
        </b-nav-item>
        <b-nav-item-dropdown right v-if="user">
          <template slot="button-content">
            <i class="fas fa-user"></i><span class="sr-only">User</span>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Orders</b-dropdown-item>
          <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right no-caret>
          <template slot="button-content">
            <i class="fas fa-shopping-cart"></i>
            <b-badge pill variant="primary" v-if="this.totalCartItems > 0">
              {{totalCartItems}}
            </b-badge>
          </template>
          <b-dropdown-item v-for="cartItem in cartItems" :key="cartItem.id" class="p-3 border-bottom">
            {{cartItem.quantity}}x <b class="ml-2">{{cartItem.name}}</b>
          </b-dropdown-item>
          <b-dropdown-item class="text-right mt-2">
            <b-button variant="primary" @click="gotoCart()">Go to cart</b-button>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    totalCartItems: state => state.cart.totalCartItems,
    user: state => state.auth.user,
    cartItems: state => state.cart.cartItems
  }),
  methods: {
    logout () {
      confirm('Are you sure you want to logout?')
      this.$store.dispatch('logout')
    },
    gotoCart () {
      this.$router.push('cart')
    }
  }
}
</script>

<style lang="css">
  .border-bottom {
    border-bottom: 1px solid #dbdbdb;
  }
</style>
