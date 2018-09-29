import firebase from 'firebase'
import db from '../../firebase/firebaseInit'
import router from '@/router'

const state = {
  user: null,
  loginError: null,
  registerError: null
}

const getters = {

}

const actions = {
  registerWithEmail ({ commit }, registerDetails) {
    console.log('reg in store')
    firebase.auth().createUserWithEmailAndPassword(registerDetails.email, registerDetails.password)
      .then((data) => {
        db.collection('users').add({
          email: data.user.email
        })
          .then((docRef) => {
            const newUser = {
              id: docRef.id,
              email: registerDetails.email
            }
            commit('setUserRegister', newUser)
          })
      })
      .catch((error) => {
        // TODO Handle Errors here.
        commit('registerError', error)
      })
  },
  loginWithEmail ({ commit }, loginDetails) {
    firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((data) => {
        const newUser = {
          id: data.user.uid,
          email: data.user.email
        }
        commit('setUserLogin', newUser)
      })
      .catch((error) => {
        // TODO Handle Errors here.
        commit('loginError', error)
      })
  },
  logout ({ commit }) {
    // TODO validate there is a user logged in
    firebase.auth().signOut()
      .then(() => {
        commit('clearUser')
      })
  },
  clearLoginError ({ commit }) {
    commit('clearLoginError')
  },
  clearRegisterError ({ commit }) {
    commit('clearRegisterError')
  },
  loginWithGoogle ({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
      // TODO FIX THIS SHIT!!!!!
      .then((result) => {
        const providedEmail = result.user.email
        db.collection('users').where('email', '==', providedEmail).get()
          .then((doc) => {
              if (doc.exists) {
                console.log('doc exists')
                const newUser = {
                  id: doc.id,
                  email: doc.data().email
                }
                commit('setUserRegister', newUser)
              } else {
                console.log('doc not there')
                db.collection('users').add({
                  email: providedEmail
                })
                  .then((docRef) => {
                    const newUser = {
                      id: docRef.id,
                      email: result.user.email
                    }
                    commit('setUserRegister', newUser)
                  })
              }
            })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const mutations = {
  setUserLogin (state, newUser) {
    state.user = newUser
    router.go(-1)
  },
  setUserRegister (state, newUser) {
    state.user = newUser
    router.push({ name: 'profile', params: { id: newUser.id } })
  },
  clearUser (state) {
    state.user = null
    router.push('/')
  },
  registerError (state, error) {
    state.registerError = error.message
  },
  clearRegisterError (state, error) {
    state.registerError = null
  },
  loginError (state, error) {
    state.loginError = error.message
  },
  clearLoginError (state, error) {
    state.loginError = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
