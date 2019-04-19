<template>
  <div class="FileUploadWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <input type="file" v-model="file" name="file" accept="image/*">
      <button @click="setDateTimeValue">Submit</button>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'FileUploadWidget',
    props: ['widgetData'],
    data () {return { file: '', showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue () {
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.file)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
