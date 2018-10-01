<template lang="html">
  <div class="">
    <v-toolbar dark color="grey darken-4">
      <router-link to="/">
          <v-toolbar-title class="white--text ml-3">
          Online Shop
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <router-link :to="'/login'">
        <v-btn flat v-if="!user">Login / Signup</v-btn>
      </router-link>
      <div v-if="user" class="mr-2">
        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon>person</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="toProfile()">
              <v-list-tile-title>
                My profile
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="toOrders()">
              <v-list-tile-title>
                My Orders
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout()">
              <v-list-tile-title >
                Logout
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>

      <v-btn icon class="mr-5" to="/cart">
        <v-badge color="blue">
        <span slot="badge" v-if="this.totalCartItems > 0">{{totalCartItems}}</span>
        <v-icon>shopping_cart</v-icon>
      </v-badge>
      </v-btn>

    </v-toolbar>
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
    toProfile () {
      this.$router.push('/')
    },
    toOrders () {
      this.$router.push('/')
    },
    logout () {
      if (confirm('Are you sure you want to logout?')) this.$store.dispatch('logout') ; return false
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
