<template>
  <div class="TimePickerWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <v-layout row wrap>
        <v-flex xs12>
          <v-time-picker header-color="#f6283c" @input="setTimeValue" v-model="time"></v-time-picker>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'TimePickerWidget',
    props: ['widgetData'],
    data () {return { time: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setTimeValue () {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.time)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
