<template>
  <div class="empty-cart">
    <img src="../assets/empty-cart-state.png" alt="">
    <h3 class="empty-cart-text">There are no items in your cart!</h3>
    <div class="mt-5">
      <b-button variant="outline-dark" size="lg" to="/">CONTINUE SHOPPING</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'emptyCart'
}
</script>

<style lang="css">
  .empty-cart {
    text-align: center;
    max-width: 650px;
    margin: 0 auto;
  }
  .empty-cart-text {
    color: #bdbec0;
  }
</style>
