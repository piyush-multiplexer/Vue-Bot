<template>
  <div class="TextWidget">
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
