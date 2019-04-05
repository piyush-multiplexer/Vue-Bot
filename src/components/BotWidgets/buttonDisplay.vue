<template>
    <div class="buttonDisplay">
        <div v-html="widgetData.displayText"></div>
        <template v-for="btn in widgetData.options">
            <button :disabled="selected" @click="setButtonValue(btn)">{{btn.value}}</button>
        </template>
    </div>
</template>

<script>
  export default {
    name: 'buttonDisplay',
    props: ['widgetData'],
    data () {
      return {
        selected: false,
      }
    },
    methods: {
      setButtonValue (btn) {
        this.selected = true
        this.$forceUpdate()
        this.$parent.sendBotMessage(btn.value)
      },
    },
  }
</script>

<style scoped>
</style>
