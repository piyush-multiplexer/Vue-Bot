<template>
  <div class="home">
    <bot-u-i></bot-u-i>
  </div>
</template>

<script>
  import BotUI from '../../src/components/BotUI.vue'
  // import NetworkCommunicator from '../plugins/NetworkResourceHandler'

  export default {
    name: 'home',
    components: {
      BotUI,
    },
  }
</script>
