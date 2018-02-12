<template>
  <div class="preview--wrap primary">
    <img :src="channel.thumb" class="preview">
    <div class="v-center">
      <v-progress-circular indeterminate color="white"></v-progress-circular>
      <br>
      <h3 class="title white--text pt-4">{{ message }}...</h3>
    </div>
  </div>
</template>

<script>
  import Broadcast from '@/mixins/Broadcast'

  const messages = [
    'Baking cookies',
    'Brushing teeth',
    'Folding laundry',
    'Writing poems',
    'Singing love songs',
    'Doing the dishes',
    'Polishing shoes',
    'Reading mystery novels',
    'Washing hands',
    'Walking dogs',
    'Making snow angels',
    'Checking weather',
    'Sifting flour',
    'Cracking eggs'
  ]

  export default {
    mixins: [ Broadcast ],
    data () {
      return {
        int: false,
        message: ''
      }
    },
    created () {
      this.message = messages[Math.floor(Math.random() * messages.length)]
      this.int = setInterval(() => {
        this.message = messages[Math.floor(Math.random() * messages.length)]
      }, 700)
    },
    beforeDestroy () {
      clearInterval(this.int)
    }
  }
</script>

<style scoped>
  .preview--wrap {
    overflow: hidden;
    height: 100vh;
  }
  .preview {
    transform: scale(1.1);
    min-height: 100vh;
    min-width: 100%;
    opacity: .6;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    filter: blur(10px) grayscale(100);
  }
  .v-center {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    transform: translate3d(0, -50%, 1px)
  }
</style>
