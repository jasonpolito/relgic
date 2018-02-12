<template>
  <div id="How-svg" style="width: 80%; left: 10%">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.06 130"><path class="a" d="M22.18,115.33c0.75-9.76,6.86-18.63,16.67-24l0.31-.18A29.05,29.05,0,0,0,44.53,87a29,29,0,0,0,5.37,4.16l0.3,0.17c9.81,5.39,15.92,14.25,16.67,24"/><path class="a" d="M73.72,40.18a143.33,143.33,0,0,1-15,4.1L58,44.46a101.91,101.91,0,0,0-13.41,4.16,102.36,102.36,0,0,0-13.42-4.16l-0.75-.17a141,141,0,0,1-15.71-4.35"/><path class="a" d="M87.06,15.15H2V2H87.06V15.15Z"/><path class="a" d="M2,114.85H87.06V128H2V114.85"/><path class="a" d="M2,22.58v84.85"/><path class="a" d="M87.06,22.26v84.85"/><path class="a" d="M74,115.65V78.23L48.37,64.84,74,51.45V22.26"/><path class="a" d="M15.08,22.26V51.45L40.69,64.84,15.08,78.23v37.42"/><line class="b" x1="44.53" y1="87.32" x2="44.53" y2="70.87"/></svg>
  </div>
</template>

<script>
  import Intro from '@/mixins/Intro'

  export default {
    mixins: [ Intro ],
    data () {
      return {}
    }
  }
</script>

<style scoped>
  @keyframes drip {
    0% {
      stroke-dashoffset: 0
    }
    100% {
      stroke-dashoffset: 6
    }
  }
  .b {
    stroke-dasharray: 2 4;
    animation: drip 1s linear infinite;
  }
</style>

