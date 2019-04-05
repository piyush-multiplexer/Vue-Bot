<template>
    <div class="home">
        <bot-u-i></bot-u-i>
    </div>
</template>

<script>
  // @ is an alias to /src
  import BotUI from '@/components/BotUI.vue'
  // import fetchNetworkData from '../plugins/NetworkResourceHandler'

  export default {
    name: 'home',
    components: {
      BotUI,
    },
    mounted () {
// (url, method, loading, postData, headers)
//       fetchNetworkData('https://my-json-server.typicode.com/typicode/demo/posts', 'GET')
    },
  }
</script>
