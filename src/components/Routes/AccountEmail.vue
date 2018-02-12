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
        <v-divider></v-divider>
      </v-list>
      <v-subheader>Email settings</v-subheader>
      <v-card flat>
        <v-card-text>
          <v-text-field label="Email" v-model="email"></v-text-field>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-subheader>Password settings</v-subheader>
      <v-card flat>
        <v-btn flat color="primary" @click.stop="dialog = true">Update Password</v-btn>
        <v-dialog v-model="dialog">
          <v-card>
            <v-card-text>
              <v-text-field label="Current password"></v-text-field>
              <v-text-field label="New password"></v-text-field>
              <v-text-field label="Confirm new password"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small flat color="grey" @click.stop="dialog = false">Cancel</v-btn>
              <v-btn small flat color="primary">Update password</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
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
        dialog: false,
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
      this.setPageTitle('Account settings')
      // this.email = this.user.email.replace(/@relgic.com/g, '')
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
