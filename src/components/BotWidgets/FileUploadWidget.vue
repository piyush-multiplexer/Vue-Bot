<template>
  <div class="FileUploadWidget">
    <div v-if="showWidget">
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
        console.log(this.file)
        this.$parent.sendMessage(this.file)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>

<style scoped>

</style>
