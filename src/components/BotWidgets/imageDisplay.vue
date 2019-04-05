<template>
    <div class="imageDisplay">
        <img :src="widgetData.displayImage"/>
        <div v-html="widgetData.displayText"></div>
    </div>
</template>

<script>
  export default {
    name: 'imageDisplay',
    props: ['widgetData'],
  }
</script>

<style scoped>
</style>
