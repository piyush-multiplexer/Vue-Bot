<template>
  <div class="EmailWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card">
      <div class="widget-question">Enter Email</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-text-field class="bot-text-field" outline prepend-inner-icon="email"
                        v-model="email"></v-text-field>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" @click="setEmailValue" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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
        $(this.$el).addClass('animated bounceOutDown')
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
