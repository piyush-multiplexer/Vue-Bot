<template>
  <div class="PasswordWidget">
    <div @keyup.enter="setPasswordValue" class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Enter Password</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs9>
            <v-text-field class="bot-text-field-password" prepend-inner-icon="vpn_key" ref="password" required
                          type="password"
                          v-model="password"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs3>
            <v-btn :disabled="!password.length" @click.once="setPasswordValue" class="bot-button-round" fab flat icon>
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
    name: 'PasswordWidget',
    props: ['widgetData'],
    data () {return { password: '', showWidget: false, clicked: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.password.focus() }, 200)
      })
    },
    methods: {
      setPasswordValue () {
        let self = this
        if (this.password.length && !this.clicked) {
          this.clicked = true
          $('.bot-button-round').addClass('animated rollOut')
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 200)
          setTimeout(function () {
            self.$parent.sendMessage(self.password)
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
