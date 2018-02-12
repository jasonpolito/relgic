<template>
  <v-container grid-list-sm>
    <v-layout justify-space-between>
      <v-flex></v-flex>
      <v-flex md6 lg3 xs12 class="pt-4">
        <v-card :flat="isMobile">
          <v-card-title>
            <h1 class="title">Be the first to Broadcast!</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="broadcastTitle"
              ref="title"
              name="title"
              :counter="30"
              @keyup.enter="submit"
              data-vv-name="title"
              :error-messages="errors.collect('title')"
              v-validate="'required|max:30'"
              label="Broadcast title"></v-text-field>
            <v-btn color="primary" block large @click="submit" :loading="loading" :disabled="loading">Broadcast Now</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data () {
      return {
        dialog: false,
        loading: false,
        broadcastTitle: ''
      }
    },
    computed: {
      ...mapGetters({
        channel: 'channel/currentChannel',
        user: 'user/getUser'
      })
    },
    methods: {
      ...mapActions({
        createBroadcast: 'channel/createBroadcast',
        setChannel: 'channel/setChannel'
      }),
      submit () {
        this.loading = true
        this.$validator.validateAll().then(valid => {
          if (valid) {
            let broadcast = {
              title: this.broadcastTitle,
              broadcaster: {
                uid: this.user.uid,
                name: this.user.email.replace(/@relgic\.com/g, '')
              }
            }
            this.createBroadcast({
              ...broadcast,
              channel: this.channel.id
            })
            this.setChannel({
              ...this.channel,
              ...broadcast
            })
            this.loading = false
          } else {
            this.$refs.title.$el.querySelector('input').focus()
            this.loading = false
          }
        })
      }
    }
  }
</script>
