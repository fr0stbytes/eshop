<template>
  <div class="">
    <div class="m-3 p-3 white-bg border">
      <b-row class="m-2 pb-3 border-bottom">
        <b-col xs="12">
          <h5>SHIPPING</h5>
        </b-col>
      </b-row>
      <b-row class="m-2 pb-3 border-bottom">
        <b-col xs="12">
          <div v-for="shipping in allShippings">
            {{shipping.name}}
          </div>
          <div class="">
            <b-form-select v-model="selected" :options="filterShippings()" class="mb-3" />
          </div>
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
      filteredShippings: [],
      selected: ''
    }
  },
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice
    }),
    ...mapGetters({
      allShippings: 'allShippings'
    })
  },
  methods: {
    filterShippings () {
    }
  }
}
</script>

<style lang="css">
</style>
