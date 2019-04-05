<template>
    <div class="textDisplay">
        <div v-html="widgetData.displayText"></div>
    </div>
</template>

<script>
  export default {
    name: 'textDisplay',
    props: ['widgetData'],
  }
</script>

<style scoped>
</style>
