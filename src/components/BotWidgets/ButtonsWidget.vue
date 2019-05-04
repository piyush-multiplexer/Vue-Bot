<template>
  <div class="ButtonsWidget" style="text-align: -webkit-center;">
    <div class="btn-group animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Select an Option</div>
      <template v-for="btn in widgetData.input.args.options">
        <v-btn :class="selectedButton===btn.val?'bot-button':''" @click.once="setButtonValue(btn,false)"
               class="bot-button-round-text m-b-10" round>
          {{btn.val}}<span v-html="btn.href"></span>
        </v-btn>
      </template>
      <span @click.once="setButtonValue({rsp_gid:widgetData.input.args.rsp_gid,val:'skipped',name:'skipped'},true)"
            style="cursor: pointer;text-align: right;color: #00b0ff"
            v-if="widgetData.input.args.pass">skip
      </span>
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
      return { showWidget: false, selectedButton: '' }
    },
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.selectedButton = window.BotMetaData[this.widgetData.varid]
    },
    methods: {
      setButtonValue (btn, skip) {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = btn.rsp_gid
          self.$parent.sendMessage({ value: skip ? 'skipped' : btn.name, type: 'user_buttons' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
