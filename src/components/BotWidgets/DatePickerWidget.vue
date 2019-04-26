<template>
  <div class="DatePickerWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card">
      <div class="widget-question"> Select Date</div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-date-picker  class="bot-date-picker"
                         v-model="date"></v-date-picker>
        </v-flex>
        <v-flex xs12 class="m-t-20 m-b-10">
          <v-spacer></v-spacer>
          <v-btn class="bot-button-round-text" @click.once="setDateValue">Set Date</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'
  import moment from 'moment'

  export default {
    name: 'DatePickerWidget',
    props: ['widgetData'],
    data () {return { date: moment().format('YYYY-MM-DD'), showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateValue () {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(moment(self.date).format('DD/MM/YYYY'))
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
