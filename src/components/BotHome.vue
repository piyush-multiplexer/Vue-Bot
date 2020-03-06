<template>
  <div class="home bot-home">
    <BotUI v-if="isBot"></BotUI>
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
    data () {return { isBot: null }},
    mounted () {
      if(this.$route.params.botId)
        document.title = this.$route.params.botId
      if (this.$route.params.hashId)
        window.Bot = new VueBot(this.$route.params.botId, this.$route.params.hashId)
      else if (this.$route.params.sessionId)
        window.Bot = new VueBot(this.$route.params.botId, this.$route.params.sessionId)
      else
        window.Bot = new VueBot(this.$route.params.botId)
      this.isBot = true
    },
  }
</script>
