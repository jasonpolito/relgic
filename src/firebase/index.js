import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueFire)

const config = {
  apiKey: 'AIzaSyDP0YALtNl74z_x80KAS4xBrwmwriH57kk',
  authDomain: 'relgic-app.firebaseapp.com',
  databaseURL: 'https://relgic-app.firebaseio.com',
  projectId: 'relgic-app',
  storageBucket: 'relgic-app.appspot.com',
  messagingSenderId: '926741315093'
}

export const firebaseApp = firebase.initializeApp(config)
export const firestore = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export const database = firebaseApp.database()

export default firebaseApp
