<template>
  <div class="SearchSuggestion">
    <div @keyup.enter="setSearchValue" class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Search & Select</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-autocomplete :items="widgetData.input.args.options" class="bot-text-field-autocomplete" item-text="name"
                            lable="name"
                            prepend-icon="search"
                            ref="state" v-model="state"></v-autocomplete>
          </v-flex>
          <v-flex class="text-right" md2 xs2>
            <v-btn @click.once="setSearchValue" class="bot-button-round" fab flat icon>
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <span @click.once="skipSearchValue" style="cursor: pointer;text-align: right;color: #00b0ff"
              v-if="widgetData.input.args.pass">skip
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'SearchSuggestion',
    props: ['widgetData'],
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () {
          self.$refs.state.focus()
        }, 200)
      })
    },
    data () {
      return { showWidget: false, state: '', clicked: false }
    },
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.state = window.BotMetaData[this.widgetData.varid]
    },
    methods: {
      setSearchValue () {
        let self = this
        if (this.state && !this.clicked) {
          this.clicked = true
          animateSendButton()
          setTimeout(function () {
            $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
          }, 1000)
          setTimeout(function () {
            self.$parent.sendMessage({ value: self.state, type: 'user_search_suggestion' })
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 1000)
        }
      },
      skipSearchValue () {
        let self = this
        animateSendButton()
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 1000)
        setTimeout(function () {
          self.$parent.sendMessage({ value: 'skipped', type: 'user_search_suggestion' })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)
      },
    },
  }
</script>
