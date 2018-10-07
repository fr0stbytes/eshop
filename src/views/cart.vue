<template lang="html">
  <div class="container mt-5">
    <b-row class="text-center m-3">
      <b-col>
        <h2>MY CART</h2>
      </b-col>
    </b-row>
    <div v-if="cartTotalItems.length >= 1">
      <b-row class="mt-5">
        <b-col md="8">
          <div class="m-3 p-3 white-bg border">
            <b-row class="m-2 pb-3">
              <h5>MY CART</h5>
            </b-row>
            <div class="cart-table border-bottom">
              <b-table :fields="fields" :items="cartTotalItems" responsive hover>
                <template slot="product" slot-scope="data">
                  <span class="mt-1 cart-title">{{data.item.name}}</span><br>
                  <span class="is-small">{{data.item.id}}</span>
                </template>
                <template slot="price" slot-scope="data">
                  <span class="price-no-discount" v-if="data.item.original_price">&euro; {{data.item.original_price}}  </span>
                  <span>  &euro; {{data.item.price}}</span>
                </template>
                <template slot="quantity" slot-scope="data">
                  <b-button size="sm" variant="outline-secondary"
                    @click="addToCart(data.item.id, data.item.name, data.item.price, data.item.inventory)"> +
                  </b-button>
                  <span class="pl-4 pr-4">{{data.item.quantity}}</span>
                  <b-button size="sm" variant="outline-secondary"
                    @click="decreaseCartQty(data.item.id, data.item.quantity, data.item.total, data.item.price)"> -
                  </b-button>
                </template>
                <template slot="total" slot-scope="data">
                  <b>{{data.item.total | currency}}</b>
                </template>
                <template slot="remove" slot-scope="data">
                  <div class="text-right">
                    <b-button size="sm" variant="link" class="is-small"
                      @click="removeFromCart(data.item.id, data.item.total, data.item.quantity, data.item.price)">
                      <i class="fas fa-trash-alt trash-icon"></i>
                    </b-button>
                  </div>
                </template>
              </b-table>
            </div>
            <div v-if="cartMessage">
              <b-alert dismissible variant="warning" :show="cartMessage !== null" @dismissed="resetStockMessage">
                <b>{{cartMessage.name}} :</b>  {{cartMessage.message}}
              </b-alert>
            </div>
            <div class="mt-3 text-right">
              <span class="total-label is-small">SUBTOTAL :</span><span class="subtotal-price">{{cartTotalPrice | currency}}</span>
            </div>
          </div>
        </b-col>
        <b-col md="4">
          <div class="m-3 p-3 white-bg border">
            <b-row class="m-2 pb-3 border-bottom">
              <h5>TOTAL</h5>
            </b-row>
            <b-col class="text-right">
              <div class="mt-3">
                <span class="total-label is-small">SUBTOTAL :</span><span class="subtotal-price">{{cartTotalPrice | currency}}</span>
              </div>
              <div class="mt-3">
                <div class="">
                  <span class="total-label is-small">EST. SHIPPING :</span><span class="subtotal-price">&euro;{{shipping}}</span>
                </div>
              </div>
              <div class="mt-3">
                <svg height="8" width="200">
                  <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:3" />
                </svg> <br>
                <span class="total-label is-small">TOTAL :</span><span class="total-price">{{finalPrice | currency}}</span>
              </div>
            </b-col>
            <b-row class="m-2 pt-3">
              <b-button block variant="primary" size="lg" to="/checkout">CHECKOUT</b-button>
              <p class="mt-3"><b>WE ACCEPT:</b> </p>
              <div class="">
                <img src="../assets/credit-cards.png" alt="">
              </div>
              <p class="is-small mt-3">Got a discount code? Add it in the next step.</p>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EmptyCart from '../components/emptyCart'

export default {
  name: 'cart',
  data () {
    return {
      fields: [
        { key: 'product', label: 'PRODUCTS' },
        { key: 'price', label: 'PRICE' },
        { key: 'quantity', label: 'QTY' },
        { key: 'total', label: 'TOTAL' },
        { key: 'remove', label: '' }
      ],
      coupon: '',
      selected: null
    }
  },
  components: {
    EmptyCart
  },
  computed: {
    ...mapState({
      cartTotalPrice: state => state.cart.cartTotalPrice,
      cartTotalItems: state => state.cart.cartItems,
      cartMessage: state => state.cart.cartMessage,
      shipping: state => state.cart.estShipping
    }),
    ...mapGetters({
      finalPrice: 'finalPrice'
    })
  },
  methods: {
    addToCart (id, name, price, inventory) {
      const product = {
        id: id,
        name: name,
        price: price,
        inventory: inventory
      }
      this.$store.dispatch('addToCart', product)
    },
    removeFromCart (id, total, quantity, price) {
      const product = {
        id: id,
        total: total,
        quantity: quantity,
        price: price
      }
      this.$store.dispatch('removeFromCart', product)
    },
    resetStockMessage () {
      this.$store.dispatch('resetStockMessage')
    },
    decreaseCartQty (id, quantity, total, price) {
      const product = {
        id: id,
        total: total,
        quantity: quantity,
        price: price
      }
      this.$store.dispatch('decreaseCartQty', product)
    }
  }
}
</script>

<style lang="css">

</style>
