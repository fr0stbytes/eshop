import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true,
})

export default db
