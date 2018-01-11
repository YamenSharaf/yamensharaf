import firebase from 'firebase'
import 'firebase/firestore'

import config from './config' // Firebase config

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp.firestore()
