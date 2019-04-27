<template>
  <div class="UserNameWidget">
    <div v-show="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setUserValue">
      <div class="widget-question">Enter Name</div>
      <div class="bot-text-filed-buttton-broder">
      <v-layout row wrap>
        <v-flex xs9 md10>
          <v-text-field required ref="username" class="bot-text-field" v-model="userName"></v-text-field>
        </v-flex>
        <v-flex xs3 md2 class="text-right">
          <v-btn class="bot-button-round" @click.once="setUserValue" :disabled="!userName.length" fab flat icon>
            <v-icon>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      </div>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'UserNameWidget',
    props: ['widgetData'],
    data () {return { userName: '', showWidget: false, clicked: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.username.focus() }, 200)
      })
    },
    methods: {
      setUserValue () {
        let self = this
        if (this.userName.length && !this.clicked) {
          this.clicked = true
          $(this.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
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
