<template>
  <v-navigation-drawer v-model="drawer" app fixed temporary :width="180">
    <div class="text-xs-center" style="padding-top: 24px; padding-bottom: 0;">
      <app-logo px="44" clr="#49599a"></app-logo>
    </div>
    <v-list>
      <v-list-tile router to="/" exact ripple>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile router to="/channels" exact ripple>
        <v-list-tile-content>
          <v-list-tile-title>Channels</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile router to="/account" ripple>
        <v-list-tile-content>
          <v-list-tile-title>Preferences</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { routes } from '@/router'
  import AppLogo from '@/components/App/AppLogo'

  export default {
    components: {
      AppLogo
    },
    data () {
      return {
        routes
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser'
      }),
      drawer: {
        get () {
          return this.$store.getters['app/getDrawer']
        },
        set (val) {
          Vue.nextTick(() => {
            this.$store.dispatch('app/setDrawer', val)
          })
        }
      }
    }
  }
</script>
