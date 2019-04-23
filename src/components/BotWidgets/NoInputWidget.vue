<template>
  <div class="UserNameWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="+restartBot">
      <div class="widget-question"
           v-if="typeof widgetData.text[widgetData.text.length-1].string === 'string' || typeof widgetData.text[widgetData.text.length-1].string === 'number'"
           v-html="widgetData.text[widgetData.text.length-1].string"></div>
      <div class="widget-question" v-else>
        {{widgetData.text[widgetData.text.length-1].string.address}}
      </div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn class="bot-button" @click.once="restartBot">
            Restart
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'UserNameWidget',
    props: ['widgetData'],
    data () {return { userName: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      restartBot () {
        this.$router.go()
      },
    },
  }
</script>

<style scoped>

</style>
