<template>
  <v-content class="anim intro" :style="{backgroundColor: activeBg}">
    <v-tabs v-model="activeTab" @input="test">
      <v-tabs-items :cycle="true">
        <v-tabs-content
          v-for="(tab, i) in tabs"
          :key="tab"
          :id="tab"
        >
        <div class="title-text">
          <h1 class="title">{{ titles[tab] }}</h1>
        </div>
        </v-card>
          <div class="svg">
            <component :is="tab" :ref="tab + 'Component'"></component>
          </div>
          <div class="text-xs-center">
            <v-btn
              @click="nextTab"
              color="white"
              large
              flat
              v-if="i < tabs.length - 1"
            >Next</v-btn>
            <v-btn
              to="/create-account"
              color="white"
              large
              flat
              v-else
            >Get Started</v-btn>
          </div>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-content>
</template>

<script>
  import What from '@/components/Routes/Intro/What'
  import World from '@/components/Routes/Intro/World'
  import How from '@/components/Routes/Intro/How'
  import Jump from '@/components/Routes/Intro/Jump'
  import Likes from '@/components/Routes/Intro/Likes'
  import First from '@/components/Routes/Intro/First'
  import InZone from '@/components/Routes/Intro/InZone'
  import Share from '@/components/Routes/Intro/Share'

  const bgs = [
    '#49599a', // primary
    '#49599a', // primary
    '#43a047', // green
    '#1e88e5', // blue
    '#f4511e', // orange
    '#43a047', // green
    '#49599a', // primary
    '#43a047', // green
    '#1e88e5' // blue
  ]

  export default {
    data () {
      return {
        activeTab: 'First',
        tabs: [
          'First',
          'What',
          'World',
          'InZone',
          'How',
          'Likes',
          'Jump',
          'Share'
        ],
        titles: {
          First: 'Welcome to Relgic!',
          What: 'The realtime streaming game.',
          World: 'Broadcast across the globe.',
          InZone: 'Stream inside the \'Jumpzone\'',
          Jump: 'The \'Jumpzone\' expands over time.',
          How: 'The countdown starts immediately!',
          Likes: 'Likes increase your time limit.',
          Share: 'Recruit friends to earn points!'
        }
      }
    },
    components: {
      First,
      What,
      World,
      InZone,
      Likes,
      Jump,
      How,
      Share
    },
    computed: {
      activeTabIndex () {
        return this.tabs.indexOf(this.activeTab)
      },
      activeBg () {
        return bgs[this.activeTabIndex]
      }
    },
    methods: {
      nextTab () {
        let curr = this.tabs.indexOf(this.activeTab)
        this.activeTab = this.tabs[(curr + 1) % this.tabs.length]
      },
      test (a, b, c) {
        this.$refs[a + 'Component'][0].animate(
          '#' + a + '-svg path, ' +
          '#' + a + '-svg line, ' +
          '#' + a + '-svg polyline, ' +
          '#' + a + '-svg rect, ' +
          '#' + a + '-svg circle '
        )
      }
    },
    created () {
      this.setPageTitle('Intro')
      // setInterval(() => {
      //   this.nextTab()
      // }, 1000)
    }
  }
</script>

<style>
.intro svg {
  width: 50%;
  margin: 0 auto;
  max-width: 300px;
  overflow: visible;
}
.intro svg * {
  stroke: white;
  stroke-width: 1;
  stroke-linecap: round;
  fill: none;
}
.intro svg polyline {
  stroke-linecap: butt;
}
.intro {
  color: white;
}
.anim {
  transition: all .2s ease;
}
.svg {
  position: relative;
  height: 50vh;
}
.svg > * svg + svg * {
  stroke-width: 5;
  stroke: rgba(255,255,255,.1);
}
.svg > * svg + svg {
  position: absolute;
  top: 0;
  transform: translateX(-100%);
}
.svg > * {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%)
}
.title-text {
  padding: 15vh 20px 0 20px;
  height: 20vh;
  text-align: center;
}
</style>

