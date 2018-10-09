<template lang="html">
  <div class="border-bottom main-navbar">
    <div class="nav-container">
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
          <b-nav-item-dropdown right no-caret >
            <template slot="button-content">
              <i class="fas fa-shopping-cart"></i>
              <b-badge pill variant="primary" v-if="this.totalCartItems > 0">
                {{totalCartItems}}
              </b-badge>
            </template>
            <b-card
                  header-tag="header"
                  footer-tag="footer"
                  class="minicart-container">
              <div slot="header" class="mb-0">
                <b>My Cart, </b>
                <span class="ml-2 mr-1">{{totalCartItems}}</span>
                <span v-if="cartItems === 1">ITEM</span>
                <span v-else>ITEMS</span>
              </div>
              <div slot="footer" class="text-center mt-2">
                <b-button variant="outline-primary" @click="gotoCart()" class="mr-2">VIEW CART</b-button>
                <b-button variant="primary" @click="goToCheckout()">CHECKOUT</b-button>
                <div class="is-small text-center mt-3">
                  <em>You are <b>{{50 - finalPrice | currency}}</b> away from qualifying for FREE shipping!</em>
                </div>
              </div>
              <div class="card-text">
                <div class="pb-3">
                  <div v-for="cartItem in cartItems" :key="cartItem.id" class="p-2 border-bottom">

                    <b-row>
                      <b-col xs="10">
                        <b>{{cartItem.name}}</b>
                      </b-col>
                      <b-col xs="2" class="text-right">
                        <span class="price-no-discount" v-if="cartItem.original_price">&euro; {{cartItem.original_price}}  </span>
                        <span>&euro; {{cartItem.price}}</span>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col xs="4">
                        Qty: {{cartItem.quantity}}
                      </b-col>
                      <b-col xs="8" class="text-right">
                        <b-button size="sm" variant="link"
                          @click="removeFromCart(cartItem.id, cartItem.total, cartItem.quantity, cartItem.price)">
                          <i class="fas fa-trash-alt pt-3 trash-icon"></i>
                        </b-button>
                      </b-col>
                    </b-row>

                  </div>
                </div>
                <div class=" text-right">
                  <span class="total-label is-small">SUBTOTAL :</span><span class="subtotal-price">{{cartTotalPrice | currency}}</span>
                </div>
              </div>

            </b-card>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      </b-navbar>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      totalCartItems: state => state.cart.totalCartItems,
      user: state => state.auth.user,
      cartItems: state => state.cart.cartItems,
      cartTotalPrice: state => state.cart.cartTotalPrice
    }),
    ...mapGetters({
      finalPrice: 'finalPrice',
      discountSum: 'discountSum'
    })
  },
  methods: {
    logout () {
      const d = confirm('Are you sure you want to logout?')
      if (d === true) {
        this.$store.dispatch('logout')
      } else {
        return false
      }
    },
    gotoCart () {
      this.$router.push('cart')
    },
    goToCheckout () {
      this.$router.push('/checkout')
    },
    removeFromCart (id, total, quantity, price) {
      const product = {
        id: id,
        total: total,
        quantity: quantity,
        price: price
      }
      this.$store.dispatch('removeFromCart', product)
    }
  }
}
</script>

<style lang="css">
  .dropdown-menu {
    padding: 0 !important;
    margin-top: .5em !important;
  }
  .main-navbar {
    width: 100%;
    background-color: #fff;
  }
  .nav-container {
    max-width: 1366px;
    margin: 0 auto;
  }
  .minicart-container {
    width: 325px;
  }
</style>
