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
        <v-divider></v-divider>
        <template v-for="(link, i) in secondaryMenu">
          <v-list-tile
            :key="i"
            @click="setDialog(link)"
            ripple
          >
            <v-list-tile-action>
              <v-icon :color="link.active ? 'primary' : 'grey lighten-1'">{{ link.active ? 'check_circle' : 'help' }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
              <v-list-tile-sub-title v-if="link.active">{{ link.value }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          <v-text-field v-model="selectedSocial.value" :label="selectedSocial.text" v-if="selectedSocial"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" flat>Cancel</v-btn>
          <v-btn @click="setSocial(selectedSocial)" flat color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        dialog: false,
        selectedSocial: null,
        mainMenu: [
          {hint: 'Change your Relgic profile photo', text: 'Profile photo'},
          {hint: 'Update email and password settings', text: 'Account settings'}
        ],
        secondaryMenu: [
          {active: false, value: '', text: 'Facebook'},
          {active: false, value: '', text: 'Google'},
          {active: false, value: '', text: 'Snapchat'},
          {active: false, value: '', text: 'Instagram'},
          {active: false, value: '', text: 'Twitter'}
        ]
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/getUser'
      })
    },
    methods: {
      setDialog (type) {
        this.dialog = true
        this.selectedSocial = type
      },
      setSocial (type) {
        type.active = type.value.length > 0
        this.dialog = false
      }
    },
    mounted () {
      this.setPageTitle('App settings')
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
