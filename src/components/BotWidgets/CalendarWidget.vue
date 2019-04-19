<template>
  <div class="CalendarWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="datetime-local" v-model="datetime">
      <button @click="setDateTimeValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'CalendarWidget',
    props: ['widgetData'],
    data () {return { datetime: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue () {
        let self = this
        $(this.$el).addClass('animated slideInDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.datetime)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
