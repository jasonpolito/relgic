import anime from 'animejs'

export default {
  data () {
    return {}
  },
  methods: {
    animate (target) {
      anime({
        targets: target,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1200,
        delay (el, i) { return i * 100 }
        // direction: 'alternate',
        // loop: true
      })
    }
  }
}
