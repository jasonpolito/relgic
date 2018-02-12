import * as types from '@/store/mutation-types'
import { firestore } from '@/firebase'
// import router from '@/router'

const state = {
  current: false,
  all: []
}

const getters = {
  currentChannel: state => state.current,
  allChannels: state => state.all
}

const actions = {
  setChannel ({ commit }, channel) {
    commit(types.SET_CHANNEL, channel)
    if (channel) {
      firestore.collection('channels').doc(channel.id).onSnapshot(doc => {
        commit(types.SET_CHANNEL, { ...doc.data(), id: doc.id })
      })
    }
  },
  setChannelStatus ({ commit }, ch) {
    let channel = firestore.collection('channels').doc(ch.id)
    channel.update({
      status: ch.status
    })
  },
  setChannelThumb ({ commit }, ch) {
    let channel = firestore.collection('channels').doc(ch.id)
    channel.update({
      thumb: ch.thumb
    })
  },
  setChannels ({ commit }, channels) {
    commit(types.SET_CHANNELS, channels)
  },
  createBroadcast ({ commit }, broadcast) {
    commit(types.CREATE_BROADCAST, broadcast)
  },
  destroyBroadcast ({ commit, dispatch }, broadcast) {
    commit(types.DESTROY_BROADCAST, broadcast)
    dispatch('setChannel', false)
  }
}

const mutations = {
  [types.SET_CHANNEL] (state, channel) {
    state.current = channel
  },
  [types.SET_CHANNELS] (state, channels) {
    state.all = channels
  },
  [types.CREATE_BROADCAST] (state, broadcast) {
    let channel = firestore.collection('channels').doc(broadcast.channel)
    channel.update({
      broadcaster: broadcast.broadcaster,
      title: broadcast.title,
      status: 'initializing'
    })
  },
  [types.DESTROY_BROADCAST] (state, broadcast) {
    let channel = firestore.collection('channels').doc(broadcast.channel)
    channel.update({
      broadcaster: false,
      title: '',
      status: 'empty'
    })
    channel.get().then(doc => {
      state.channel = {...doc.data(), id: doc.id}
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
