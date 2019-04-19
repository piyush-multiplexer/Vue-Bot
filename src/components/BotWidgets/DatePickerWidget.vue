<template>
  <div class="DatePickerWidget">
    <div v-if="showWidget">
      <input type="date" v-model="date">
      <button class="bot-main-button" @click="setDateValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'DatePickerWidget',
    props: ['widgetData'],
    data () {return { date: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateValue () {
        console.log(this.date)
        this.$parent.sendMessage(this.date)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>

<style scoped>

</style>
