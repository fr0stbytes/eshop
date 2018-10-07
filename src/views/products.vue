<template>
  <div class="product-container mt-5 mb-5">
    <h3>Featured Products</h3>
    <div class="product-list container">
      <b-row class="mt-5">
        <b-col lg="4" v-for="product in products" :key="product.id" class="mb-1">
          <b-card :title="product.name"
              footer-bg-variant="white">
              <div v-if="!noStock(product.id, product.inventory)" class="text-muted">{{product.inventory}} in stock</div>
              <div v-if="noStock(product.id, product.inventory)"><b-badge pill variant="danger">Out of stock</b-badge></div>
            <p class="card-text mt-2">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div slot="footer" class="product-price">
              <div class="text-muted" v-if="!product.original_price">
                {{product.price}} &euro;
              </div>
              <div class="text-muted" v-if="product.original_price">
                <span class="price-no-discount mr-2">
                  {{product.original_price}} &euro;
                </span>
                <span class="product-sale-price">
                  {{product.price}} &euro;
                </span>
              </div>
            </div>
            <b-button @click="addToCart(product.id, product.name, product.price, product.inventory, product.original_price)"
              variant="outline-primary"
              :disabled="noStock(product.id, product.inventory)">
              Add to Cart
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="mt-5">
      <b-button variant="outline-dark" size="lg" @click="gotoCart()">View Shopping Cart</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'products',
  computed: {
    ...mapState({
      products: state => state.products.all
    }),
    ...mapState({
      cartItems: state => state.cart.cartItems
    })
  },
  methods: {
    addToCart (id, name, price, inventory, original_price) {
      const product = {
        id: id,
        name: name,
        price: price,
        inventory: inventory,
        original_price: original_price
      }
      this.$store.dispatch('addToCart', product)
    },
    gotoCart () {
      this.$router.push('cart')
    },
    // TODO create a better method for this!!! How to handle stock vs cart quantity??
    noStock (id, inventory) {
      const item = this.cartItems.find(item => item.id === id)
      if (!item) {
      } else {
        if (!item.quantity || item.quantity === 'undefined') {
        } else {
          if (item.quantity >= inventory) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .product-container {
    text-align: center;
  }
  .product-list {
    text-align: left;
  }
  .footer {
    background: var(--gray-dark);
    color: var(--gray);
    padding: 12px 3em;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .product-price {
    text-align: right;
    font-weight: bold;
  }
  .price-no-discount {
    color: rgba(0, 0, 0, .3);
    text-decoration: line-through;
  }
  .product-sale-price {
    color: #d01345;
  }
</style>
