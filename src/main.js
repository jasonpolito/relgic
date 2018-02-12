import LogRocket from 'logrocket'
LogRocket.init('ubgimu/relgic')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'

import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'
import AppMixin from './mixins/App'
import BreakpointMixin from './mixins/Breakpoint'
import { firestore } from '@/firebase'

sync(store, router)

Vue.use(VeeValidate)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAje1RBhuLCGSoFPLqmbHu16WodBx_WCgQ',
    libraries: 'places'
  }
})
Vue.use(Vuetify, {
  theme: {
    primary: '#49599a'
  }
})
Vue.config.productionTip = false

let getPosition = (options) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

Vue.mixin(AppMixin)
Vue.mixin(BreakpointMixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('user/setUser', user)
      } else {
        this.$router.push('/')
      }
    })
    firestore.collection('channels').onSnapshot(snapshot => {
      let channels = snapshot.docs.map(doc => { return {id: doc.id, ...doc.data()} })
      this.$store.dispatch('channel/setChannels', channels)
    })
    VueGoogleMaps.loaded.then(() => {
      let geocoder = new window.google.maps.Geocoder()
      getPosition().then(pos => {
        let coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        geocoder.geocode({ 'location': coords }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              this.$store.dispatch('location/setLocation', {
                city: results[0].address_components[3].short_name,
                loaded: true,
                coords
              })
            }
          }
        })
      })
      setInterval(() => {
        getPosition().then(pos => {
          let coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          geocoder.geocode({ 'location': coords }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                this.$store.dispatch('location/setLocation', {
                  city: results[0].address_components[3].short_name,
                  loaded: true,
                  coords
                })
              }
            }
          })
        })
      }, 30000)
    }).catch(err => console.log('THE ERROR ISSSS', err))
  }
})
