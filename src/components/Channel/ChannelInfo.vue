<template>
  <div>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-if="channel">{{ channel.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ channel.broadcaster.name }} <span v-if="location"> — {{ location.city }}</span></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{ peers }} watching now</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <channel-map></channel-map>
  </div>
</template>

<script>
  import Broadcast from '@/mixins/Broadcast'
  import ChannelMap from '@/components/Channel/ChannelMap'
  import LocationMixin from '@/mixins/Location'

  export default {
    mixins: [
      LocationMixin,
      Broadcast
    ],
    components: {
      ChannelMap
    },
    data () {
      return {
        peers: 1
      }
    },
    watch: {
      connected (val) {
        console.log('connected', val)
        if (val) {
          console.log(this.webrtc.getPeers().length + 1)
          this.peerInterval = setInterval(() => {
            console.log(this.webrtc.getPeers().length + 1)
            this.peers = this.webrtc.getPeers().length + 1
          }, 1000)
        }
      }
    },
    mounted () {
      setInterval(() => {
        this.peers += ((Math.floor(Math.random() * 2)) * (Math.random() > 0.85 ? -1 : 1))
      }, 1000)
    }
  }
</script>
