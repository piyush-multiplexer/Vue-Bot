<template>
  <div class="DatePickerWidget">
    <div v-if="showWidget" class="animated slideInUp">
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
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.date)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
