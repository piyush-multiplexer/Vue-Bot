<template>
  <div class="EmailWidget">
    <div @keyup.enter="setEmailValue" class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Enter Email</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs9>
            <v-text-field class="bot-text-field-email" prepend-icon="email" ref="email"
                          v-model="email"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs3>
            <v-btn :disabled="!emailPattern.test(email)" @click.once="setEmailValue" class="bot-button-round" fab flat
                   icon>
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
    name: 'EmailWidget',
    props: ['widgetData'],
    data () {
      return {
        email: '', showWidget: false,
        clicked: false,
        emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      }
    },
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.email.focus() }, 200)
      })
    },
    methods: {
      setEmailValue () {
        let self = this
        if (this.emailPattern.test(this.email) && !this.clicked) {
          this.clicked = true
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 200)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.email, type: 'user_email' })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      },
    },
  }
</script>

<style scoped>

</style>
