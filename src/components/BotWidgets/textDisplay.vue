<template>
    <div class="textDisplay">
        <div v-html="widgetData.displayText"></div>
    </div>
</template>

<script>
  export default {
    name: 'textDisplay',
    props: ['widgetData'],
    created () {
      console.log(this.widgetData)
    }
  }
</script>

<style scoped>
</style>
