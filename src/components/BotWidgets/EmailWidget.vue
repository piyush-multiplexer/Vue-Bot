<template>
  <div class="EmailWidget">
    <div @keyup.enter="setEmailValue" class="animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs10 sm10>
          <div class="widget-question">Enter Email</div>
        </v-flex>
        <v-flex xs2 sm2>
          <div @click.once="skipEmailValue" class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>


      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-text-field class="bot-text-field-email" prepend-icon="email" ref="email"
                          v-model="email"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs2>
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
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.email = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
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
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.email,metaValue: self.email, type: 'user_email' })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      }, skipEmailValue () {
        let self = this
        animateSendButton()
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 1000)
        setTimeout(function () {
          self.$parent.sendMessage({ value: 'skipped',metaValue: 'skipped', type: 'user_email' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)
      },
    },
  }
</script>

<style scoped>

</style>
