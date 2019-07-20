<template>
  <div class="home bot-home" id="botHome" style="right: 7px;position: absolute;">
    <v-btn @click="handleClick" absolute bottom color="blue" dark fab id="accordion" left small>
      <v-icon>add</v-icon>
    </v-btn>
    <div id="panel">
      <BotUI v-if="isBot"></BotUI>
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
    data () {return { isBot: null }},
    mounted () {
      if (this.$route.params.hashId)
        window.Bot = new VueBot(this.$route.params.botId, this.$route.params.hashId)
      else if (this.$route.params.sessionId)
        window.Bot = new VueBot(this.$route.params.botId, this.$route.params.sessionId)
      else
        window.Bot = new VueBot(this.$route.params.botId)
      this.isBot = true
    },
    methods: {
      handleClick () {
        if (this.$route.query && this.$route.query.collapsed == 'true') {
          this.$route.query.collapsed = 'false'
          console.log(this.$route.query)
          $('#panel').toggle()
        } else {
          this.$route.query.collapsed = 'true'
          console.log(this.$route.query)
          $('#panel').toggle()
        }
      },
    },
  }
</script>
