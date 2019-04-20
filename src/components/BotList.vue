<template>
  <div id="test">
    <template v-if="bots">
      <v-flex >Bots</v-flex>
      <v-layout>
        <v-flex >
          <v-list class="text-center" dense>
            <v-list-tile @click="gotoBot(bot)" v-for="(bot,index) in bots" :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{bot.convbot_title}}</v-list-tile-title>
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
