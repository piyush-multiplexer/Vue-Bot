<template>
  <div class="UserNameWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter.once="restartBot">
      <div class="widget-question">
        Thank You
      </div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn class="bot-button-round-text" @click.once="restartBot">
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
      EventBus.$once('AFTER_BUBBLE', function () {
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
