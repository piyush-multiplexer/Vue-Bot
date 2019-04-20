<template>
  <div class="PasswordWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-text-field class="bot-text-field" outline v-model="password" mask="##### #####"></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-btn class="bot-button" @click="setPasswordValue" fab flat icon>
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
