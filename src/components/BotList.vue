<template>
  <div id="test">
    <template v-if="bots">
      <div v-for="bot in bots">
        <router-link :to="'/'+bot.convId"> {{bot.convbot_title}}</router-link>
      </div>
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
    async mounted () {
      this.bots = await NetworkCommunicator('GET', `${Constants.base_url}allBot`)
      this.$forceUpdate()
    },
  }
</script>

<style scoped>

</style>
