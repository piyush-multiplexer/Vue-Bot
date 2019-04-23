<template>
  <div class="GEOLocationWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter.once="setPhoneValue">
      <div class="widget-question">Drag & Drop Pin to Select Location</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <google-map ref="map" :center="center" :zoom="10" style="width: 100%; height: 500px" @click="test">
            <google-marker ref="marker" v-for="(marker,index) in markers" :key="index" :position="marker.position"
                           :clickable="true"
                           :draggable="true" @click="center=marker.position"
                           @dragend="getMarkerPosition"></google-marker>
          </google-map>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" :disabled="!locationObj.address.length" @click.once="setMapValue" fab flat
                 icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'
  import NetworkCommunicator from '../../plugins/NetworkResourceHandler'

  export default {
    name: 'GEOLocationWidget',
    props: ['widgetData'],
    data () {
      return {
        center: { lat: 21.17, lng: 72.83 },
        markers: [{ position: { lat: 21.20, lng: 72.84 } }],
        locationObj: {
          'lat': '',
          'lng': '',
          'address': '',
          'type': 'geoloc',
        }, showWidget: false,
      }
    },
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.phone.focus() }, 200)
      })
    },
    methods: {
      test (map) {
        let self = this
        this.center = {
          lat: map.latLng.lat(this.$refs.map),
          lng: map.latLng.lng(this.$refs.map),
        }
        this.markers = [{ position: this.center }]
        this.getLocationFromGoogle()
      },
      getMarkerPosition (map) {
        let latLong = {
          lat: map.latLng.lat(this.$refs.marker),
          lng: map.latLng.lng(this.$refs.marker),
        }
        this.center = latLong
        this.locationObj.lat = latLong.lat
        this.locationObj.lng = latLong.lng
        this.getLocationFromGoogle()
      },
      getLocationFromGoogle () {
        let self = this
        NetworkCommunicator(`GET`,
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.center.lat},${this.center.lng}&key=AIzaSyCgG2RHYJmuCsaY0di7Jz3lEIEbsVhhWfY`).
          then(response => {
            if (response.results.length) {
              self.locationObj.address = response.results[0].formatted_address
            }
          })
      },
      setMapValue () {
        let self = this
        if (this.locationObj.address) {
          $(this.$el).addClass('animated bounceOutDown')
          setTimeout(function () {
            self.$parent.sendMessage(self.locationObj)
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 500)
        }
      },
    },
  }
</script>

<style scoped>

</style>
