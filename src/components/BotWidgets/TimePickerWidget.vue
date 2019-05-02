<template>
  <div class="TimePickerWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card">
      <div class="widget-question">Pick a Time</div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-time-picker class="bot-time-picker" v-model="time"></v-time-picker>
        </v-flex>
        <v-flex xs12 class="m-t-20 m-b-10">
          <v-spacer></v-spacer>
          <v-btn class="bot-button-round-text" @click.once="setTimeValue">Set Date</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'
  import moment from 'moment'

  export default {
    name: 'TimePickerWidget',
    props: ['widgetData'],
    data () {return { time: new Date(), showWidget: false }},
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.time = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setTimeValue () {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          self.$parent.sendMessage({value:moment(self.time, 'HH:mm').format('hh:mm A'),type:'user_time_picker'})
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
