<template>
  <div class="home bot-home">
    <BotUI v-if="isBot"></BotUI>
    <div id="powered-by">
      <v-layout  class="text-center">
        <v-flex xs12>
          Powered By Avinashi Pvt. Ltd.
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import BotUI from './BotUI'
  import VueBot from '../plugins/VueBot'

  export default {
    name: 'BotHome',
    components: {
      'BotUI': BotUI,
    },
    data(){return{isBot:null}},
    mounted () {
      window.Bot = new VueBot(this.$route.params.botId)
      this.isBot  = true
    }
  }
</script>
