<template>
    <div id="BotUI">
        <div id="bot-container">
            <div id="bot-content">
                <div v-for="(message,index) in messages" :key="index">
                    <div class="message-user" v-if="message.type==='textInput'">
                        <div :style="botConfig.isHuman?'text-align: right':'text-align: center'">
                            <div class="message-content">
                                <component :is="message.type" :widgetData="message.data"></component>
                            </div>
                        </div>
                    </div>
                    <div class="message-bot"
                         v-if="message.type==='textDisplay' || message.type==='imageDisplay' || message.type==='buttonDisplay'">
                        <div :style="botConfig.isHuman?'text-align: left':'text-align: center'">
                            <template v-if="isBotLoading && index===messages.length-1">
                                <div class="typing-loader"></div>
                            </template>
                            <template v-else>
                                <div class="message-content">
                                    <component :is="message.type" :widgetData="message.data"></component>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="user-input-container" aria-disabled="true" @keyup.enter="sendMessage">
            <input type="text" v-model="userValue" :disabled="conversationEnd">
            <button @click="sendMessage" :disabled="conversationEnd">Send</button>
        </div>
    </div>
</template>

<script>
  import VueBot from '../plugins/VueBot'
  import textDisplay from './BotWidgets/textDisplay'
  import textInput from './BotWidgets/textInput'
  import imageDisplay from './BotWidgets/imageDisplay'
  import buttonDisplay from './BotWidgets/buttonDisplay'

  let Bot
  export default {
    name: 'BotUI',
    components: { textInput, textDisplay, imageDisplay, buttonDisplay },
    data () {
      return {
        messages: [],
        userValue: '',
        isBotLoading: false,
        conversationEnd: false,
        botConfig: null,
      }
    },
    mounted () {
      Bot = new VueBot()
      this.botConfig = Bot.getConfig()
      this.renderBot()
    },
    methods: {
      appendMessage (message) {
        let self = this
        this.isBotLoading = true
        setTimeout(function () {
          self.messages.push(message)
          self.isBotLoading = false
          if (message.data.hasOwnProperty('conversationEnd'))
            self.conversationEnd = message.data.conversationEnd
        }, message.data.timeout)
      },
      renderBot () {
        this.appendMessage(Bot.getNextBotData())
      },
      sendMessage () {
        Bot.setData(this.userValue)
        this.userValue = ''
        this.appendMessage(Bot.getNextUserData())
        this.appendMessage(Bot.getNextBotData())
      },
      sendBotMessage (fromWidget) {
        Bot.setData(fromWidget)
        this.appendMessage(Bot.getNextUserData())
        this.appendMessage(Bot.getNextBotData())
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

    #user-input-container {
        padding-top: 5%;
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
