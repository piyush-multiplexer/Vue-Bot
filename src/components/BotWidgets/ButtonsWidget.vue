<template>
  <div class="ButtonsWidget" style="text-align: -webkit-center;">
    <div class="btn-group animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Select an Option</div>
      <template v-if="widgetData.input.args.multiple">
        <template v-for="(btn,index) in widgetData.input.args.options">
          <v-btn :class="selectedButton[index]===btn.val?'bot-button':''" @click="appendButtonValue(btn,index)"
                 class="bot-button-round-text m-b-10" round>
            {{btn.val}}<span v-html="btn.href"></span>
          </v-btn>
        </template>
        <v-btn @click.once="setButtonValueMultiple(false)" class="bot-button-round-text m-b-10" round>SUBMIT</v-btn>
      </template>
      <template v-else>
        <template v-for="(btn,index) in widgetData.input.args.options">
          <v-btn :class="selectedButton[0]===btn.val?'bot-button':''" @click.once="setButtonValue(btn,false)"
                 class="bot-button-round-text m-b-10" round>
            {{btn.val}}<span v-html="btn.href"></span>
          </v-btn>
        </template>
      </template>
      <div @click.once="setButtonValueMultiple(true)"
           style="cursor: pointer;text-align: center;color: #00b0ff"
           v-if="widgetData.input.args.pass && widgetData.input.args.multiple">skip
      </div>
      <div @click.once="setButtonValue({rsp_gid:widgetData.input.args.rsp_gid,val:'skipped',name:'skipped'},true)"
           style="cursor: pointer;text-align: center;color: #00b0ff"
           v-else-if="widgetData.input.args.pass">skip
      </div>
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
      EventBus.$on('AFTER_BUBBLE', function () {
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
