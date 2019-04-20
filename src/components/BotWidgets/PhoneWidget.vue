<template>
  <div class="PhoneWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="tel" v-model="phone">
      <button class="bot-main-button" @click="setPhoneValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'PhoneWidget',
    props: ['widgetData'],
    data () {return { phone: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setPhoneValue () {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.phone)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
