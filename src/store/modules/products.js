const state = {
  all: [
    {
      'id': '70-0969004',
      'title': 'Doubting Thomas',
      'price': '5,70',
      'inventory': 4
    },
    {
      'id': '75-0578415',
      'title': 'Born Reckless',
      'price': '6,91',
      'inventory': 2
    },
    {
      'id': '56-6762974',
      'title': 'Go Fish',
      'price': '6,02',
      'inventory': 7
    },
    {
      'id': '99-4505703',
      'title': 'Still Bill',
      'price': '9,18',
      'inventory': 9
    }
  ]
}

// getters
const getters = {
}

// actions
const actions = {

}

// mutations
const mutations = {
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
