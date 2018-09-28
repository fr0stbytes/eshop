import firebase from 'firebase'

const state = {
  user: ''
}

const getters = {

}

const actions = {
  loginWithEmail ({ commit }, loginDetails) {
    console.log(loginDetails)
    firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((data) => {
        const newUser = {
          id: data.user.uid,
          email: data.user.email
        }
        commit('setUser', newUser)
      })
      .catch((error) => {
        // TODO Handle Errors here.
        console.log(error)
      })
  },
  logout ({ commit }) {
    // TODO validate there is a user logged in
    firebase.auth().signOut()
    .then(() => {
      commit('clearUser')
    })
  }
}

const mutations = {
  setUser (state, newUser) {
    state.user = newUser
  },
  clearUser (state) {
    state.user = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
