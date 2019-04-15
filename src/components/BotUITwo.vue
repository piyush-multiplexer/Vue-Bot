<template>
  <div id="BotUITwo">
    <div id="bot-container">
      <div id="bot-content" v-if="messages.length">
        <div v-for="(message,messageIndex) in messages" :key="messageIndex">
          {{message.input.name}}
          <template v-if="message.input.name==='text'">
            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content">
                <text-widget :widgetData="message"></text-widget>
              </div>
            </div>
          </template>
          <template v-else>
            <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content">
                <component :is="message.input.name" :widgetData="message.data"></component>
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

  let Bot
  export default {
    name: 'BotUITwo',
    components: { TextWidget },
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
      Bot = new VueBotTwo()
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
      async sendMessage () {
        this.messages.push(await Bot.getNextMessage(this.userValue))
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

  .message-bot .message-content {
    background-color: #297ec7;
    color: whitesmoke;
  }

  .message-user .message-content {
    background-color: #b6ccff;
    color: darkslategray;
  }

  .typing-loader {
    margin: 60px auto 60px 1px;
    width: 6px;
    height: 6px;
    -webkit-animation: line 1s linear infinite alternate;
    -moz-animation: line 1s linear infinite alternate;
    animation: line 1s linear infinite alternate;
  }

  @-webkit-keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }

  @-moz-keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }

  @keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }
</style>
