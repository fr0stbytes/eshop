<template lang="html">
  <div class="container mt-5">
    <div class="">
      <b-alert show variant="danger">{{cartMessage}}</b-alert>
    </div>
    <h4 class="mt-5">My cart</h4>
    <div class="mt-3">
      <svg height="210" width="500">
        <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:6" />
      </svg>
    </div>
    <div class="cart-table">
      <b-table :fields="fields" :items="cartTotalItems" responsive>
        <template slot="product" slot-scope="data">
          <span class="mt-1 cart-title">{{data.item.title}}</span><br>
          <span class="is-small">{{data.item.id}}</span>
        </template>
        <template slot="price" slot-scope="data">
          {{data.item.price}} &euro;
        </template>
        <template slot="quantity" slot-scope="data">
          <b-button size="sm" variant="outline-secondary"
            @click="increaseCartQty(data.item.id)"> +
          </b-button>
          <span class="pl-4 pr-4">{{data.item.quantity}}</span>
          <b-button size="sm" variant="outline-secondary"
            @click="removeFromCart(data.item.id, data.item.title, data.item.price, data.item.inventory)"> -
          </b-button>
        </template>
      </b-table>
      <template slot="total" slot-scope="data">
        {{data.item.total}}
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
  name: 'cart',
  data () {
    return {
      fields: [
        { key: 'product', label: 'PRODUCTS' },
        { key: 'price', label: 'PRICE' },
        { key: 'quantity', label: 'QTY' },
        { key: 'total', label: 'TOTAL' }
      ]
    }
  },
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice
    }),
    ...mapState({
      cartTotalItems: state => state.cart.cartItems
    }),
    ...mapState({
      cartMessage: state => state.products.cartMessage
    })
  },
  methods: {
    // TODO create methods for quantity buttons
    increaseCartQty (id) {
      this.$store.dispatch('increaseCartQty', id)
      console.log(id)
    },
    removeFromCart (id, title, price, inventory) {
      const product = {
        id: id,
        title: title,
        price: price,
        inventory: inventory
      }
      console.log(product)
    }
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
