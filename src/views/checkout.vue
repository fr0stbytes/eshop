<template>
  <div class="container checkout-container pt-5">
    <b-row>
      <b-col md="9" class="">
        <Login v-if="!user"/>
        <Address v-if="this.step === 2 && user"/>
        <Shipping v-if="this.step === 3 && user"/>
        <Payment v-if="this.step === 4 && user"/>
      </b-col>
      <b-col md="3" class="checkout-summary">
        <div class="checkout-summary-text">
          summary
        </div>
        <div class="mt-3 text-right">
          <b-button variant="primary" size="lg"
            @click="nextStep()"
            v-if="this.step < 4">
            Continue <i class="fas fa-caret-right ml-4"></i>
          </b-button>
          <b-button variant="primary" size="lg"
            v-if="this.step === 4">
            Complete Order <i class="fas fa-caret-right ml-4"></i>
          </b-button>
          <b-button variant="link"
            v-if="this.step > 2"
            @click="previousStep()">
            Back to previous step</i>
          </b-button>
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

import { mapState } from 'vuex'

export default {
  name: 'checkout',
  components: {
    Login,
    Address,
    Shipping,
    Payment
  },
  data () {
    return {
      step: 2
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    nextStep () {
      this.step++
    },
    previousStep () {
      this.step--
    }
  }
}
</script>

<style lang="css">
.checkout-summary {
  border: 1px solid #dbdbdb;
  padding: 2em;
}
</style>
