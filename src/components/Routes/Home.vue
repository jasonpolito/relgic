<template>
  <v-content>
    <v-card>
      <v-list three-line>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Test</v-list-tile-title>
            <v-list-tile-sub-title>Test</v-list-tile-sub-title>
            <v-list-tile-sub-title>Test</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="elevation-0" dark to="/channels" color="green">Install</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>
