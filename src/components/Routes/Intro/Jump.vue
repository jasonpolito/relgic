<template>
  <div id="Jump-svg">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.73 94.23"><line class="a" x1="54.43" y1="66.95" x2="55.93" y2="66.95"/><path class="b" d="M19.31,41.37H45.76a4.55,4.55,0,1,1,0,9.09l-8.93,0H9.74a8.24,8.24,0,1,0,0,16.47H52.91"/><path class="c" d="M18.92,0A14.53,14.53,0,0,0,4.39,14.53c0,8,14.53,20.42,14.53,20.42S33.45,22.56,33.45,14.53A14.53,14.53,0,0,0,18.92,0Z"/><circle class="c" cx="18.92" cy="14.53" r="7.21"/><path class="c" d="M18.92,21.74a7.21,7.21,0,1,1,7.21-7.21A7.21,7.21,0,0,1,18.92,21.74Z"/><path class="c" d="M78,39.49A22.76,22.76,0,0,0,55.21,62.25c0,12.58,22.76,32,22.76,32s22.76-19.41,22.76-32A22.76,22.76,0,0,0,78,39.49Z"/><path class="c" d="M78,73.55a11.3,11.3,0,1,1,11.29-11.3A11.3,11.3,0,0,1,78,73.55Zm11.29-11.3A11.3,11.3,0,1,0,78,73.55,11.29,11.29,0,0,0,89.26,62.25Z"/></svg>
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
      stroke-dashoffset: 6
    }
    100% {
      stroke-dashoffset: 0
    }
  }
  .b {
    stroke-dasharray: 2 4;
    animation: drip 1s linear infinite;
  }
</style>

