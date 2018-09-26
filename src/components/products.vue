<template>
  <div class="product-container mt-5 mb-5">
    <h3>Select your favourite movie</h3>
    <div class="product-list container">
      <b-row class="mt-5">
        <b-col lg="3" v-for="product in products" :key="product.id" class="mb-1">
          <b-card :title="product.title"
              :sub-title="product.price + ' &euro;'">
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <div slot="footer" v-if="product.inventory > 0">Stock: {{product.inventory}}</div>
            <div slot="footer" v-if="product.inventory <= 0"><b-badge pill variant="danger">Out of stock</b-badge></div>
            <b-button @click="addToCart(product.id, product.title, product.price, product.inventory)"
              variant="outline-primary"
              :disabled="product.inventory <= 0">
              Add to Cart
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="mt-5">
      <b-button variant="outline-dark" size="lg" @click="gotoCart()">View Shopping Cart</b-button>
    </div>
    <div class="footer align-bottom">
      A Vue.js experiment by Fr0stbytes
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'products',
  computed: mapState({
    products: state => state.products.all
  }),
  methods: {
    addToCart (id, title, price, inventory) {
      const product = {
        id: id,
        title: title,
        price: price,
        inventory: inventory
      }
      this.$store.dispatch('addToCart', product)
    },
    gotoCart () {
      this.$router.push('cart')
    }
  }
}

</script>
<style lang="scss" scoped>
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
</style>
