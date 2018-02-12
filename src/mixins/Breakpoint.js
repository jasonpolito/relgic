const breakpoints = {
  xs: 600,
  sm: 960,
  md: 1264,
  lg: 1904
}

export default {
  data () {
    return {
      breakpoint: false,
      screenWidth: 0,
      screenHeight: 0
    }
  },
  computed: {
    isMobile () { return this.breakpoint === 'xs' }
  },
  watch: {
    screenWidth (val) {
      let stop = false
      for (const b in breakpoints) {
        if (!stop && breakpoints[b] > val) {
          this.breakpoint = b
          stop = true
        }
      }
    }
  },
  methods: {
    onResize () {
      this.screenHeight = window.innerHeight
      this.screenWidth = window.innerWidth
    }
  },
  mounted () {
    this.onResize()
  }
}
