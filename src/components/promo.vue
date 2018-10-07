<template>
  <div class="">
    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2 pb-3 border-bottom">
        <b-col md="10">
          <h5 class="mt-2">COUPON / PROMO CODE</h5>
        </b-col>
        <b-col md="2" class="text-right">
          <b-btn @click="showPromo = !showPromo"
             :class="showPromo ? 'collapsed' : null"
             aria-controls="collapse1"
             :aria-expanded="showPromo ? 'true' : 'false'" variant="link">
            <span v-if="!showPromo"><i class="fas fa-2x fa-angle-down"></i></span>
            <span v-if="showPromo"><i class="fas fa-2x fa-angle-up"></i></span>
           </b-btn>
        </b-col>
      </b-row>
      <b-collapse id="collapse1" class="mt-2" v-model="showPromo">
        <b-row class="m-2 pb-3">
          <b-col>
            <div class="subtotal-price mt-4">
              ADD COUPON / PROMO CODE
            </div>
            <b-form inline class="mt-4" @submit.prevent="applyDiscount()">
              <label class="sr-only" for="inlineFormInputName2">Name</label>
              <b-input id="inlineFormInputName2" placeholder="Enter your code here" class="ml-3" v-model="coupon"/>
              <b-button variant="outline-primary"
                class="ml-2"
                type="submit"
                :disabled="discount > 0">APPLY CODE
              </b-button>
            </b-form>
            <div v-if="discount > 0">
              <span class="mt-3 ml-3 is-small"><em>A coupon has already been applied</em></span>
            </div>
            <div class="subtotal-price mt-4">
              NEED TO KNOW
            </div>
            <div class="mt-2">
              <ul>
                <li>
                  <p>You can only use one discount/promo code per order.This applies to our free-delivery codes, too.</p>
                </li>
                <li>
                  Discount/promo codes cannot be used when buying gift vouchers.
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-collapse>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showPromo: false,
      coupon: null
    }
  },
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
