<template>
  <div class="SearchSuggestion">
    <div v-if="showWidget">
      <v-layout row wrap>
        <v-flex xs10>
          <v-autocomplete single-line outline class="bot-text-field" lable="name" item-text="name" v-model="selectedValue" :items="widgetData.input.args.options"></v-autocomplete>
        </v-flex>
        <v-flex xs2>
          <button class="bot-main-button" @click="setSearchValue">Submit</button>
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
        this.$parent.sendMessage(this.selectedValue)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>
