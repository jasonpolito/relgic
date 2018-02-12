<template>
  <v-content class="white pt-2">
    <template v-for="(ch, i) in channels">
      <v-container grid-list-lg :key="i" @click="goToChannel(ch)" class="pt-2 pb-2">
        <v-layout align-center>
          <v-flex>
            <div style="position: relative">
              <div v-if="ch.status === 'ready'" class="broadcast-live"></div>
              <v-avatar class="elevation-2"><img :src="ch.thumb" v-if="ch.thumb"></v-avatar>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-list two-line>
              <v-list-tile-title>{{ ch.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ channelStatus(ch) }}</v-list-tile-sub-title>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    <v-container grid-list-lg @click="goToMap" class="pt-2 pb-2">
      <v-layout align-center>
        <v-flex>
          <div style="position: relative">
            <v-avatar class="elevation-2"></v-avatar>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-list two-line>
            <v-list-tile-title>Jump Zone Test</v-list-tile-title>
            <v-list-tile-sub-title>Demo of jump zone expansion</v-list-tile-sub-title>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        channels: 'channel/allChannels'
      })
    },
    methods: {
      ...mapActions({
        setChannel: 'channel/setChannel'
      }),
      channelStatus (channel) {
        let map = {
          'empty': 'Empty, be the first to broadcast!',
          'initializing': channel.broadcaster.name + ' is getting ready to broadcast!',
          'connecting': 'Broadcast starting!',
          'ready': 'Broadcasting now!'
        }
        return map[channel.status]
      },
      goToChannel (channel) {
        this.setChannel(channel)
        this.$router.push('/ch/' + channel.name)
      },
      goToMap () {
        this.$router.push('/map')
      }
    },
    mounted () {
      this.setPageTitle('Channels')
      this.setChannel(false)
    }
  }
</script>

<style scoped lang="stylus">
$width = 4px

@keyframes pulse {
  from {
    background: lighten(red, 0)
  }
  to {
    background: lighten(red, 40)
  }
}

.broadcast-live
  position: absolute
  border-radius: 999px
  left: 50%
  width: $width
  height: $width
  bottom: ($width / 2 + 4)
  margin-left: ($width / -2)
  background: none
  box-shadow: 0 0 0 2px white
  animation: pulse .5s alternate infinite
</style>
