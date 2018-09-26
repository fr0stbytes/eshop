<template lang="html">
  <div class="container mt-5">
    <h4 class="mt-5">My cart</h4>
    <div class="mt-3">
      <svg height="210" width="500">
        <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:6" />
      </svg>
    </div>
    <div class="cart-table">
      <b-table :fields="fields" :items="items" responsive>
        <template slot="product" slot-scope="data">
          <span class="mt-1 cart-title">{{data.item.product}}</span><br>
          <span class="is-small">{{data.item.id}}</span>
        </template>
        <template slot="price" slot-scope="data">
          {{data.item.price}} &euro;
        </template>
        <template slot="quantity" slot-scope="data">
          <b-button size="sm" variant="outline-secondary"> + </b-button>
          <span class="pl-4 pr-4">{{data.item.quantity}}</span>
          <b-button size="sm" variant="outline-secondary"> - </b-button>
        </template>
      </b-table>
      <template slot="total" slot-scope="data">
        total
      </template>
    </div>
    <div class="mt-2 text-right">
      <svg height="8" width="200">
        <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:6" />
      </svg>
      <div class="mt-3">
        <span class="total-label is-small">TOTAL:</span><span class="total-price">&euro; {{cartTotalPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      fields: [
        { key: 'product', label: 'PRODUCTS' },
        { key: 'price', label: 'PRICE' },
        { key: 'quantity', label: 'QTY' },
        { key: 'total', label: 'TOTAL' }
      ],
      items: [
        { product: 'Product 1', id: '001', quantity: 2, price: '3.15' },
        { product: 'Product 2', id: '008', quantity: 1, price: '4.22' }
      ]
    }
  },
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice
      // TODO bring cart items from state with getters
    })
  },
  methods: {
    // TODO create methods for quantity buttons
  }
}
</script>

<style lang="css">
  .is-small {
    font-size: .8em;
    color: rgba(0, 0, 0, 0.5);
  }
  .cart-title {
    color: rgba(0, 0, 0, 0.8);
    font-weight: bold;
  }
  .total-price {
    font-size: 1.5em;
    font-weight: bold;
    margin-left: 1em;
    color: rgba(0, 0, 0, 0.8);
  }
  .total-label {
    font-weight: bold;
  }
</style>
