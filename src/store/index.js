import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import cart from './modules/cart'
import auth from './modules/auth'
import checkout from './modules/checkout'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    cart,
    auth,
    checkout
  }
})
