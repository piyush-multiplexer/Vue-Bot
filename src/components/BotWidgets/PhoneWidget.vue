<template>
  <div class="PhoneWidget">
    <div @keyup.enter="setPhoneValue" class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Enter Phone Number</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs9>
            <v-text-field class="bot-text-field-email" mask="##### #####" prepend-icon="phone" ref="phone" required
                          v-model="phone"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs3>
            <v-btn :disabled="!(phone.length===10)" @click.once="setPhoneValue" class="bot-button-round" fab flat icon>
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
    name: 'PhoneWidget',
    props: ['widgetData'],
    data () {return { phone: '', showWidget: false, clicked: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.phone.focus() }, 200)
      })
    },
    methods: {
      setPhoneValue () {
        let self = this
        if (this.phone && this.phone.length === 10 && !this.clicked) {
          this.clicked = true
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 200)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.phone, type: 'user_phone' })
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
