import * as types from '@/store/mutation-types'

const state = {
  drawer: false,
  pageTitle: 'Relgic',
  snackbarShow: false,
  snackbarMessage: ''
}

const getters = {
  getDrawer: state => state.drawer,
  getPageTitle: state => state.pageTitle,
  getSnackbarShow: state => state.snackbarShow,
  getSnackbarMessage: state => state.snackbarMessage
}

const actions = {
  toggleDrawer: ({ commit }) => {
    commit(types.TOGGLE_DRAWER)
  },
  setPageTitle: ({ commit }, title) => {
    commit(types.SET_PAGE_TITLE, title)
  },
  setSnackbarShow: ({ commit }, val) => {
    commit(types.SET_SNACKBAR_SHOW, val)
  },
  setSnackbarMessage: ({ commit }, message) => {
    commit(types.SET_SNACKBAR_MESSAGE, message)
  },
  setDrawer: ({ commit }, val) => {
    commit(types.SET_DRAWER, val)
  }
}

const mutations = {
  [types.TOGGLE_DRAWER] (state) {
    state.drawer = !state.drawer
  },
  [types.SET_PAGE_TITLE] (state, title) {
    state.pageTitle = title
  },
  [types.SET_SNACKBAR_SHOW] (state, val) {
    state.snackbarShow = val
  },
  [types.SET_SNACKBAR_MESSAGE] (state, message) {
    state.snackbarMessage = message
  },
  [types.SET_DRAWER] (state, val) {
    state.drawer = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
