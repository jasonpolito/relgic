<template>
  <div id="map" v-if="location">
    <gmap-map
      :center="location.coords"
      :zoom="14"
      :options="mapOptions"
      style="width: 100%; height: 200px"
    ></gmap-map>
    <div id="map-pulse" class="primary"></div>
  </div>
</template>

<script>
  import mapStyle from '@/mapStyle'
  import LocationMixin from '@/mixins/Location'

  export default {
    mixins: [ LocationMixin ],
    data () {
      return {
        location: false,
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
