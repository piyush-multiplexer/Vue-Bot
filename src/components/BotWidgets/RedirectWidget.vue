<template>
  <div class="RedirectWidget">

  </div>
</template>

<script>
  export default {
    name: 'RedirectWidget',
    props: ['widgetData'],
    mounted () {
      let self = this
      setTimeout(function () {
        window.location.href = self.widgetData.input.args.redirect_url
      }, self.widgetData.input.args.redirect_delay)
    },
  }
</script>

<style scoped>

</style>
