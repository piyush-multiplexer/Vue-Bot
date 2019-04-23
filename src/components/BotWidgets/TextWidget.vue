<template>
  <div class="TextWidget">
<!--    <div class="widget-question">Enter Te</div>-->
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
