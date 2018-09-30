<template>
  <div class="empty-cart">
    <img src="../assets/empty-cart-state.png" alt="">
    <h3 class="empty-cart-text">There are no items in your cart!</h3>
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
  }
  .empty-cart-text {
    color: #bdbec0;
  }
</style>
