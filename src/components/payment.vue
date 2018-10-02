<template>
  <div class="">
    <b-row class="">
      <b-col md="9">
        <div class="subtotal-price mt-2">
          Have a promo code?
        </div>
        <b-form inline class="mt-2" @submit.prevent="applyDiscount()">
          <label class="sr-only" for="inlineFormInputName2">Name</label>
          <b-input id="inlineFormInputName2" placeholder="Enter your code here" class="ml-3" v-model="coupon"/>
          <b-button variant="outline-primary"
            class="ml-2"
            type="submit"
            :disabled="discount > 0">Apply
          </b-button>
        </b-form>
        <b-alert dismissible variant="warning" :show="discountMessage !== null" @dismissed="resetDiscountMessage" class="discount-message mt-2">
          <em>{{discountMessage}}</em>
        </b-alert>
        <div v-if="discount > 0">
          <span class="mt-3 ml-3 is-small"><em>A coupon has already been applied</em></span>
        </div>
      </b-col>

  </b-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice,
      cartTotalItems: state => state.cart.cartItems,
      cartMessage: state => state.cart.cartMessage,
      shipping: state => state.cart.shipping,
      discountMessage: state => state.cart.discountMessage,
      discount: state => state.cart.discount
    }),
    ...mapGetters({
      finalPrice: 'finalPrice',
      discountSum: 'discountSum'
    })
  },
  methods: {
    applyDiscount () {
      if (this.discount === 0) {
        const coupon = this.coupon
        this.$store.dispatch('applyDiscount', coupon)
      } else {
        console.log('discound already applied')
      }
    },
    resetDiscountMessage () {
      this.$store.dispatch('resetDiscountMessage')
    }
  }
}
</script>

<style lang="css">
</style>
