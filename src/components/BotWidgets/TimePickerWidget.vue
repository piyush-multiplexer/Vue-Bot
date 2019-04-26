<template>
  <div class="TimePickerWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card">
      <div class="widget-question">Pick a Time</div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-time-picker class="bot-date-picker" v-model="time"></v-time-picker>
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
          self.$parent.sendMessage(moment(self.time, 'HH:mm').format('hh:mm A'))
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
