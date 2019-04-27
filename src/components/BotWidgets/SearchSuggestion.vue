<template>
  <div class="SearchSuggestion">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setSearchValue">
      <div class="widget-question">Search & Select</div>
      <div class="bot-text-filed-buttton-broder">
      <v-layout row wrap>
        <v-flex xs9 md10>
          <v-autocomplete prepend-inner-icon="search" class="bot-text-field-autocomplete" lable="name" ref="state" item-text="name"
                          v-model="state" :items="widgetData.input.args.options"></v-autocomplete>
        </v-flex>
        <v-flex xs3 md2 class="text-right">
          <v-btn class="bot-button-round" @click.once="setSearchValue" fab flat icon>
            <v-icon>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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
    methods: {
      setSearchValue () {
        let self = this
        if (this.state && !this.clicked) {
          this.clicked = true
          $(this.$el).addClass('animated bounceOutDown')
          setTimeout(function () {
            self.$parent.sendMessage(self.state)
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 500)
        }
      },
    },
  }
</script>
