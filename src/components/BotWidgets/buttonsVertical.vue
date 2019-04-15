<template>
  <div class="buttonsVertical">
    <div class="btn-group" v-if="showWidget">
      <template v-for="btn in widgetData.input.args.options">
        <button @click="setButtonValue(btn)">{{btn.val}}</button>
      </template>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'
  import VueBotTwo from '../../plugins/VueBotTwo'

  export default {
    name: 'buttonsVertical',
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
        console.log(Bot)
        Bot.rsp_gid = btn.rsp_gid
        console.log(this)
        this.$parent.sendMessage(btn.value)
      },
    },
  }
</script>

<style scoped>
  .buttonsVertical {
    width: 10%;
  }

  .btn-group button {
    border-radius: 50%;
    background-color: #586eaf;
    border: 1px solid #121180;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    width: 100%;
    display: block;
  }

  .btn-group button:hover {
    background-color: #f9f9f9;
    color: black;
    border: 1px solid #121180;
  }

  .btn-group button:not(:last-child) {
    border-bottom: none;
  }
</style>
