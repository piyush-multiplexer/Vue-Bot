<template>
  <div class="home bot-home">
    <BotUI></BotUI>
  </div>
</template>

<script>
  // import BotUI from '../../src/components/BotUI.vue'
  import BotUI from '../components/BotUI'
  // import NetworkCommunicator from '../plugins/NetworkResourceHandler'

  export default {
    name: 'home',
    components: {
      'BotUI': BotUI,
    },
  }
</script>
