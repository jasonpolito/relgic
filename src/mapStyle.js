import tinycolor from 'tinycolor2'
const primary = '#49599a'
const setLightness = (color1, color2) => {
  let color1HSL = tinycolor(color1).toHsl()
  let color2HSL = tinycolor(color2).toHsl()
  return tinycolor({h: color1HSL.h, s: color1HSL.s, l: color2HSL.l}).toHexString()
}

export default [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#f5f5f5')
      }
    ]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#616161')
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': setLightness(primary, '#f5f5f5')
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#bdbdbd')
      }
    ]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.neighborhood',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.neighborhood',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.neighborhood',
    'elementType': 'labels.text',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#eeeeee')
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#757575')
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#e5e5e5')
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#9e9e9e')
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#ffffff')
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#757575')
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#dadada')
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#616161')
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#9e9e9e')
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#e5e5e5')
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#eeeeee')
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': setLightness(primary, '#c9c9c9')
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': setLightness(primary, '#9e9e9e')
      }
    ]
  }
]
