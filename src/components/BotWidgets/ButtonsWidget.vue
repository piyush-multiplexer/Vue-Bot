<template>
  <div class="ButtonsWidget" style="max-height: 86vh;overflow-y: scroll;text-align: -webkit-center;">
    <div class="btn-group animated slideInUp bot-animated-card" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs6 sm6>
          <div class="widget-question">Select an Option</div>
        </v-flex>
        <v-flex xs6 sm6>
          <div @click.once="setButtonValueMultiple(true)" class="widget-skip"
               v-if="widgetData.input.args.pass && widgetData.input.args.multiple">skip
          </div>
          <div @click.once="setButtonValue({rsp_gid:widgetData.input.args.rsp_gid,val:'skipped',name:'skipped'},true)"
               class="widget-skip"
               v-else-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>


      <template v-if="widgetData.input.args.multiple">
        <template v-for="(btn,index) in widgetData.input.args.options">
          <v-btn :class="selectedButton[index]===btn.val?'bot-button':''" @click="appendButtonValue(btn,index)"
                 class="bot-button-round-text m-b-10" round>
            {{btn.val}}<span v-html="btn.href"></span>
          </v-btn>
        </template>
        <v-btn @click.once="setButtonValueMultiple(false)"
               class="bot-button-round-text m-b-10"
               round style="background-color: #2f72a7 !important;  color: #ffffff !important;">SUBMIT
        </v-btn>
      </template>
      <template v-else>
        <template v-for="(btn,index) in widgetData.input.args.options">
          <v-btn :class="selectedButton[0]===btn.val?'bot-button':''" @click.once="setButtonValue(btn,false)"
                 class="bot-button-round-text m-b-10" round>
            {{btn.val}}<span v-html="btn.href"></span>
          </v-btn>
        </template>
      </template>

    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'ButtonsWidget',
    props: ['widgetData'],
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    data () {
      return { showWidget: false, selectedButton: [] }
    },
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.selectedButton[0] = window.BotMetaData[this.widgetData.varid]
    },
    methods: {
      appendButtonValue (btn, index) {
        if (this.selectedButton[index])
          this.selectedButton[index] = ''
        else
          this.selectedButton[index] = btn.val
        this.$forceUpdate()
      },
      setButtonValueMultiple (skip) {
        let self = this
        let arr = this.selectedButton.filter(v => v != '')
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = self.widgetData.input.args.rsp_gid
          self.$parent.sendMessage(
            {
              value: skip ? 'skipped' : arr.toString(),
              metaValue: skip ? 'skipped' : arr.toString(),
              type: 'user_buttons',
            })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
      setButtonValue (btn, skip) {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = btn.rsp_gid
          self.$parent.sendMessage(
            { value: skip ? 'skipped' : btn.name, metaValue: skip ? 'skipped' : btn.name, type: 'user_buttons' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
