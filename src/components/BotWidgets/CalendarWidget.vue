<template>
  <div class="CalendarWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setDateTimeValue">
      <div class="widget-question"> Select Date & Time</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-datetime-picker label="Select Datetime" timePickerFormat="ampm" v-model="datetime"
                             format="DD/MM/YYYY hh:mm:ss A">
          </v-datetime-picker>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" :disabled="!datetime" @click.once="setDateTimeValue" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'
  import moment from 'moment'

  export default {
    name: 'CalendarWidget',
    props: ['widgetData'],
    data () {return { datetime: new Date(), showWidget: false, clicked: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue () {
        if (!this.clicked) {
          this.clicked = true
          this.$parent.sendMessage(moment(this.datetime).format('LLLL'))
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el)
        }
      },
    },
  }
</script>

<style scoped>

</style>
