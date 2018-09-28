import db from '../../firebase/firebaseInit'

const state = {
  all: [],
  cartMessage: ''
}

// getters
const getters = {
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    db.collection('products').get().then(
      querySnapshot => {
        commit('setProducts', querySnapshot)
      })
  },
  increaseCartQty ({ commit, state }, id) {
    commit('decreaseStock', { id })
    const item = state.all.find(item => item.id === id)
    console.log(item)
    if (item.inventory >= 0) {
      commit('incrementQuantity', { id: item.id, price: item.price }, { root: true })
      commit('increaseTotalCartItems', { root: true })
    } else {
      commit('noStockMessage')
    }
  }
}

// mutations
const mutations = {
  setProducts (state, querySnapshot) {
    querySnapshot.forEach(doc => {
      const data = {
        'id': doc.id,
        'name': doc.data().name,
        'inventory': doc.data().inventory,
        'price': doc.data().price
      }
      state.all.push(data)
    })
  },
  increaseStock (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory++
  },
  decreaseStock (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },
  noStockMessage (state) {
    state.cartMessage = 'The product is running out of stock'
    console.log('out of stock')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
