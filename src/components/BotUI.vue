<template>
  <div id="BotUI">
    <div id="bot-container">
      <div id="bot-content" v-if="messages.length">
        <div v-for="(message,messageIndex) in messages" :key="messageIndex">
          <div v-if="message.type==='user'" style="text-align: right">
            <div class="message-content-user">
              <bubble :bubbles="message.text"></bubble>
            </div>
          </div>

          <div v-else-if="message.input.name==='text'"
               :style="botConfig.isHuman?'text-align: left':'text-align: center'">
            <div class="message-content-bot">
              <bubble :bubbles="message.text"></bubble>
            </div>
          </div>

          <div v-else>
            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content-bot">
                <bubble :bubbles="message.text"></bubble>
              </div>
            </div>
            <div class="widget-content">
              <component :is="message.input.name" :widgetData="message"></component>
            </div>
          </div>
        </div>
        <template v-if="messages.length">
          <div v-if="showInput" id="user-input-container"  @keyup.enter="sendMessage">
            <input type="text" v-model="userValue" :disabled="conversationEnd">
            <button @click="sendMessage" :disabled="conversationEnd">Send</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import TextWidget from './BotWidgets/TextWidget'
  import ButtonsWidget from './BotWidgets/ButtonsWidget'
  import DatePicker from './BotWidgets/DatePicker'
  import SearchSuggestion from './BotWidgets/SearchSuggestion'

  export default {
    name: 'BotUI',
    components: {
      'search_suggester_dynamic': SearchSuggestion,
      'date_roll': DatePicker,
      'buttons_vertical': ButtonsWidget,
      'text-widget': TextWidget,
    },
    data () {
      return {
        messages: [],
        userValue: '',
        isBotLoading: false,
        conversationEnd: false,
        botConfig: { isHuman: true },
      }
    },
    async mounted () {
      let self = this
      this.messages = []
      this.messages[0] = await Bot.getConfig()
      this.$forceUpdate()
    },
    computed: {
      showInput () {
        return this.messages[this.messages.length - 1].input.name === 'text'
      },
    },
    methods: {
      appendMessage (message) {
        let self = this
        this.isBotLoading = true
        this.messages.push(message)
        this.isBotLoading = false
      },
      toggleInput () {
        this.conversationEnd = !this.conversationEnd
      },
      hideWidget (widgetId) {
        console.log($('#' + widgetId).hide())
      },
      async sendMessage (userValue) {
        this.messages.push({
          type: 'user',
          input: { name: 'user' },
          class: '',
          text: [{ string: this.userValue ? this.userValue : userValue }],
        })
        this.messages.push(await Bot.getNextMessage(this.userValue ? this.userValue : userValue))
        this.userValue = ''
        this.$forceUpdate()
      },
    },
  }
</script>
