<template>
  <div id="BotUI">
    <div id="bot-container">
      <div class="bot-background">
        <div id="bot-content" v-if="messages.length">
          <div id="bot-sub-content">
            <!--            <div :key="messageIndex" class="animated bounceInUp" v-for="(message,messageIndex) in messages">-->
            <div :key="messageIndex" v-for="(message,messageIndex) in messages">
              <div class="text-right animated fadeInRight" v-if="message.type==='user'">
                <!--              <div class="text-right animated bounceInRight" v-if="message.type==='user'">-->
                <div class="message-content-user">
                  <user-bubble-widget :widgetData="message"></user-bubble-widget>
                  <!--                  <bubble :bubbles="message.text"></bubble>-->
                </div>
              </div>

              <div :style="botConfig.isHuman?'text-align: left':'text-align: center'"
                   class="animated bounceInUp" v-else-if="message.input.name==='text'">
                <div class="message-content-bot">
                  <bubble :bubbles="message.text"></bubble>
                </div>
                <component :is="message.input.args.input_type" :widgetData="message"></component>
                <!--                <v-layout row wrap>-->
                <!--                  <v-flex md10 xs10></v-flex>-->
                <!--                  <v-flex class="text-right" md2 xs2>-->
                <!--                    <v-btn class="bot-button-round-animate" fab flat icon-->
                <!--                           style="visibility: hidden;    position: fixed;    right: 0;    bottom: 0;">-->
                <!--                      <v-icon>send</v-icon>-->
                <!--                    </v-btn>-->
                <!--                  </v-flex>-->
                <!--                </v-layout>-->
              </div>

              <div class="animated bounceInUp" v-else>
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
          </div>
        </div>
      </div>
      <div class="p-t-5 p-b-5" id="powered-by">
        <v-layout class="text-center" row wrap>
          <v-flex xs12>
            Powered By Avinashi Pvt. Ltd.
          </v-flex>
        </v-layout>
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
  import UserBubbleWidget from './BotWidgets/UserBubbleWidget'
  import CustomTextWidget from './BotWidgets/CustomTextWidget'

  export default {
    name: 'BotUI',
    components: {
      UserBubbleWidget,
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
      'user_fullname': UserNameWidget,
      'no_input': NoInputWidget,
      'custom_text': CustomTextWidget,
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
      window.BotMetaData = await Bot.getBotHashData()
      console.log(BotMetaData)
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
          input: { name: userValue.type },
          class: '',
          text: [{ string: this.userValue ? this.userValue : userValue.value }],
          meta: userValue.meta,
        })
        if (userValue === 'skipped')
          this.messages.push(await Bot.getNextMessage(''))
        else
          this.messages.push(await Bot.getNextMessage(this.userValue ? this.userValue : userValue.value))
        this.userValue = ''
        this.$forceUpdate()
      },
    },
  }
</script>
