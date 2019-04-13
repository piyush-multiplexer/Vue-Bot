<template>
  <div class="textInput">
    <div v-html="widgetData.inputText"></div>
  </div>
</template>

<script>
  export default {
    name: 'textInput',
    props: ['widgetData'],
    mounted () {
    },
  }
</script>

<style scoped>
</style>
