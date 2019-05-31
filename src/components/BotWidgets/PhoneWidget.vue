<template>
  <div class="PhoneWidget">
    <div @keyup.enter="setPhoneValue" class="animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs10 sm10>
          <div class="widget-question">Enter Phone Number</div>
        </v-flex>
        <v-flex xs2 sm2>
          <div @click.once="skipPhoneValue" class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>

      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-text-field class="bot-text-field-email" mask="##### #####" prepend-icon="phone" ref="phone" required
                          type="tel"
                          v-model="phone"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs2>
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
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.phone = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
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
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.phone, metaValue: self.phone, type: 'user_phone' })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      }, skipPhoneValue () {
        let self = this
        animateSendButton()
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 1000)
        setTimeout(function () {
          self.$parent.sendMessage({ value: 'skipped',metaValue: 'skipped', type: 'user_phone' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)
      },
    },
  }
</script>

<style scoped>

</style>
