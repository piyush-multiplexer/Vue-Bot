<template>
  <div class="DatePickerWidget">
    <div class="animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs6 sm6>
          <div class="widget-question"> Select Date</div>
        </v-flex>
        <v-flex xs6 sm6>
          <div @click.once="setDateValue(true)" class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-date-picker class="bot-date-picker"
                         v-model="date"></v-date-picker>
        </v-flex>
        <v-flex class="m-t-20 m-b-10" xs12>
          <v-spacer></v-spacer>
          <v-btn @click.once="setDateValue(false)" class="bot-button-round-text">Set Date</v-btn>
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
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateValue (skip) {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(
            { value: skip ? 'skipped' : moment(self.date).format('DD/MM/YYYY'), metaValue: skip ? 'skipped' : moment(self.date).format('DD/MM/YYYY'), type: 'user_date_picker' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
