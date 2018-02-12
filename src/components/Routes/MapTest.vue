<template>
  <div>
    <div id="map">
      <gmap-map
        ref="map"
        :center="location.coords"
        :zoom="zoom"
        :options="mapOptions"
        style="width: 100%; height: 100%"
      ></gmap-map>
      <div id="map-pulse" class="primary"></div>
    </div>
    <v-snackbar v-model="test" :timeout="99999999999999">
      <v-spacer></v-spacer>
      <div>Jumpzone expanding in {{ timeToExpansion }}s</div>
      <v-spacer></v-spacer>
    </v-snackbar>
  </div>
</template>

<script>
  import mapStyle from '@/mapStyle'
  import { firestore } from '@/firebase'

  const countdown = 20

  export default {
    data () {
      return {
        test: true,
        location: {
          coords: {
            lat: 0,
            lng: 0
          }
        },
        zoom: 14,
        pad: 0,
        timeToExpansion: countdown,
        zoomInt: null,
        mapOptions: {
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          styles: mapStyle,
          rotateControl: false,
          gestureHandling: 'none',
          fullscreenControl: false
        }
      }
    },
    mounted () {
      this.$refs.map.$mapCreated.then(() => {
        this.zoomInt = setInterval(() => {
          this.timeToExpansion -= 1
          if (this.timeToExpansion === 0) {
            if (this.zoom > -3) {
              this.zoom -= 1
              this.timeToExpansion = countdown
            } else {
              clearInterval(this.zoomInt)
            }
          }
        }, 1000)
      })
    },
    beforeDestroy () {
      clearInterval(this.zoomInt)
    },
    created () {
      firestore.collection('users').doc(this.user.uid).get().then(user => {
        this.location = user.data().location
      })
    }
  }
</script>

<style scoped>
  @keyframes pulse {
    0% {
      opacity: .2;
      transform: scale(1)
    }
    100% {
      opacity: .1;
      transform: scale(1.4)
    }
  }
  #map {
    position: relative;
    height: 100vh;
  }
  #map-pulse {
    position: absolute;
    width: 80px;
    height: 80px;
    margin: -40px;
    top: 50%;
    left: 50%;
    border-radius: 9999px;
    opacity: .1;
    animation: pulse 1s ease alternate infinite;
  }
</style>
