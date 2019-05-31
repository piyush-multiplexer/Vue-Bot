<template>
  <div class="UserNameWidget">
    <div @keyup.enter.once="restartBot" class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question" style="text-align: center !important;    padding-right: 6% !important;">
        Thank You
      </div>
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn @click.once="restartBot" class="bot-button-round-text">
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
