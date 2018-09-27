const state = {
  all: [
    {
      'id': '70-0969004',
      'title': 'Doubting Thomas',
      'price': 5.5,
      'inventory': 4
    },
    {
      'id': '75-0578415',
      'title': 'Born Reckless',
      'price': 6.7,
      'inventory': 2
    },
    {
      'id': '56-6762974',
      'title': 'Go Fish',
      'price': 6.1,
      'inventory': 7
    },
    {
      'id': '99-4505703',
      'title': 'Still Bill',
      'price': 9.3,
      'inventory': 9
    }
  ],
  cartMessage: ''
}

// getters
const getters = {
}

// actions
const actions = {
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
