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
            <!-- <v-list-tile-sub-title>{{ link.hint }}</v-list-tile-sub-title> -->
          </v-list-tile-content>
        </v-list-tile>
        <template v-for="(link, i) in secondaryMenu">
          <v-divider :key="i"></v-divider>
          <v-list-tile
            :key="i"
            @click="link.active = !link.active"
            ripple
          >
            <v-list-tile-action>
              <v-checkbox color="primary" @click.native="link.active = !link.active" v-model="link.active"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ link.hint }}</v-list-tile-sub-title>
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
        user: 'user/getUser'
      })
    },
    mounted () {
      this.setPageTitle('Profile photo')
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
