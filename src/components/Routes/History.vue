<template>
  <v-content>
    <v-card flat>
      <v-list
        two-line
        subheader
      >
        <v-list-tile
          to="/account"
          ripple
        >
          <v-list-tile-action>
            <v-icon>chevron_left</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Preferences</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="(channel, i) in channels">
          <v-divider :key="i"></v-divider>
          <v-list-tile :key="i">
            <v-list-tile-content>
              <v-list-tile-title>{{ channel.name }}</v-list-tile-title>
              <v-list-tile-sub-title>2 days ago</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-content>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    $_veeValidate: {
      validator: 'true'
    },
    data () {
      return {
        email: '',
        mainMenu: [
          {hint: 'Change your Relgic profile photo', text: 'Profile photo'},
          {hint: 'Update email and password settings', text: 'Account settings'}
        ],
        secondaryMenu: [
          {active: false, hint: 'Broadcast video & audio', text: 'Caster'},
          {active: false, hint: 'Vote on broadcasts', text: 'Voter'},
          {active: false, hint: 'Watch broadcasts', text: 'Watcher'}
        ]
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser',
        channels: 'channel/allChannels'
      })
    },
    mounted () {
      this.setPageTitle('History')
    }
  }
</script>
