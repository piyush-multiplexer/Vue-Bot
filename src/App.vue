<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      document.body.requestFullscreen()
    },
  }
</script>
