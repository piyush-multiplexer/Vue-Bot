<template>
  <div class="CalendarWidget">
    <div v-if="showWidget">
      <div class="widget-question"> Select Date & Time</div>
      <input type="datetime-local" v-model="datetime">
      <button @click.once="setDateTimeValue">Submit</button>
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
        console.log(this.datetime)
        this.$parent.sendMessage(this.datetime)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>

<style scoped>

</style>
