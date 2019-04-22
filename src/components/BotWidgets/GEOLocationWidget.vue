<template>
  <div class="GEOLocationWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setPhoneValue">
      <div class="widget-question"> {{widgetData.text[widgetData.text.length-1].string}}</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <google-map ref="map" :center="center" :zoom="10" style="width: 100%; height: 500px">
            <google-marker ref="marker" v-for="(marker,index) in markers" :key="index" :position="marker.position" :clickable="true"
                           :draggable="true" @click="center=marker.position"
                           @dragend="getMarkerPosition(this)"></google-marker>
          </google-map>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" :disabled="!(phone.length===10)" @click="setPhoneValue" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'GEOLocationWidget',
    props: ['widgetData'],
    data () {
      return {
        center: { lat: 21.17, lng: 72.83 },
        markers: [{ position: { lat: 21.20, lng: 72.84 } }],
        phone: '', showWidget: false,
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
      getMarkerPosition(map){
        // console.log(this.$refs.map)
        // console.log(this.$refs.marker)
        // console.log(map)
      },
      setPhoneValue () {
        let self = this
        if (this.phone && this.phone.length === 10) {
          $(this.$el).addClass('animated fadeOutDownBig')
          setTimeout(function () {
            self.$parent.sendMessage(self.phone)
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
