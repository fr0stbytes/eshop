<template>
  <div class="container checkout-container pt-5">
    <b-row class="text-center m-2">
      <b-col>
        <h2>CHECKOUT</h2>
        <b-alert class="mt-4" show v-if="finalPrice < 50">
          <em>You are <b>{{50 - finalPrice | currency}}</b> away from qualifying for FREE shipping!</em>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="8" class="">
        <Login v-if="!user"/>
        <Promo v-if="user" />
        <Address v-if="user"/>
        <Shipping v-if="user"/>
        <Payment v-if="user"/>
      </b-col>
      <b-col md="4" class="checkout-summary">
        <div class="m-3 p-3 white-bg border">
          <b-row class="m-2 pb-3 border-bottom">
            <b-col xs="10">
              <h5> {{cartItems}}
                <span v-if="cartItems === 1">ITEM</span>
                <span v-else>ITEMS</span>
              </h5>
            </b-col>
            <b-col class="text-right is-small pt-1">
              <router-link :to="'/cart'">Change</router-link>
            </b-col>
          </b-row>
          <b-col class="text-right">
            <div class="mt-3">
              <span class="total-label is-small">SUBTOTAL :</span><span class="subtotal-price">{{cartTotalPrice | currency}}</span>
            </div>
            <div class="mt-3" v-if="discountSum !== 0 && discountSum !== undefined">
              <span class="total-label is-small">{{discount}}% DISCOUNT :</span><span class="subtotal-price">{{discountSum | currency}}</span>
            </div>
            <div class="mt-3">
              <div class="">
                <span class="total-label is-small">DELIVERY :</span><span class="subtotal-price">&euro;{{shipping}}</span>
              </div>
            </div>
            <div class="mt-3">
              <svg height="8" width="200">
                <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:3" />
              </svg> <br>
              <span class="total-label is-small">TOTAL TO PAY :</span><span class="total-price">{{finalPrice | currency}}</span>
            </div>
          </b-col>
        </div>
      </b-col>
    </b-row>
    <b-row class="">
      <b-col md="8" class="text-center p-3">
        <div class="place-order-button">
          <b-button block disabled variant="primary" size="lg" to="/checkout">PLACE ORDER</b-button>
          <div class="is-small mt-2 mb-4">
            <em>By placing your order you agree to our Terms & Conditions, privacy and returns policies . You also consent to some of your data being stored by ONLINE SHOP, which may be used to make future shopping experiences better for you.</em>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Login from '../components/login.vue'
import Address from '../components/address.vue'
import Shipping from '../components/shipping.vue'
import Payment from '../components/payment.vue'
import Promo from '../components/promo.vue'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'checkout',
  components: {
    Login,
    Address,
    Shipping,
    Payment,
    Promo
  },
  data () {
    return {
      step: 2
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      cartItems: state => state.cart.totalCartItems,
      cartTotalPrice: state => state.cart.cartTotalPrice,
      cartMessage: state => state.cart.cartMessage,
      shipping: state => state.checkout.shipping,
      discount: state => state.cart.discount
    }),
    ...mapGetters({
      finalPrice: 'finalPrice',
      discountSum: 'discountSum'
    })
  },
  methods: {
  }
}
</script>

<style lang="css">
  .place-order-button {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
