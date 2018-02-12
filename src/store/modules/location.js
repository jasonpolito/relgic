import * as types from '@/store/mutation-types'
import { firestore } from '@/firebase'

const state = {
  location: true
}

const getters = {
  getLocation: state => state.location
}

const actions = {
  setLocation: ({ commit, rootState }, location) => {
    commit(types.SET_LOCATION, location)
    if (rootState.user.user) {
      firestore.collection('users').doc(rootState.user.user.uid).set({
        location: {
          city: location.city,
          coords: location.coords
        }
      })
    }
  }
}

const mutations = {
  [types.SET_LOCATION] (state, location) {
    state.location = location
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
