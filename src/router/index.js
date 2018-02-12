import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
// import Home from '@/components/Routes/Home'
import ChannelView from '@/components/Routes/ChannelView'
import ChannelList from '@/components/Routes/ChannelList'
import SignIn from '@/components/Routes/SignIn'
import Intro from '@/components/Routes/Intro'
import Account from '@/components/Routes/Account'
import AccountSettings from '@/components/Routes/AccountSettings'
import AccountHistory from '@/components/Routes/History'
import AccountPhoto from '@/components/Routes/AccountPhoto'
import AccountEmail from '@/components/Routes/AccountEmail'
import AccountSocial from '@/components/Routes/AccountSocial'
import CreateAccount from '@/components/Routes/CreateAccount'
import MapTest from '@/components/Routes/MapTest'

Vue.use(Router)

export const routes = [
  {
    meta: { auth: false },
    path: '/',
    name: 'Intro',
    component: Intro
  },
  {
    meta: { auth: false },
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn
  },
  {
    path: '/create-account',
    name: 'Create Account',
    component: CreateAccount
  },
  {
    meta: {auth: true},
    path: '/channels',
    name: 'Channels',
    component: ChannelList
  },
  {
    meta: {auth: true},
    path: '/map',
    name: 'MapTest',
    component: MapTest
  },
  {
    meta: {auth: true},
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    meta: {auth: true},
    path: '/account/settings',
    name: 'Account Settings',
    component: AccountSettings
  },
  {
    meta: {auth: true},
    path: '/account/history',
    name: 'Account History',
    component: AccountHistory
  },
  {
    meta: {auth: true},
    path: '/account/social',
    name: 'Account Social',
    component: AccountSocial
  },
  {
    meta: {auth: true},
    path: '/account/email',
    name: 'Account settings',
    component: AccountEmail
  },
  {
    meta: {auth: true},
    path: '/account/photo',
    name: 'Profile Photo',
    component: AccountPhoto
  },
  {
    meta: {auth: true},
    path: '/ch/:channel',
    // name: '',
    component: ChannelView
  }
]

const router = new Router({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   let user = store.getters['user/getUser']
//   if (user !== null) {
//     return next()
//   }
//   return next('/')
// })

export default router
