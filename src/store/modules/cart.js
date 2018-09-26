const state = {
  cartItems: [],
  totalCartItems: '',
  cartTotalPrice: 0
}
const getters = {

}
const actions = {
  addToCart ({ commit, state }, product) {
    const cartItem = state.cartItems.find(item => item.id === product.id)
    if (!cartItem) {
      commit('saveItems', { id: product.id, title: product.title, price: product.price })
    } else {
      commit('incrementQuantity', { id: product.id, price: product.price })
    }
    commit('decreaseStock', { id: product.id }, { root: true })
    commit('increaseTotalCartItems')
  }
}
const mutations = {
  saveItems (state, { id, title, price }) {
    state.cartItems.push({
      id,
      title,
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
