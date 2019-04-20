<template>
  <div class="PasswordWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="password" v-model="password">
      <button class="bot-button" @click="setPasswordValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'PasswordWidget',
    props: ['widgetData'],
    data () {return { password: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setPasswordValue () {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.password)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
