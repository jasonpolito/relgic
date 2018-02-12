<template>
  <v-app>
    <app-drawer></app-drawer>
    <app-toolbar></app-toolbar>
    <transition :name="pageTransition" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-snackbar bottom v-model="snackbarShow">{{ snackbarMessage }}</v-snackbar>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import AppLogo from '@/components/App/AppLogo'
  import AppToolbar from '@/components/App/AppToolbar'
  import AppDrawer from '@/components/App/AppDrawer'

  export default {
    components: {
      AppLogo,
      AppDrawer,
      AppToolbar
    },
    data () {
      return {
        pageTransition: 'slide-y-transition'
      }
    },
    computed: {
      ...mapGetters({
        getSnackbarShow: 'app/getSnackbarShow',
        snackbarMessage: 'app/getSnackbarMessage'
      }),
      snackbarShow: {
        get () {
          return this.getSnackbarShow
        },
        set (val) {
          Vue.nextTick(() => {
            this.setSnackbarShow(val)
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      this.pageTransition = 'slide-x-transition'
    },
    beforeRouteLeave (to, from, next) {
      this.pageTransition = 'slide-y-reverse-transition'
    },
    methods: {
      ...mapActions({
        setSnackbarShow: 'app/setSnackbarShow'
      })
    }
  }
</script>
