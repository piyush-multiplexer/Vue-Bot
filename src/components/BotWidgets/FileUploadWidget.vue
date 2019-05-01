<template>
  <div class="FileUploadWidget">
    <div @keyup.enter.once="uploadFile" class="animated slideInUp bot-animated-card"
         v-if="showWidget">
      <div class="widget-question">Upload File/Image</div>
      <div class="bot-text-filed-buttton-broder">
        <v-layout row wrap>
          <v-flex md10 xs10>
            <v-text-field @click.native='pickFile' class="bot-text-field-email" prepend-icon='attach_file'
                          ref="uploadFile"
                          v-model='imageName'></v-text-field>
            <input @change="localUpload" id="file" name="file" ref="file" style="display: none" type="file">
          </v-flex>
          <v-flex class="text-right" md2 xs2>
            <v-btn :disabled="!uploadFileData.length" @click.once="uploadFile" class="bot-button-round" fab flat icon>
              <v-icon>send</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
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
        setTimeout(function () { self.$refs.uploadFile.focus() }, 200)
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
        if (this.uploadFileData.length) {
          let formData = new FormData()
          formData.append('file[]', this.$refs.file.files[0])
          let response = await NetworkCommunicator('POST',
            `${Constants.uploadFileUrl}`, false, formData)
          if (response.flag) {
            self.uploadFileData = response.data.success[0]
            self.setFile(response.data.success[0].url)
          }
        }
      },
      setFile (fileUrl) {
        let self = this
        setTimeout(function () {
          animateSendButton()
        }, 100)
        setTimeout(function () {
          $(self.$el).addClass('animated bounceOutDown') // //fadeOutDownBig
        }, 300)
        setTimeout(function () {
          self.$parent.sendMessage(
            { value: self.$refs.file.files[0].name, meta: self.$refs.file.files[0], type: 'user_file' })
          // self.$parent.sendMessage({value:fileUrl,type:'user_file'})
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 1000)
      },
    },
  }
</script>

<style scoped>

</style>
