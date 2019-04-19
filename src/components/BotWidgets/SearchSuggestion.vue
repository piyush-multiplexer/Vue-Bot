<template>
  <div class="SearchSuggestion">
    <div v-if="showWidget" class="animated slideInUp">
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-autocomplete single-line outline class="bot-text-field" lable="name" item-text="name"
                          v-model="selectedValue" :items="widgetData.input.args.options"></v-autocomplete>
        </v-flex>
        <v-flex xs2 md2>
          <!--<button class="bot-main-button" @click="setSearchValue">Submit</button>-->
          <v-btn class="bot-button" @click="setSearchValue" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
            <!--                      Send-->
          </v-btn>
        </v-flex>
      </v-layout>

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
      })
    },
    data () {
      return { showWidget: false, selectedValue: '' }
    },
    methods: {
      setSearchValue () {
        let self = this
        $(this.$el).addClass('animated slideInDown')
        setTimeout(function () {
          this.$parent.sendMessage(self.selectedValue)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>
