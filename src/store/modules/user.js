import * as types from '@/store/mutation-types'
import { firebaseApp, firestore } from '@/firebase'
import router from '@/router'

const state = {
  user: firebaseApp.auth().currentUser
}

const getters = {
  getUser: state => state.user
}

const actions = {
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
    if (user) {
      firestore.collection('users').doc(user.uid).get().then(snapshot => {
        state.location = {
          ...snapshot.data().location,
          loaded: true
        }
      })
    }
  },
  logout: ({ commit, dispatch, rootState }) => {
    firebaseApp.auth().signOut()
    router.push('/sign-in')
    if (rootState.channel.current.broadcaster.uid === state.user.uid) {
      dispatch('channel/destroyBroadcast', { channel: rootState.channel.current.id }, { root: true })
    }
    dispatch('channel/setChannel', false, { root: true })
    commit('SET_USER', false)
  }
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
