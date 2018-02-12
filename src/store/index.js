import Vuex from 'vuex'
import Vue from 'vue'
import app from './modules/app'
import user from './modules/user'
import location from './modules/location'
import channel from './modules/channel'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageTransition: 'slide-x-transition'
  },
  modules: {
    app,
    location,
    channel,
    user
  }
})

export default store
