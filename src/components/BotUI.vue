<template>
  <div id="BotUI">
    <div id="bot-container">
      <div id="bot-content" v-if="messages.length">
        <div style="transform: rotate(180deg);direction: ltr;">
          <div v-for="(message,messageIndex) in messages" :key="messageIndex" class="animated bounceInUp">
            <div v-if="message.type==='user'" style="text-align: right">
              <div class="message-content-user">
                <bubble :bubbles="message.text"></bubble>
              </div>
            </div>

            <div v-else-if="message.input.name==='text'"
                 :style="botConfig.isHuman?'text-align: left':'text-align: center'">
              <div class="message-content-bot">
                <bubble :bubbles="message.text" v-if="message.text.length!==1"></bubble>
              </div>
              <component :is="message.input.args.input_type" :widgetData="message"></component>
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

          <!--          <template v-if="messages.length">-->
          <!--            <div v-if="showInput" id=" user-input-container" @keyup.enter="sendMessage"-->
          <!--                 class="animated slideInUp bot-search-filed">-->
          <!--              <v-layout row wrap>-->
          <!--                <v-flex xs12>-->
          <!--                  <v-layout row wrap>-->
          <!--                    <v-flex xs10 md10>-->
          <!--                      <v-text-field class="bot-text-field" outline v-model="userValue" :disabled="conversationEnd"-->
          <!--                                    type="text"></v-text-field>-->
          <!--                    </v-flex>-->
          <!--                    <v-flex xs2 md2>-->
          <!--                      <v-btn class="bot-button-round" @click="sendMessage" :disabled="conversationEnd" fab flat icon>-->
          <!--                        <v-icon style="transform:rotate(-45deg) ">send</v-icon>-->
          <!--                        &lt;!&ndash;                      Send&ndash;&gt;-->
          <!--                      </v-btn>-->
          <!--                    </v-flex>-->
          <!--                  </v-layout>-->
          <!--                </v-flex>-->
          <!--              </v-layout>-->
          <!--            </div>-->

          <!--          </template>-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import TextWidget from './BotWidgets/TextWidget'
  import ButtonsWidget from './BotWidgets/ButtonsWidget'
  import CalendarWidget from './BotWidgets/CalendarWidget'
  import DatePickerWidget from './BotWidgets/DatePickerWidget'
  import TimePickerWidget from './BotWidgets/TimePickerWidget'
  import SearchSuggestion from './BotWidgets/SearchSuggestion'
  import CardSliderWidget from './BotWidgets/CardSliderWidget'
  import RatingWidget from './BotWidgets/RatingWidget'
  import RedirectWidget from './BotWidgets/RedirectWidget'
  import FileUploadWidget from './BotWidgets/FileUploadWidget'
  import GEOLocationWidget from './BotWidgets/GEOLocationWidget'
  import PhoneWidget from './BotWidgets/PhoneWidget'
  import PasswordWidget from './BotWidgets/PasswordWidget'
  import EmailWidget from './BotWidgets/EmailWidget'
  import UserNameWidget from './BotWidgets/UserNameWidget'
  import NoInputWidget from './BotWidgets/NoInputWidget'

  export default {
    name: 'BotUI',
    components: {
      'text_widget': TextWidget,
      'buttons_vertical': ButtonsWidget,
      'calendar_time': CalendarWidget,
      'date_roll': DatePickerWidget,
      'time_roll': TimePickerWidget,
      'search_suggester_dynamic': SearchSuggestion,
      'card_slide': CardSliderWidget,
      'star_rating': RatingWidget,
      'redirect_convflow': RedirectWidget,
      'file_upload': FileUploadWidget,
      'geo_location': GEOLocationWidget,
      'user_phone_number_10': PhoneWidget,
      'user_phone_number': PhoneWidget,
      'user_password': PasswordWidget,
      'user_email': EmailWidget,
      'user_name': UserNameWidget,
      'no_input': NoInputWidget,
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
