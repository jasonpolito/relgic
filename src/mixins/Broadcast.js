import { mapGetters, mapActions } from 'vuex'
import SimpleWebRTC from 'simplewebrtc'
import ImageCompressor from '@xkeshi/image-compressor'
import { storage } from '@/firebase'

// let webrtc = false
const imageCompressor = new ImageCompressor()

export default {
  data () {
    return {
      peerInterval: false,
      thumbInterval: false,
      webrtc: false,
      location: false,
      connected: false,
      isBroadcaster: false,
      initialized: false,
      videoSource: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      channel: 'channel/currentChannel'
    }),
    channelReady () {
      return (this.user.uid && this.channel.broadcaster && !this.initialized)
    }
  },
  methods: {
    ...mapActions({
      setChannel: 'channel/setChannel',
      createBroadcast: 'channel/createBroadcast',
      setChannelStatus: 'channel/setChannelStatus',
      setChannelThumb: 'channel/setChannelThumb',
      destroyBroadcast: 'channel/destroyBroadcast'
    }),
    destroyConnection () {
      this.connected = false
      this.initialized = false
      clearInterval(this.thumbInterval)
      if (this.webrtc) {
        console.log('%cDestroying connection...', 'color: #f4511e')
        this.webrtc.leaveRoom()
        clearInterval(this.peerInterval)
        this.webrtc = false
      }
    },
    joinBroadcast () {
      this.webrtc.on('readyToCall', session => {
        console.log('%cViewer connection ready!', 'color: #039be5')
        this.webrtc.joinRoom(this.channel.broadcaster.uid, () => {
          console.log('%cViewer connected 👍', 'color: #76ff03')
          this.webrtc.on('videoAdded', (el, peer) => {
            this.connected = true
            console.log('%cBroadcaster video received!', 'color: #fdd835')
          })
          this.webrtc.on('videoRemoved', (el, peer) => {
            this.connected = false
          })
        })
      })
    },
    startBroadcast () {
      this.webrtc.on('readyToCall', session => {
        this.setChannelStatus({ id: this.channel.id, status: 'connecting' })
        console.log('%cBroadcaster connection ready!', 'color: #039be5')
        this.webrtc.createRoom(this.user.uid, () => {
          console.log('%cBroadcaster connected 👍', 'color: #76ff03')
          this.thumbInterval = setInterval(() => {
            this.getScreenShot()
          }, 2000)
        })
      })
    },
    startConnection () {
      console.log('%cStarting connection...', 'color: #00bcd4')
      this.initialized = true
      let config = {
        autoRequestMedia: this.isBroadcaster,
        localVideoEl: 'localVideo',
        remoteVideosEl: 'remoteVideo',
        socketio: {'force new connection': true},
        debug: false,
        media: {
          // audio: this.isBroadcaster,
          audio: false,
          video: this.isBroadcaster
        }
      }
      this.webrtc = new SimpleWebRTC(config)
      if (this.isBroadcaster) {
        this.startBroadcast()
      } else {
        this.joinBroadcast()
      }
    },
    getScreenShot () {
      let vid = this.$refs.video
      if (vid) {
        let width = 56
        let height = 56 * (vid.videoHeight / vid.videoWidth)
        let canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(vid, 0, 0, width, height)
        canvas.toBlob(blob => {
          imageCompressor.compress(
            blob,
            { quality: 0.1 }
          ).then(res => {
            storage
            .ref(this.channel.id)
            .child('thumb.jpg')
            .put(res)
            .then(snapshot => {
              if (!this.connected) {
                this.connected = true
                this.setChannelStatus({ id: this.channel.id, status: 'ready' })
              }
              this.setChannelThumb({id: this.channel.id, thumb: snapshot.metadata.downloadURLs[0]})
              canvas.remove()
            })
          })
        })
      }
    },
    init () {
      console.log('init')
      if (this.channelReady) {
        this.isBroadcaster = this.user.uid === this.channel.broadcaster.uid
        this.startConnection()
        // setInterval(() => {
        //   if (!this.initialized) {
        //     this.init()
        //   }
        // }, 1500)
      }
    }
  }
}
