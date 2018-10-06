<template>
  <div class="">
    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2 pb-3 border-bottom">
        <h5>PAYMENT</h5>
      </b-row>

      <div v-if="user.billing_address !== null && user.billing_address !== undefined">
        <b-row class=" m-2">
          <div class="subtotal-price mt-2">
            BILLING ADDRESS
          </div>
        </b-row>
        <b-row class="m-2 p-3">
          <b-col xs="12" sm="9">
            <p class="address-line">{{user.billing_address.first_name}} {{user.billing_address.last_name}}</p>
            <p class="address-line">{{user.billing_address.address_line1}}</p>
            <p class="address-line">
              <span v-if="user.billing_address.address_line2 !== null && user.billing_address.address_line2 !== undefined">{{user.billing_address.address_line2}}, </span><span>{{user.billing_address.city}}</span>
            </p>
            <p class="address-line">{{user.billing_address.postcode}}</p>
            <p class="address-line">{{user.billing_address.country}}</p>
            <p class="address-line">{{user.billing_address.mobile}}</p>
          </b-col>
          <b-col xs="12" sm="3">
            <b-button variant="secondary" size="sm" @click="modalShow2 = !modalShow2">CHANGE</b-button>
          </b-col>
        </b-row>
      </div>

      <b-row class=" m-2">
        <b-col xs="12" md="10">
          <div class="subtotal-price mt-4">
            PAYMENT METHOD
          </div>
          <div class="is-small ml-3 mb-4">
            <em>You will be redierced to the secure payment gateway once you place your order.</em>
          </div>
        </b-col>
      </b-row>
      <b-row class="m-2 pb-3 ml-4">
        <b-col xs="12" md="10" lg="8">
          <b-button variant="outline-secondary" :pressed="setPressed('card')" block class="text-left" @click="setPayment('card', $event)" id="paymentButton1">
            <img class="payment-img" src="../assets/credit-card.svg" :class="getClass('card')"><span class="ml-4">CREDIT/DEBIT CARD</span>
          </b-button>
          <b-button variant="outline-secondary" :pressed="setPressed('paypal')" block class="text-left" @click="setPayment('paypal', $event)" id="paymentButton2">
            <img class="payment-img" src="../assets/paypal.svg" :class="getClass('paypal')"><span class="ml-4">PAYPAL</span>
          </b-button>
          <b-button variant="outline-secondary" :pressed="setPressed('stripe')" block class="text-left" @click="setPayment('stripe', $event)" id="paymentButton3">
            <img class="payment-img" src="../assets/stripe.svg" :class="getClass('stripe')"><span class="ml-4">STRIPE</span>
          </b-button>
          <b-button variant="outline-secondary" :pressed="setPressed('cash')" block class="text-left" @click="setPayment('cash', $event)" id="paymentButton4">
            <img class="payment-img" src="../assets/cash.svg" :class="getClass('cash')"><span class="ml-4">CASH ON DELIVERY</span>
          </b-button>

        </b-col>
      </b-row>
    </div>
    <b-modal id="modal2" title="Change Billing Address" hide-footer v-model="modalShow2">
      <div class="p-2">
        <AddressForm :addressToChange="'billing'" v-on:hideModal="hideModal($event)"/>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AddressForm from '../components/addressForm'

export default {
  components: {
    AddressForm
  },
  data () {
    return {
      selectedPayment: null,
      modalShow2: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    hideModal (value) {
      this.modalShow2 = value
    },
    setPayment (value, event) {
      // console.log(value, event.target.id)
      this.selectedPayment = value
      this.$store.dispatch('setSelectedPayment', value)
      this.setPressed(value)
      this.getClass(value)
    },
    setPressed (value) {
      if (value === this.selectedPayment) {
        return true
      } else {
        return false
      }
    },
    getClass (value) {
      if (value === this.selectedPayment) {
        return 'inverted-svg'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="css">
  .payment-img {
    width: 50px;
    height: auto;
    opacity: .3;
  }
  .inverted-svg {
    filter: invert(1);
    opacity: .8;
  }
</style>
