<template>
  <div class="CustomTextWidget">
    <div @keyup.enter="setTextValue" class="animated slideInUp bot-animated-card" v-show="showWidget">

      <v-layout row wrap>
        <v-flex xs6 sm6>
          <div class="widget-question">
            {{widgetData.text.length?widgetData.text[widgetData.text.length-1].string:'Enter Value'}}
          </div>
        </v-flex>
        <v-flex xs6 sm6>
          <div @click.once="skipTextValue" class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>


      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-text-field class="bot-text-field" ref="text" required v-model="text"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs2>
            <v-btn :disabled="!text.trim().length" @click.once="setTextValue" class="bot-button-round" fab flat icon>
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
    name: 'CustomTextWidget',
    props: ['widgetData'],
    data () {return { text: '', showWidget: false, clicked: false }},
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.text = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.text.focus() }, 200)
      })
    },
    methods: {
      setTextValue () {
        let self = this
        if (this.text.length && !this.clicked) {
          this.clicked = true
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ type: 'user_custom_text', value: self.text , metaValue: self.text })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      }, skipTextValue () {
        let self = this
        animateSendButton()
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 1000)
        setTimeout(function () {
          self.$parent.sendMessage({ type: 'user_custom_text', value: 'skipped', metaValue: 'skipped' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)

      },
    },
  }
</script>

<style scoped>

</style>
