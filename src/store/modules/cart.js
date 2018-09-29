const state = {
  cartItems: [],
  totalCartItems: '',
  cartTotalPrice: 0
}
const getters = {

}
const actions = {
  addToCart ({ commit, state }, product) {
    // commit('decreaseStock', { id: product.id }, { root: true })
    if (product.inventory > 0) {
      const cartItem = state.cartItems.find(item => item.id === product.id)
      if (!cartItem) {
        commit('saveItems', { id: product.id, name: product.name, price: product.price })
        commit('increaseTotalCartItems')
      } else {
        if (cartItem.quantity < product.inventory) {
          commit('incrementQuantity', { id: product.id, price: product.price })
          commit('increaseTotalCartItems')
        } else {
          console.log('no stock')
        }
      }
    } else {
      commit('noStockMessage')
    }
  }
}
const mutations = {
  saveItems (state, { id, name, price }) {
    state.cartItems.push({
      id,
      name,
      price,
      quantity: 1,
      total: price
    })
    state.cartTotalPrice = state.cartTotalPrice + price
  },
  incrementQuantity (state, { id, price }) {
    const cartItem = state.cartItems.find(item => item.id === id)
    cartItem.quantity++
    cartItem.total = cartItem.total + price
    state.cartTotalPrice = state.cartTotalPrice + price
  },
  increaseTotalCartItems (state) {
    state.totalCartItems++
  },
  decreaseQuantity (state, { id, price }) {
    const cartItem = state.cartItems.find(item => item.id === id)
    cartItem.quantity--
    cartItem.total = cartItem.total - price
    state.cartTotalPrice = state.cartTotalPrice - price
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
