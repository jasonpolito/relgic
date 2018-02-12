import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      pageTitle: 'app/getPageTitle',
      channel: 'channel/currentChannel',
      user: 'user/getUser'
    })
  },
  methods: {
    ...mapActions({
      setPageTitle: 'app/setPageTitle'
    })
  }
}
