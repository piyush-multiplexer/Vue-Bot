<template>
  <div class="UserNameWidget">
    <div v-if="showWidget" class="animated slideInUp" @keyup.enter="setEmailValue">
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-text-field required ref="username" class="bot-text-field" outline v-model="userName"></v-text-field>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" @click="setEmailValue" :disabled="!userName.length" fab flat icon>
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
    name: 'UserNameWidget',
    props: ['widgetData'],
    data () {return { userName: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.username.focus() }, 200)
      })
    },
    methods: {
      setEmailValue () {
        let self = this
        if (this.userName.length) {
          $(this.$el).addClass('animated fadeOutDown')
          setTimeout(function () {
            self.$parent.sendMessage(self.userName)
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 500)
        }
      },
    },
  }
</script>

<style scoped>

</style>
