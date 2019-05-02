<template>
  <div class="DatePickerWidget">
    <div class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question"> Select Date</div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-date-picker class="bot-date-picker"
                         v-model="date"></v-date-picker>
        </v-flex>
        <v-flex class="m-t-20 m-b-10" xs12>
          <v-spacer></v-spacer>
          <v-btn @click.once="setDateValue" class="bot-button-round-text">Set Date</v-btn>
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
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.date = window.BotMetaData[this.widgetData.varid]
    },
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
          self.$parent.sendMessage({ value: moment(self.date).format('DD/MM/YYYY'), type: 'user_date_picker' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
