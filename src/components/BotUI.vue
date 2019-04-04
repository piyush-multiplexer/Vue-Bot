<template>
    <div id="BotUI">
        <div id="bot-container">
            <div id="bot-content">
                <div v-for="(message,index) in messages" :key="index">
                    <div class="message-user" v-if="message.type==='textInput'">
                        <div style="text-align: right">{{message.data.inputText}}</div>
                    </div>
                    <div class="message-bot" v-if="message.type==='textDisplay'">
                        <div style="text-align: left">
                            <template v-if="isBotLoading && index===messages.length-1">
                                <div class="typing-loader"></div>
                            </template>
                            <template v-else>
                                <div>{{message.data.displayText}}</div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="user-input-container" aria-disabled="true">
            <input type="text" v-model="userValue" :disabled="conversationEnd">
            <button @click="sendMessage" :disabled="conversationEnd">Send</button>
        </div>
    </div>
</template>

<script>
  import VueBot from '../plugins/VueBot'

  let Bot
  export default {
    name: 'BotUI',
    data () {
      return {
        messages: [],
        userValue: '',
        isBotLoading: false,
        conversationEnd: false,
      }
    },
    mounted () {
      Bot = new VueBot()
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
    },
  }
</script>

<style scoped>
    #BotUI {
        overflow: hidden;
        height: 95vh;
    }

    #bot-container {
        overflow: paged-y;
        height: 80vh;
        position: relative;
    }

    #bot-content {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    #user-input-container {
        padding-top: 5%;
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
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        25% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        75% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 2);

        }
    }

    @-moz-keyframes line {
        0% {

            background-color: rgba(0, 0, 0, 1);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        25% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        75% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 2);

        }
    }

    @keyframes line {
        0% {

            background-color: rgba(0, 0, 0, 1);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        25% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2),
            24px 0px 0px 0px rgba(0, 0, 0, 0.2);

        }
        75% {
            background-color: rgba(0, 0, 0, 0.4);
            box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
            24px 0px 0px 0px rgba(0, 0, 0, 2);

        }
    }
</style>
