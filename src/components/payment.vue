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
        <div class="subtotal-price mt-4">
          PAYMENT METHOD
        </div>
      </b-row>
      <b-row class="m-2 pb-3">
        <b-form-group>
          <b-form-radio-group id="radios2" v-model="selectedPayment" name="radioSubComponent" stacked>
              <b-form-radio value="card">
                <div class="mb-2 p-2 pr-4 pl-4 ml-3 border payment-button">
                  <img class="payment-img" src="../assets/credit-card.svg" alt=""><span class="ml-4">CREDIT / DEBIT CARD</span>
                </div>
              </b-form-radio>

              <b-form-radio value="paypal">
                <div class="mb-2 p-2 pr-4 pl-4 ml-3 border payment-button">
                  <img class="payment-img" src="../assets/paypal.svg" alt=""><span class="ml-4">PAYPAL</span>
                </div>
              </b-form-radio>

              <b-form-radio value="stripe">
                <div class="mb-2 p-2 pr-4 pl-4 ml-3 border payment-button">
                  <img class="payment-img" src="../assets/stripe.svg" alt=""><span class="ml-4">STRIPE</span>
                </div>
              </b-form-radio>

              <b-form-radio value="cash">
                <div class="mb-2 p-2 pr-4 pl-4 ml-3 border payment-button">
                  <img class="payment-img" src="../assets/cash.svg" alt=""><span class="ml-4">CASH ON DELIVERY</span>
                </div>
              </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
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
      user: state => state.auth.user,
      billing_address: state => state.orders.billingAddress
    })
  },
  methods: {
    hideModal (value) {
      this.modalShow2 = value
    }
  }
}
</script>

<style lang="css">
  .payment-img {
    width: 50px;
    height: auto;
  }
  .payment-button {
    width: 100%;
    display: block;
  }
  .custom-radio .custom-control-label::before{
    margin-top: 1.5em;
  }
  .custom-control-label {
    width: 100%;
  }
</style>
