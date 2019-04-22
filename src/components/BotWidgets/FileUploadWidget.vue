<template>
  <div class="FileUploadWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="file" ref="file" id="file" name="file" accept="image/*">
      <v-btn class="bot-button" :disabled="!uploadFileData.length" @click="uploadFile">Submit</v-btn>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'
  import NetworkCommunicator from '../../plugins/NetworkResourceHandler'
  import Constants from '../../Constant'

  export default {
    name: 'FileUploadWidget',
    props: ['widgetData'],
    data () {return { showWidget: false, uploadFileData: '' }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      async uploadFile () {
        let self = this
        let formData = new FormData()
        formData.append('file[]', this.$refs.file.files[0])
        console.log(formData)
        let response = await NetworkCommunicator('POST',
          `${Constants.uploadFileUrl}`, false, formData)
        if (response.flag) {
          self.uploadFileData = response.data.success[0]
          self.setFile(response.data.success[0].url)
        }
      },
      setFile (fileUrl) {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(fileUrl)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
