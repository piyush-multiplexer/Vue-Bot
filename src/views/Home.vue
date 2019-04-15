<template>
  <div class="home">
<!--    <bot-u-i></bot-u-i>-->
    <bot-u-i-two></bot-u-i-two>
  </div>
</template>

<script>
  // import BotUI from '../../src/components/BotUI.vue'
  import BotUITwo from '../../src/components/BotUITwo'
  // import NetworkCommunicator from '../plugins/NetworkResourceHandler'

  export default {
    name: 'home',
    components: {
      // BotUI,
      BotUITwo,
    },
  }
</script>
