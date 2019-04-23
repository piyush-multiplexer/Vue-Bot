<template>
  <div class="FileUploadWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card">
      <div class="widget-question">Upload File/Image</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-text-field label="Select File/Image" @click='pickFile' v-model='imageName'
                        prepend-icon='attach_file'></v-text-field>
          <input type="file" style="display: none" ref="file" id="file" name="file" @change="localUpload"
          >
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" :disabled="!uploadFileData.length" @click="uploadFile" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
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
    data () {return { showWidget: false, imageName: '', uploadFileData: '' }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      pickFile () {
        this.$refs.file.click()
      },
      localUpload (e) {
        const files = e.target.files
        if (files[0] !== undefined) {
          this.imageName = files[0].name
          this.uploadFileData = files[0].name
        } else {
          this.imageName = ''
          this.uploadFileData = files[0].name
        }
      },
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
        $(this.$el).addClass('animated bounceOutDown')
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
