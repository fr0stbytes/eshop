import db from '../../firebase/firebaseInit'

const state = {
  all: [],
  shippings: []
}

// getters
const getters = {
  allShippings (state) {
    return state.shippings.sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0))
  }
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    db.collection('products').get().then(
      querySnapshot => {
        commit('setProducts', querySnapshot)
      })
  },
  getShippings ({ commit }) {
    db.collection('shippings').get().then(
      querySnapshot => {
        commit('setShippings', querySnapshot)
      })
  }
  // increaseCartQty ({ commit, state }, id) {
  //   commit('decreaseStock', { id })
  //   const item = state.all.find(item => item.id === id)
  //   if (item.inventory > 0) {
  //     commit('incrementQuantity', { id: item.id, price: item.price }, { root: true })
  //     commit('increaseTotalCartItems', { root: true })
  //   } else {
  //     commit('noStockMessage', { productName: item.name })
  //   }
  // }
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
  setShippings (state, querySnapshot) {
    querySnapshot.forEach(doc => {
      const data = {
        'name': doc.data().name,
        'value': doc.data().value
      }
      state.shippings.push(data)
    })
  },
  increaseStock (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory++
  },
  decreaseStock (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
