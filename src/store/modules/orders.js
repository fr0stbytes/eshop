// import firebase from 'firebase'
import db from '../../firebase/firebaseInit'

const state = {
  deliveryAddress: null,
  billingAddress: null
}

const getters = {

}

const actions = {
  setDeliveryAddress ({ commit, rootState }, address) {
    const orderEmail = rootState.auth.user.email
    console.log(address, orderEmail)
    db.collection('users').where('email', '==', orderEmail).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            delivery_address: address,
            billing_address: address
          })
        })
        commit('setDeliveryAddress', address)
        commit('setBillingAddress', address)
      })
  },
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
            // commit('setDeliveryAddress', newAddress)
            // commit('setBillingAddress', newAddress)
          } else {
            if (addressToChange === 'billing') {
              console.log('set billing')
              db.collection('users').doc(doc.id).update({
                billing_address: newAddress
              })
              // commit('setBillingAddress', newAddress)
            } else {
              console.log('set shipping')
              db.collection('users').doc(doc.id).update({
                delivery_address: newAddress
              })
              // commit('setDeliveryAddress', newAddress)
            }
          }
        })
      })
  }
}

const mutations = {
  setDeliveryAddress (state, newAddress) {
    state.user.delivery_address = newAddress
  },
  setBillingAddress (state, newAddress) {
    state.user.billing_address = newAddress
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
