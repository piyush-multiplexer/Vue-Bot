<template>
  <div id="BotUITwo">
    <div id="bot-container">
      <div id="bot-content" v-if="messages.length">
        <div v-for="(message,messageIndex) in messages" :key="messageIndex">
          <template v-if="message.type==='user'">
            <div style="text-align: right">
              <div class="message-content">
                {{message.value}}
              </div>
            </div>
          </template>
          <template v-else-if="message.input.name==='text'">
            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content">
                <bubble :bubbles="message.text"></bubble>
              </div>
            </div>
          </template>
          <template v-else>
            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content">
                <bubble :bubbles="message.text"></bubble>
              </div>
            </div>
            <div style="text-align: center">
              <div class="message-content">
                <component :is="message.input.name" :widgetData="message"></component>
              </div>
            </div>
          </template>
        </div>
        <div v-if="showInput" id="user-input-container" aria-disabled="true" @keyup.enter="sendMessage">
          <input type="text" v-model="userValue" :disabled="conversationEnd">
          <button @click="sendMessage" :disabled="conversationEnd">Send</button>
        </div>

        <!--        <div v-for="(message,index) in messages" :key="index">-->
        <!--          <div class="message-user" v-if="message.type==='textInput'">-->
        <!--            <div :style="botConfig.isHuman?'text-align: right':'text-align: center'">-->
        <!--              <div class="message-content">-->
        <!--                <component :is="message.type" :widgetData="message.data"></component>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="message-bot"-->
        <!--               v-if="message.type==='textDisplay' || message.type==='imageDisplay'">-->
        <!--            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">-->
        <!--              <template v-if="isBotLoading && index===messages.length-1">-->
        <!--                <div class="typing-loader"></div>-->
        <!--              </template>-->
        <!--              <template v-else>-->
        <!--                <div class="message-content">-->
        <!--                  <component :is="message.type" :widgetData="message.data"></component>-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div v-else-if="message.type==='buttonDisplay'||message.type==='cardDisplay'" :id="message.type+index">-->
        <!--            <div style="'text-align: center'">-->
        <!--              <template v-if="isBotLoading && index===messages.length-1">-->
        <!--                <div class="typing-loader"></div>-->
        <!--              </template>-->
        <!--              <template v-else>-->
        <!--                <div class="message-content">-->
        <!--                  <component :is="message.type" :widgetData="message.data" :widgetId="message.type+index"></component>-->
        <!--                </div>-->
        <!--              </template>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
    <!--    <div id="user-input-container" aria-disabled="true" @keyup.enter="sendMessage">-->
    <!--      <input type="text" v-model="userValue" :disabled="conversationEnd">-->
    <!--      <button @click="sendMessage" :disabled="conversationEnd">Send</button>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import VueBotTwo from '../plugins/VueBotTwo'
  import TextWidget from './BotWidgets/TextWidget'
  import EventBus from '../plugins/eventBus'
  import ButtonsVertical from './BotWidgets/buttonsVertical'
  import DatePicker from './BotWidgets/DatePicker'

  export default {
    name: 'BotUITwo',
    components: { 'date_roll': DatePicker, 'buttons_vertical': ButtonsVertical, 'text-widget': TextWidget },
    data () {
      return {
        messages: [],
        userValue: '',
        isBotLoading: false,
        conversationEnd: false,
        showInput: false,
        botConfig: { isHuman: true },
      }
    },
    async mounted () {
      let self = this
      this.messages = []
      this.messages[0] = await Bot.getConfig()
      this.$forceUpdate()
      EventBus.$on('AFTER_BUBBLE', () => {
        console.log('wnfio')
        self.showInput = true
      })
      // setTimeout(function () {
      //   $('#bot-content').css('height', '80vh !important')
      // }, 2000)

    },
    methods: {
      appendMessage (message) {
        let self = this
        this.isBotLoading = true
        console.log(message)
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
        this.messages.push({ type: 'user', value: this.userValue ? this.userValue : userValue })
        this.messages.push(await Bot.getNextMessage(this.userValue))
        this.userValue = ''
        this.$forceUpdate()
      },
    },
  }
</script>


<style scoped>
  #BotUI {
    height: 95vh;
    font-family: cursive;
  }

  #bot-container {
    height: 80vh;
    position: relative;
  }

  #bot-content {
    position: absolute;
    bottom: 0;
    overflow-y: scroll;
    width: 100%;
  }

  /*height: 80vh;*/

  #user-input-container {
    height: 19vh;
  }

  .message-content {
    word-break: break-word;
    padding: 1.5%;
    margin: 1%;
    border-radius: 30%;
    display: inline-block;
  }


  /*.message-content {*/
  /*  background-color: #b6ccff;*/
  /*  color: darkslategray;*/
  /*}*/


</style>
