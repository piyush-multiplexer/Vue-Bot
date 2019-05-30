<template>
  <div class="CalendarWidget">
    <div @keyup.enter="setDateTimeValue" class="animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs6 sm6>
          <div class="widget-question"> Select Date & Time</div>
        </v-flex>
        <v-flex xs6 sm6>
          <div @click.once="setDateTimeValue(true)" class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex md10 xs10>
          <v-datetime-picker format="DD/MM/YYYY hh:mm:ss A" label="Select Datetime" timePickerFormat="ampm"
                             v-model="datetime">
          </v-datetime-picker>
        </v-flex>
        <v-flex class="text-center" md2 xs2>
          <v-btn :disabled="!datetime" @click.once="setDateTimeValue(false)" class="bot-button-round" fab flat icon>
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
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.datetime = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue (skip) {
        if (!this.clicked) {
          this.clicked = true
          this.$parent.sendMessage(
            { value: skip ? 'skipped' : moment(this.datetime).format('LLLL'),metaValue: skip ? 'skipped' : moment(this.datetime).format('LLLL'), type: 'user_calendar_picker' })
          this.$destroy()
          this.$el.parentNode.removeChild(this.$el)
        }
      },
    },
  }
</script>

<style scoped>

</style>
