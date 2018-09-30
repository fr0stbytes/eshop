<template lang="html">
  <div class="container mt-5">
    <h4 class="mt-5">My cart</h4>
    <div class="mt-3">
      <svg height="100" width="500">
        <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:6" />
      </svg>
    </div>
    <div v-if="cartTotalItems.length >= 1">
      <div v-if="cartMessage" class="mt-5">
        <b-alert dismissible variant="danger" :show="cartMessage !== null" @dismissed="resetStockMessage">
          <b>{{cartMessage.name}} :</b>  {{cartMessage.message}}
        </b-alert>
      </div>
      <div class="cart-table">
        <b-table :fields="fields" :items="cartTotalItems" responsive>
          <template slot="product" slot-scope="data">
            <span class="mt-1 cart-title">{{data.item.name}}</span><br>
            <span class="is-small">{{data.item.id}}</span>
          </template>
          <template slot="price" slot-scope="data">
            &euro; {{data.item.price}}
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
            {{data.item.total | currency}}
          </template>
          <template slot="remove" slot-scope="data">
            <div class="text-right">
              <b-button size="sm" variant="link" class="is-small"
                @click="removeFromCart(data.item.id, data.item.total, data.item.quantity, data.item.price)"> x Remove
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
      <div class="mt-2 text-right">
        <svg height="8" width="200">
          <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:6" />
        </svg>
      </div>
      <b-row class="">
        <b-col md="9">
          <div class="subtotal-price mt-2">
            Have a promo code?
          </div>
          <b-form inline class="mt-2">
            <label class="sr-only" for="inlineFormInputName2">Name</label>
            <b-input id="inlineFormInputName2" placeholder="Enter your code here" class="ml-3" v-model="coupon"/>
            <b-button variant="outline-primary" class="ml-2" @click="applyDiscount()">Apply</b-button>
          </b-form>
          <b-alert dismissible variant="warning" :show="discountMessage !== null" @dismissed="resetDiscountMessage" class="discount-message mt-2">
            <em>{{discountMessage}}</em>
          </b-alert>
        </b-col>
        <b-col md="3" class="text-right">
          <div class="mt-3">
            <span class="total-label is-small">SUBTOTAL :</span><span class="subtotal-price">{{cartTotalPrice | currency}}</span>
          </div>
          <div class="mt-3">
            <div class="">
              <span class="total-label is-small">SHIPPING :</span><span class="subtotal-price">&euro;{{shipping}}</span>
            </div>
          </div>
          <div class="mt-3">
            <div class="">
              <span class="total-label is-small">DISCOUNT {{discount}}% :</span><span class="subtotal-price">- {{discountSum | currency}}</span>
            </div>
          </div>
          <div class="mt-3">
            <svg height="8" width="200">
              <line x1="0" y1="0" x2="200" y2="0" style="stroke:rgb(0, 0, 0, .7);stroke-width:3" />
            </svg> <br>
            <span class="total-label is-small">TOTAL :</span><span class="total-price">{{finalPrice | currency}}</span>
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
      coupon: ''
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
      shipping: state => state.cart.shipping,
      discountMessage: state => state.cart.discountMessage,
      discount: state => state.cart.discount
    }),
    ...mapGetters({
      finalPrice: 'finalPrice',
      discountSum: 'discountSum'
    })
  },
  methods: {
    // TODO create methods for quantity buttons
    // increaseCartQty (id) {
    //   this.$store.dispatch('increaseCartQty', id)
    // },
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
    },
    applyDiscount () {
      const coupon = this.coupon
      this.$store.dispatch('applyDiscount', coupon)
    },
    resetDiscountMessage () {
      this.$store.dispatch('resetDiscountMessage')
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
  .subtotal-price {
    color: rgba(0, 0, 0, 0.5);
    margin-left: 1em;
    font-size: 1.125em;
    font-weight: bold;
  }
  .total-label {
    font-weight: bold;
  }
  .discount-message {
    max-width: 400px;
  }
</style>
