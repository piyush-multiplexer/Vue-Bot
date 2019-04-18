<template>
  <div class="SearchSuggestion">
    <div v-if="showWidget">
      <v-autocomplete v-model="selectedValue" :items="widgetData.input.args.options"></v-autocomplete>
      <button @click="setSearchValue">Submit</button>
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
