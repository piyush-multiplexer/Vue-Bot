<template>
  <div class="TextWidget">
    <bubble :bubbles="widgetData.text"></bubble>
  </div>
</template>

<script>

  import Bubble from './Bubble'


  export default {
    name: 'TextWidget',
    components: { Bubble },
    props: ['widgetData'],
  }
</script>

<style scoped>

</style>
