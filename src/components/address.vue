<template>
  <div class="">
    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2">
        <b-col class="mt-2">
          <h5>EMAIL ADDRESS</h5>
          <div class="mt-2">
            <p>{{user.email}}</p>
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2 pb-3 border-bottom">
        <h5>DELIVERY ADDRESS</h5>
      </b-row>
      <b-row class="m-3 p-3" v-if="!user.delivery_address && !user.billing_address">
        <b-col xs="12" md="10">
          <AddressForm :addressToChange="'both'"/>
        </b-col>

      </b-row>
      <b-row class="m-3 p-3" v-if="user.delivery_address !== null && user.delivery_address !== undefined">
        <b-col xs="12" sm="9">
          <p class="address-line">{{user.delivery_address.first_name}} {{user.delivery_address.last_name}}</p>
          <p class="address-line">{{user.delivery_address.address_line1}}</p>
          <p class="address-line">
            <span v-if="user.delivery_address.address_line2 !== null && user.delivery_address.address_line2 !== undefined">{{user.delivery_address.address_line2}}, </span><span>{{user.delivery_address.city}}</span>
          </p>
          <p class="address-line">{{user.delivery_address.postcode}}</p>
          <p class="address-line">{{user.delivery_address.country}}</p>
          <p class="address-line">{{user.delivery_address.mobile}}</p>
        </b-col>
        <b-col xs="12" sm="3">
          <b-button variant="secondary" size="sm" @click="modalShow = !modalShow">CHANGE</b-button>
        </b-col>
      </b-row>
    </div>
    <b-modal id="modal1" title="Change Shipping Address" hide-footer v-model="modalShow">
      <div class="p-2">
        <AddressForm :addressToChange="'shipping'" :addressDetails="this.user.delivery_address" v-on:hideModal="hideModal($event)"/>
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
      modalShow: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
      // shipping_address: state  => state.auth.user.shipping_address
    })
  },
  methods: {
    hideModal (value) {
      this.modalShow = value
    }
  }
}
</script>

<style lang="css">
  .address-form-label {
    font-size: 1.125 em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
  }
  .address-line {
    line-height: .5em;
  }
</style>
