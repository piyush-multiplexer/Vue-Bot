<template>
  <div class="RatingWidget">
    <div v-if="showWidget">
      <star-rating :increment="0.5" v-model="rating" :show-rating="false"></star-rating>
      <button @click="setDateTimeValue">Submit</button>
    </div>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'RatingWidget',
    props: ['widgetData'],
    components: {
      StarRating,
    },
    data () {return { rating: 0.5, showWidget: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue () {
        this.$parent.sendMessage(this.rating)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>

<style scoped>

</style>
