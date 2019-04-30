<template>
  <div class="PhoneWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setPhoneValue">
      <div class="widget-question">Enter Phone Number</div>
      <div class="bot-text-filed-buttton-broder">
      <v-layout row wrap>
        <v-flex xs9 md10>
          <v-text-field required ref="phone" class="bot-text-field-email" v-model="phone" prepend-icon="phone"
                        mask="##### #####"></v-text-field>
        </v-flex>
        <v-flex xs3 md2 class="text-right">
          <v-btn class="bot-button-round" :disabled="!(phone.length===10)" @click.once="setPhoneValue" fab flat icon>
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
          },200)
          setTimeout(function () {
            self.$parent.sendMessage(self.phone)
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
