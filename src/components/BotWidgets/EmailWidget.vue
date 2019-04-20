<template>
  <div class="EmailWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="email" v-model="date">
      <button class="bot-button" @click="setEmailValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'EmailWidget',
    props: ['widgetData'],
    data () {return { email: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setEmailValue () {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.email)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
