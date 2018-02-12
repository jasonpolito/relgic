<template>
  <v-content :class="isMobile ? 'white' : ''">
    <video ref="video" autoplay id="localVideo" :style="{display: isBroadcaster ? 'block' : 'none'}" muted :class="isBroadcaster ? 'local' : ''"></video>
    <div id="remoteVideo" :style="{display: !isBroadcaster ? 'block' : 'none'}"></div>
    <channel-loading v-if="videoLoading"></channel-loading>
    <channel-info v-else-if="connected || isBroadcaster"></channel-info>
    <channel-empty v-else></channel-empty>
  </v-content>
</template>

<script>
  import Broadcast from '@/mixins/Broadcast'
  import ChannelEmpty from '@/components/Channel/ChannelEmpty'
  import ChannelLoading from '@/components/Channel/ChannelLoading'
  import ChannelInfo from '@/components/Channel/ChannelInfo'

  export default {
    mixins: [ Broadcast ],
    components: {
      ChannelEmpty,
      ChannelInfo,
      ChannelLoading
    },
    data () {
      return {
        newBroadcastTitle: ''
      }
    },
    computed: {
      videoLoading () {
        return ['connecting', 'initializing', 'ready'].indexOf(this.channel.status) > -1 && !this.connected && !this.isBroadcaster
      }
    },
    watch: {
      channel (val) {
        if (val.broadcaster && !this.initialized) {
          return this.init()
        }
        if (val.status !== 'empty' && !this.initialized) {
          return this.init()
        }
        if (val.status === 'empty') {
          this.destroyConnection()
        }
      },
      videoSource (val) {
        this.$refs.video.srcObject = val
      }
    },
    created () {
      clearInterval(this.thumbInterval)
      clearInterval(this.peerInterval)
    },
    beforeDestroy () {
      this.destroyConnection()
      if (this.channel.broadcaster) {
        if (this.channel.broadcaster.uid === this.user.uid) {
          this.destroyBroadcast({channel: this.channel.id})
        }
      }
    }
  }
</script>

<style>
#remoteVideo video {
  display: block !important;
  width: 100vw !important;
}
video#__incoming {
  display: none !important;
}
video {
  display: block;
  width: 100vw;
}
.anim {
  transition: 2s
}
</style>
