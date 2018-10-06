// import firebase from 'firebase'
import db from '../../firebase/firebaseInit'

const state = {
  selectedPayment: ''
}

const getters = {

}

const actions = {
  setAddress ({ commit, rootState }, { newAddress, addressToChange }) {
    // console.log(newAddress, addressToChange)
    const user = rootState.auth.user
    db.collection('users').where('email', '==', user.email).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!user.delivery_address && !user.billing_address) {
            console.log('set both')
            db.collection('users').doc(doc.id).update({
              delivery_address: newAddress,
              billing_address: newAddress
            })
          } else {
            if (addressToChange === 'billing') {
              console.log('set billing')
              db.collection('users').doc(doc.id).update({
                billing_address: newAddress
              })
            } else {
              console.log('set shipping')
              db.collection('users').doc(doc.id).update({
                delivery_address: newAddress
              })
            }
          }
        })
      })
  },
  setSelectedPayment ({ commit }, value) {
    console.log(value)
    commit('setSelectedPayment', value)
  }
}

const mutations = {
  setSelectedPayment (state, value) {
    state.selectedPayment = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
