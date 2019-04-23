<template>
  <div id="test">
    <template v-if="bots">

      <v-layout row wrap justify-center>
        <v-flex xs12>
          <h1 class="p-t-10 p-b-10">Bots</h1>
        </v-flex>
        <v-flex xs12 md5>
          <v-list class="text-center bot-list" dense>
            <v-list-tile @click="gotoBot(bot)" v-for="(bot,index) in bots" :key="index">
              <v-list-tile-content>
                <v-list-tile-title class="text-center">{{bot.convbot_title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>

    </template>
  </div>

</template>

<script>
  import Constants from '../Constant'
  import NetworkCommunicator from '../plugins/NetworkResourceHandler'

  export default {
    name: 'test',
    data () {
      return {
        bots: null,
      }
    },
    created () {
      this.$loading.start()
    },
    async mounted () {
      this.bots = await NetworkCommunicator('GET', `${Constants.base_url}allBot`)
      this.$loading.stop()
      this.$forceUpdate()
    },
    methods: {
      gotoBot (bot) {
        this.$router.push(`/${bot.convId}`)
      },
    },
  }
</script>

<style scoped>

</style>
