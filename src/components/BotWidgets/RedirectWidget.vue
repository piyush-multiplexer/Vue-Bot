<template>
  <div class="RedirectWidget">
    <div class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">
        Scan Code
      </div>
      <v-layout row wrap>
        <v-flex xs12>
          <img :src="scanImage"/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import NetworkCommunicator from '../../plugins/NetworkResourceHandler'

  export default {
    name: 'RedirectWidget',
    props: ['widgetData'],
    data () {
      return {
        showWidget: false,
        scanImage: '',
      }
    },
    mounted () {

      let self = this
      setTimeout(function () {
        if (self.widgetData.input.args.redirect_type === 'api') {
          let api_url = self.widgetData.input.args.redirect_url
          api_url = api_url.toString().replace('{convId}', self.$route.params.botId)
          api_url = api_url.toString().replace('{historyId}', self.$parent.historyId)
          self.getScanCode(api_url)
        } else if (self.widgetData.input.args.redirect_type === 'url') {
          if (self.widgetData.input.args.redirect_url !== null) {
            window.location.href = self.widgetData.input.args.redirect_url
          }
        } else {
          if (self.widgetData.input.args.redirect_url !== null) {
            window.location.href = self.widgetData.input.args.redirect_url
          }
        }

      }, self.widgetData.input.args.redirect_delay)
    },
    methods: {
      async getScanCode (api_url) {
        this.showWidget = true
        let response = await NetworkCommunicator('GET', api_url)
        this.scanImage = 'data:image/png;base64,' + response.data.slice(0, response.data.length - 1)
        console.log(response)
      },
    },
  }
</script>

<style scoped>

</style>
