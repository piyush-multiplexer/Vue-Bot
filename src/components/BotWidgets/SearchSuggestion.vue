<template>
  <div class="SearchSuggestion">
    <div class="btn-group" v-if="showWidget">
      <input  list="options" v-model="selectedValue" name="search_options">
      <datalist id="options">
        <option v-for="option in widgetData.input.args.options" :value="option.name"></option>
      </datalist>
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
      },
    },
  }
</script>

<style scoped>

</style>
