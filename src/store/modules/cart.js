import db from '../../firebase/firebaseInit'

const state = {
  cartItems: [],
  totalCartItems: '',
  cartTotalPrice: 0,
  estShipping: 4,
  discount: 0,
  discountMessage: null,
  cartMessage: null,
  shippings: []
}
const getters = {
  finalPrice (state) {
    const finalPrice = state.cartTotalPrice - state.cartTotalPrice * state.discount / 100
    return finalPrice
  },
  discountSum (state) {
    const discountSum = state.cartTotalPrice * state.discount / 100
    return discountSum
  },
  shippings (state) {
    const totalPrice = state.cartTotalPrice
    if (totalPrice < 50) {
      const shippings = state.shippings.filter((shipping) => {
        return shipping.value >= 4
      })
      return shippings.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
    } else {
      const shippings = state.shippings.filter((shipping) => {
        return shipping.value != 4
      })
      return shippings.sort((a, b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
    }
  },
  estShipping (state) {
    return state.estShipping
  }
}
const actions = {
  addToCart ({ commit, state }, product) {
    if (product.inventory > 0) {
      const cartItem = state.cartItems.find(item => item.id === product.id)
      if (!cartItem) {
        commit('saveItems', { id: product.id, name: product.name, price: product.price, inventory: product.inventory, original_price: product.original_price })
        commit('increaseTotalCartItems')
        commit('shipping')
      } else {
        if (cartItem.quantity < product.inventory) {
          commit('incrementQuantity', { id: product.id, price: product.price })
          commit('increaseTotalCartItems')
          commit('shipping')
        } else {
          commit('noStockMessage', { productName: product.name, productInventory: product.inventory })
        }
      }
    } else {
      commit('noStockMessage')
    }
  },
  removeFromCart ({ commit }, product) {
    commit('removeFromCart', { removeId: product.id, total: product.total, quantity: product.quantity })
    commit('shipping')
  },
  decreaseCartQty ({ commit }, product) {
    if (product.quantity > 1) {
      console.log(product.price)
      commit('decreaseQuantity', { id: product.id, price: product.price })
      commit('shipping')
    } else {
      commit('removeFromCart', { removeId: product.id, total: product.total, quantity: product.quantity })
      commit('shipping')
    }
  },
  applyDiscount ({ commit }, coupon) {
    db.collection('coupons').where('name', '==', coupon).get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          console.log(querySnapshot.docs[0].data().discount)
          const discountValue = querySnapshot.docs[0].data().discount
          commit('applyDiscount', discountValue)
        } else {
          console.log('coupon not there')
          commit('discountNotFound')
        }
      })
  },
  resetDiscountMessage ({ commit }) {
    commit('resetDiscountMessage')
  },
  resetStockMessage ({ commit }) {
    commit('resetStockMessage')
  },
  setShippings ({ commit }) {
    db.collection('shippings').get().then(
      querySnapshot => {
        commit('setShippings', querySnapshot)
      })
  }
}

const mutations = {
  saveItems (state, { id, name, price, inventory, original_price }) {
    state.cartItems.push({
      id,
      name,
      price,
      original_price,
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
  decreaseQuantity (state, { id, price }) {
    const cartItem = state.cartItems.find(item => item.id === id)
    cartItem.quantity--
    cartItem.total = cartItem.total - price
    state.cartTotalPrice = state.cartTotalPrice - price
    state.totalCartItems--
  },
  removeFromCart (state, { removeId, total, quantity }) {
    const removeItem = state.cartItems.find(item => item.id === removeId)
    state.cartItems.splice(removeItem, 1)
    state.totalCartItems = state.totalCartItems - quantity
    state.cartTotalPrice = state.cartTotalPrice - total
  },
  shipping (state) {
    if (state.cartTotalPrice < 50) {
      state.estShipping = 4
    } else {
      state.estShipping = 0
    }
  },
  applyDiscount (state, discountValue) {
    state.discount = discountValue
  },
  discountNotFound (state) {
    state.discountMessage = 'This is not a valid code'
  },
  resetDiscountMessage (state) {
    state.discountMessage = null
  },
  noStockMessage (state, { productName, productInventory }) {
    console.log(productName)
    state.cartMessage = {
      message: 'Sorry, there are only ' + productInventory + ' ' + productName + ' available in stock.',
      name: productName
    }
  },
  resetStockMessage (state) {
    state.cartMessage = null
  },
  setShippings (state, querySnapshot) {
    querySnapshot.forEach(doc => {
      const data = {
        'name': doc.data().name,
        'value': doc.data().value
      }
      state.shippings.push(data)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
