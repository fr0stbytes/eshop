<template>
  <div class="">
    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2 pb-3 border-bottom">
        <b-col xs="12">
          <h5>SHIPPING METHOD</h5>
        </b-col>
      </b-row>
      <b-row class="m-2 pb-3 border-bottom">
        <b-col xs="12">
          <b-form-group class="pt-3">
            <b-form-radio-group v-model="selected"
                          :options="shippings"
                          text-field="name"
                          value-field="value"
                          stacked
                          :change="setShipping(this.selected)"
                          :checked="this.options.value == estShipping"
                          class="shipping-radio"/>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice
    }),
    ...mapGetters({
      shippings: 'shippings',
      estShipping: 'estShipping'
    })
  },
  methods: {
    setShipping (input) {
      const shipping = this.shippings.find((shipping) => {
         return shipping.value === input
      })
      this.$store.dispatch('setSelectedShipping', JSON.stringify(shipping))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
