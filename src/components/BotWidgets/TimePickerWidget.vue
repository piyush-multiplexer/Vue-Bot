<template>
  <div class="TimePickerWidget">
    <div v-if="showWidget">
      <input type="time" v-model="time">
      <button @click="setTimeValue">Submit</button>
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
        console.log(this.time)
        this.$parent.sendMessage(this.time)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>

<style scoped>

</style>
