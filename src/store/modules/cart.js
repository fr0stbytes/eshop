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
        commit('saveItems', { id: product.id, name: product.name, price: product.price, inventory: product.inventory })
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
  },
  removeFromCart ({ commit }, product) {
    commit('removeFromCart', { removeId: product.id, total: product.total, quantity: product.quantity })
  },
  decreaseCartQty ({ commit }, product) {
    if (product.quantity > 1) {
      commit('decreaseQuantity', { id: product.id })
    } else {
      commit('removeFromCart', { removeId: product.id, total: product.total, quantity: product.quantity })
    }
  }
}

const mutations = {
  saveItems (state, { id, name, price, inventory }) {
    state.cartItems.push({
      id,
      name,
      price,
      quantity: 1,
      inventory,
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
  decreaseQuantity (state, { id }) {
    const cartItem = state.cartItems.find(item => item.id === id)
    cartItem.quantity--
    cartItem.total = cartItem.total - cartItem.price
    state.cartTotalPrice = state.cartTotalPrice - cartItem.price
    state.totalCartItems--
  },
  removeFromCart (state, { removeId, total, quantity }) {
    const removeItem = state.cartItems.find(item => item.id === removeId)
    state.cartItems.splice(removeItem, 1)
    state.cartTotalPrice = state.cartTotalPrice - total
    state.totalCartItems = state.totalCartItems - quantity
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
