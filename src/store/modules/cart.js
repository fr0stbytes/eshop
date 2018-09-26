const state = {
  cartItems: [],
  totalCartItems: ''
}
const getters = {

}
const actions = {
  addToCart ({ commit, state }, product) {
    const cartItem = state.cartItems.find(item => item.id === product.id)
    if (!cartItem) {
      commit('saveItems', { id: product.id, title: product.title, price: product.price })
    } else {
      commit('incrementQuantity', { id: product.id })
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
      quantity: 1
    })
  },
  incrementQuantity (state, { id }) {
    const cartItem = state.cartItems.find(item => item.id === id)
    cartItem.quantity++
  },
  increaseTotalCartItems(state) {
    state.totalCartItems++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
