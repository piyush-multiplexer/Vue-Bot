<template>
  <div class="FileUploadWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="file" ref="file" id="file" name="file" accept="image/*">
      <v-btn class="bot-button" @click="uploadFile">Submit</v-btn>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'FileUploadWidget',
    props: ['widgetData'],
    data () {return { showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      uploadFile () {
        let self = this
        let formData = new FormData()
        formData.append('file[]', this.$refs.file.files[0])
        console.log(formData)
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(formData)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
