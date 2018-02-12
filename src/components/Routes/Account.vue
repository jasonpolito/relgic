<template>
  <v-content :class="isMobile ? 'white' : ''">
    <v-card flat>
      <v-subheader>General</v-subheader>
      <v-list
        two-line
        subheader
      >
        <v-list-tile
          v-for="(link, i) in mainMenu"
          :key="i"
          router
          :to="link.route"
          ripple
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ link.hint }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <!-- <v-subheader>Notification preferences</v-subheader> -->
      <v-list
        two-line
      >
        <v-list-tile
          v-for="(link, i) in secondaryMenu"
          :key="i"
          @click="link.active = !link.active"
          ripple
        >
          <!-- <v-list-tile-action>
            <v-checkbox color="primary" @click.native="link.active = !link.active" v-model="link.active"></v-checkbox>
          </v-list-tile-action> -->
          <v-list-tile-action>
            <v-icon :color="link.active ? 'primary' : 'grey lighten-1'">{{ link.active ? link.icon.on : link.icon.off }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ link.active ? link.hint.on : link.hint.off }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn @click="logout" flat>Logout</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    $_veeValidate: {
      validator: 'true'
    },
    data () {
      return {
        email: '',
        mainMenu: [
          // {hint: 'Change your Relgic profile photo', text: 'Profile photo', route: '/account/photo'},
          {hint: 'Update email and password settings', text: 'Profile', route: '/account/email'},
          {hint: 'Connect your social media accounts', text: 'Social', route: '/account/social'},
          {hint: 'Update your user role within Reglic', text: 'App', route: '/account/settings'},
          {hint: 'View a list of your past broadcasts', text: 'History', route: '/account/history'}
        ],
        secondaryMenu: [
          {
            icon: {
              on: 'notifications',
              off: 'notifications_off'
            },
            active: true,
            hint: {
              on: 'Notifcations enabled',
              off: 'Notifcations disabled'
            },
            text: 'Notifications'
          },
          {
            icon: {
              on: 'location_on',
              off: 'location_off'
            },
            active: true,
            hint: {
              on: 'Location enabled',
              off: 'Location disabled'
            },
            text: 'Location'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser'
      })
    },
    methods: {
      ...mapActions({
        logout: 'user/logout'
      })
    },
    mounted () {
      this.setPageTitle('Preferences')
      this.email = this.user.email
    }
  }
</script>

<style scoped>
.avt {
  position: relative;
  z-index: 10;
  margin-bottom: -36px;
}
</style>
