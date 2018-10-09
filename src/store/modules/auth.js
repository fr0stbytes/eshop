import firebase from 'firebase'
import db from '../../firebase/firebaseInit'
import router from '@/router'

const state = {
  user: null,
  loginError: null,
  registerError: null,
  isAuthenticated: false
}

const getters = {

}

const actions = {
  isAuthenticated ({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection('users').where('email', '==', user.email).onSnapshot(
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const authUser = doc.data()
              commit('setUser', authUser)
              commit('isAuthenticated')
            })
          }
        )
      } else {
      }
    })
  },
  registerWithEmail ({ commit }, registerDetails) {
    return new Promise((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().createUserWithEmailAndPassword(registerDetails.email, registerDetails.password)
            .then((data) => {
              db.collection('users').add({
                email: data.user.email,
                role: 'user'
              })
                .then((docRef) => {
                  // const newUser = {
                  //   id: docRef.id,
                  //   email: registerDetails.email,
                  //   role: 'user'
                  // }
                  // commit('setUserRegister', newUser)
                })
                resolve()
            })
            .catch((error) => {
              // TODO Handle Errors here.
              commit('registerError', error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  loginWithEmail ({ commit }, loginDetails) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
        .then((data) => {
          // const newUser = {
          //   id: data.user.uid,
          //   email: data.user.email,
          //   role: data.user.role
          // }
          resolve()
        })
        .catch((error) => {
          // TODO Handle Errors here.
          commit('loginError', error)
        })
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
  socialLogin ({ commit }, provider) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          const providedEmail = result.user.email
          const providedName = result.user.displayName
          const providedPhoto = result.user.photoURL
          const providedUid = result.user.uid
          db.collection('users').where('email', '==', providedEmail).get()
            .then((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                console.log('doc exists')
              } else {
                console.log('doc not there')
                db.collection('users').add({
                  email: providedEmail,
                  name: providedName,
                  photoUrl: providedPhoto,
                  uid: providedUid,
                  role: 'user'
                })
              }
            })
            resolve()
        })
        .catch((error) => {
          console.log(error)
          commit('loginError', error)
        })
    })
  }
}

const mutations = {
  setUser (state, authUser) {
    state.user = authUser
  },
  isAuthenticated (state) {
    state.isAuthenticated = true
  },
  // setUserLogin (state, newUser, router) {
  //   state.user = newUser
  //   if (router === '/login') {
  //     router.go(-1)
  //   } else {
  //     return
  //   }
  // },
  // setUserRegister (state, newUser) {
  //   state.user = newUser
  //   router.push({ name: 'profile', params: { id: newUser.id } })
  // },
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
