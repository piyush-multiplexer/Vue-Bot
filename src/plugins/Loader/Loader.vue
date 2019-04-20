<template>
  <div id="Loader " v-if="showLoader" class="animated fadeIn fadeOut">
    <v-layout row justify-center style="background-color: rgba(113, 160, 255,0.5);">
      <v-dialog fullscreen="" v-model="showLoader" persistent content content-class="centered-dialog"
                style="box-shadow: none;">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <img src="../../../static/assets/image/bot-loader.png" width="70px" style="margin: 20px 20px 30px;">
            <!--            <v-progress-circular indeterminate :size="50" :width="3" color="primary"></v-progress-circular>-->
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    data () {
      return {
        text: 'Loading',
        showLoader: false,
        options: {
          loaderSize: 50,
          loaderWidth: 3,
          loaderText: 'Loading...',
        },
      }
    },
    methods: {
      toggleLoading (options) {
        this.showLoader = !this.showLoader
        this.options.loaderText = options.loaderText
      }, startLoading (options) {
        this.showLoader = true
        this.options.loaderText = options.loaderText
      }, stopLoading (options) {
        this.showLoader = false
        this.options.loaderText = options.loaderText
      },
    },
  }
</script>

<style scoped>
  .dialog.centered-dialog, .v-dialog.centered-dialog {
    background: rgba(118, 163, 208, 0.5);
    box-shadow: none;
    border-radius: 3px;
    width: auto;
    color: whitesmoke;
  }

  .v-dialog__content, .v-dialog__content--active {
    background-color: rgba(113, 160, 255, 0.5) !important;
    z-index: 211 !important;
  }

  .primary--text {
    color: #ffffff !important;
  }

  .accent--text {
    color: #ffffff !important;
  }
</style>
