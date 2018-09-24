<template>
  <div id="app">
    <link rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <b-navbar variant="dark" type="dark">
      <b-link class="navbar-brand" :to="'/'">Online Store</b-link>
      <b-navbar-nav class="ml-auto">
        <b-link class="navbar-brand" :to="'/cart'"><i class="fas fa-shopping-cart"></i><b-badge pill variant="primary">4</b-badge></b-link>

      </b-navbar-nav>
    </b-navbar>
    <router-view/>
    <div class="footer">
      A Vue.js experiment by Fr0stbytes
    </div>
  </div>
</template>

<style lang="scss">
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--gray-dark);
    color: var(--gray);
    padding: 12px 3em;
    text-align: center;
  }
</style>
