<template>
  <div class="container">
    <div class="product-list mt-5">
      <h3>Select your favourite movie</h3>
      <ul class="mt-3">
        <li v-for="product in products" :key="product.id" class="w-25 p-3 mb-1">
          <b-card :title="product.title"
              :sub-title="product.price + ' &euro;'"
              style="max-width: 20rem;">
          <b-button @click="addToCart(product.id, product.title, product.price)" variant="outline-success">Add to Cart</b-button>
      </b-card>
        </li>
      </ul>
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
    addToCart (id, title, price) {
      console.log('Add to cart' + ' ' + id + ' ' + title + ' ' + price)
    }
  }
}

</script>
<style lang="scss" scoped>
  li {
    display: inline-block;
  }
  .product-list {
    text-align: center;
  }
</style>
