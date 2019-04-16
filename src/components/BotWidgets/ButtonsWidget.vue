<template>
  <div class="ButtonsWidget">
    <div class="btn-group" v-if="showWidget">
      <template v-for="btn in widgetData.input.args.options">
        <button @click="setButtonValue(btn)">{{btn.val}}<span v-html="btn.href"></span>
        </button>
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
        Bot.rsp_gid = btn.rsp_gid
        this.$parent.sendMessage(btn.val)
      },
    },
  }
</script>
