<template>
  <div class="">
    <h5>{{this.addressToChange}}</h5>
    <b-form @submit.prevent="submitAddress">
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * FIRST NAME :
        </div>
        <b-form-input id="exampleInput1" type="text" v-model="address.first_name" required :placeholder="addressDetails.first_name || Optional">></b-form-input>
      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * LAST NAME :
        </div>
        <b-form-input id="exampleInput1" type="text" v-model="address.last_name" required></b-form-input>
      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * MOBILE :
        </div>
        <b-form-group id="exampleInputGroup2"
              label-for="exampleInput2"
              description="For delivery updates">
          <b-form-input id="exampleInput2" type="text" v-model="address.mobile" required></b-form-input>
        </b-form-group>

      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * ADDRESS :
        </div>
        <b-form-input id="exampleInput1" type="text" v-model="address.address_line1" required></b-form-input>
        <b-form-input class="mt-2" id="exampleInput1" type="text" v-model="address.address_line2" :placeholder="addressDetails.address_line2 || Optional"></b-form-input>
      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * CITY :
        </div>
        <b-form-input id="exampleInput1" type="text" v-model="address.city" required></b-form-input>
      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * POSTCODE :
        </div>
        <b-form-input id="exampleInput1" type="text" v-model="address.postcode" required></b-form-input>
      </div>
      <div>
        <div class="mt-4 mb-1 address-form-label">
          * COUNTRY :
        </div>
        <b-form-select v-model="address.country" :options="deliveryCountries"/>
      </div>
      <div class="mt-5">
        <b-button type="submit" variant="primary" block>USE THIS ADDRESS</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['addressToChange', 'addressDetails'],
  data () {
    return {
      address: {
        first_name: null,
        last_name: null,
        mobile: null,
        address_line1: null,
        address_line2: null,
        city: null,
        postcode: null,
        country: null
      },
      deliveryCountries: [
        { value: null, text: 'Please select your country' },
        { value: 'Germany', text: 'Germany' },
        { value: 'Greece', text: 'Greece' },
        { value: 'UK & Ireland', text: 'UK & Ireland' }
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    submitAddress () {
      const newAddress = this.address
      const addressToChange = this.addressToChange
      this.$store.dispatch('setAddress', { newAddress, addressToChange })
      this.$emit('hideModal', false)
    }
  }
}
</script>

<style lang="css">
</style>
