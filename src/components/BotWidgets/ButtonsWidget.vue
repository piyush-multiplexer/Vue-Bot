<template>
  <div class="ButtonsWidget" style="text-align: -webkit-center;">
    <div class="btn-group animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Select from Options</div>
      <template v-for="btn in widgetData.input.args.options">
        <v-btn round class="bot-button-round-text m-b-10" @click.once="setButtonValue(btn)">{{btn.val}}<span
          v-html="btn.href"></span>
        </v-btn>
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
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    data () {
      return { showWidget: false }
    },
    methods: {
      setButtonValue (btn) {
        let self = this
        // $(this.$el).addClass('animated bounceOutDown')
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = btn.rsp_gid
          self.$parent.sendMessage(btn.val)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
