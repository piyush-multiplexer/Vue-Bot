<template>
  <div class="GEOLocationWidget">
    <div @keyup.enter="setMapValue" class="animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs12 sm12>
          <div class="widget-question" style="padding-left: 4% !important;">Drag & Drop Pin to Select Location</div>
        </v-flex>
      </v-layout>


      <v-layout row wrap>
        <v-flex xs12>
          <google-map :center="center" :zoom="10" @click="changeMarker" ref="map"
                      style="width: 100%; height: 300px; margin-bottom: 10px">
            <google-marker :clickable="true" :draggable="true" :key="index" :position="marker.position"
                           @click="center=marker.position"
                           @dragend="getMarkerPosition" ref="marker"
                           v-for="(marker,index) in markers"></google-marker>
          </google-map>
        </v-flex>
        <v-flex class="text-left" md10 xs10>
          <div class="bot-location-center">
            <div class="bot-map-address">
              {{locationObj.address}}
            </div>
          </div>
        </v-flex>
        <v-flex class="text-center" md2 xs2>
          <div class="bot-location-button-center">
            <div class="bot-location-subbutton-center">
              <v-btn :disabled="!locationObj.address.length" @click.once="setMapValue"
                     class="bot-button-round" fab flat
                     icon>
                <v-icon>send</v-icon>
              </v-btn>
            </div>
          </div>
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
        // center: {},
        center: { lat: 21.17, lng: 72.83 },
        // markers: [{ position: { lat: 21.20, lng: 72.84 } }],
        markers: [],
        locationObj: {
          'lat': '',
          'lng': '',
          'address': '',
          'type': 'geoloc',
        }, showWidget: false,
        clicked: false,
      }
    },
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.locationObj = JSON.parse(window.BotMetaData[this.widgetData.varid])
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
        self.detectLocation()
      })
    },
    methods: {
      detectLocation () {
        let self = this

        function geoSuccess (position) {
          self.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          self.locationObj.lat = position.coords.latitude
          self.locationObj.lng = position.coords.longitude
          self.markers = [{ position: self.center }]
          self.$forceUpdate()
          self.getLocationFromGoogle()
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(geoSuccess)
        }
      },
      changeMarker (map) {
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
        if (this.locationObj.address && !this.clicked) {
          this.clicked = true
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.locationObj, metaValue: self.locationObj.address, type: 'user_location' })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      },
    },
  }
</script>

<style scoped>

</style>
