<template>
  <div id="app">
    <transition name="page-transition" enter-active-class="animated fadeInRightBig" exit-active-class="animated fadeOutLeft">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// import Navbar from './components/navbar'

export default {
  components: {
  },
  mounted () {
    this.$store.dispatch('getAllProducts')
    this.$store.dispatch('isAuthenticated')
    this.$store.dispatch('setShippings')
  }
}
</script>

<style lang="scss">

  #app{
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    font-family: 'Lato', sans-serif;

  }
  .btn {
    border-radius: 0 !important;
  }
  .btn.btn-link {
    color: #343a40;
  }
  .btn.btn-link:hover, .btn.btn-link:active {
    text-decoration: none;
  }
  .form-control {
    border-radius: 0 !important;
  }
  body {
    background-color: #f2f2f2;
  }
  img {
    width: 100%;
    height: auto;
  }
  .white-bg {
    background-color: white;
  }
  .border-bottom {
    border-bottom: 1px solid #dbdbdb;
  }
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
  .trash-icon {
    color: rgba(0, 0, 0, 0.3);
  }
  .trash-icon:hover {
    color: #d01345;
  }
</style>
