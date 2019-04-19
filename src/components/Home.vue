<template>
  <div class="home bot-home">
    <BotUI v-if="isBot"></BotUI>
  </div>
</template>

<script>
  import BotUI from './BotUI'
  import VueBot from '../plugins/VueBot'

  export default {
    name: 'Home',
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
