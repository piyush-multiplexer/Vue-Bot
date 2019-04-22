<template>
  <div class="TextWidget">
    <div class="widget-question"> {{widgetData.text[widgetData.text.length-1].string}}</div>
    <bubble :bubbles="widgetData.text"></bubble>
  </div>
</template>

<script>


  export default {
    name: 'TextWidget',
    props: ['widgetData'],
  }
</script>

<style scoped>

</style>
