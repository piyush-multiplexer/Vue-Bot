<template>
  <div class="UserNameWidget">
    <div @keyup.enter="setUserValue" class="animated slideInUp bot-animated-card" v-show="showWidget">
      <div class="widget-question">Enter Name</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-text-field class="bot-text-field" ref="username" required v-model="userName"></v-text-field>
          </v-flex>
          <v-flex class="text-right" md2 xs2>
            <v-btn :disabled="!userName.length" @click.once="setUserValue" class="bot-button-round" fab flat icon>
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <div @click.once="skipUserValue" style="cursor: pointer;text-align: center;color: #00b0ff"
             v-if="widgetData.input.args.pass">skip
        </div>
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
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.userName = window.BotMetaData[this.widgetData.varid]
    },
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
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ type: 'user_name', value: self.userName, metaValue: self.userName })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      }, skipUserValue () {
        let self = this
        animateSendButton()
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 1000)
        setTimeout(function () {
          self.$parent.sendMessage({ type: 'user_name', value: 'skipped', metaValue: 'skipped' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)
      },
    },
  }
</script>

<style scoped>

</style>
