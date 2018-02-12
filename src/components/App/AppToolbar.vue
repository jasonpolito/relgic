<template>
  <v-toolbar app :color="'primary'" :flat="!pageTitle.length" dark fixed v-if="pageTitle !== 'Intro'">
    <transition name="slide-y-reverse-transition" mode="out-in">
      <v-toolbar-side-icon @click="toggleDrawer" v-if="user"></v-toolbar-side-icon>
      <v-btn icon exact flat to="/sign-in" v-else><app-logo></app-logo></v-btn>
    </transition>
    <transition name="slide-y-reverse-transition" mode="out-in">
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </transition>
    <v-spacer></v-spacer>
    <transition name="slide-x-reverse-transition" mode="out-in">
      <v-btn :to="user ? '/account' : '/sign-in'" flat  v-if="$route.path !== '/account' && user" key="user" icon><v-icon>person</v-icon></v-btn>
    </transition>
    <!-- <transition name="slide-y-reverse-transition" mode="out-in">
      <v-menu v-if="user" key="user">
        <v-btn slot="activator" icon><v-icon>more_vert</v-icon></v-btn>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn to="/sign-in" flat v-else key="sinin" icon><v-icon>person</v-icon></v-btn>
    </transition> -->
  </v-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import AppLogo from '@/components/App/AppLogo'

  export default {
    components: {
      AppLogo
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser'
      })
    },
    methods: {
      ...mapActions({
        toggleDrawer: 'app/toggleDrawer',
        logout: 'user/logout'
      })
    }
  }
</script>
