import { mapGetters } from 'vuex'
import { firestore } from '@/firebase'

export default {
  data () {
    return {
      location: false
    }
  },
  computed: {
    ...mapGetters({
      channel: 'channel/currentChannel'
    })
  },
  methods: {
    getLocation () {
      firestore.collection('users').doc(this.channel.broadcaster.uid).get().then(user => {
        this.location = user.data().location
      })
    }
  },
  created () {
    this.getLocation()
  }
}
