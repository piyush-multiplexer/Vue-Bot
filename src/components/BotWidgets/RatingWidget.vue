<template>
  <div class="RatingWidget">
    <div v-if="showWidget">
      <v-rating v-model="rating" color="yellow darken-3" background-color="grey darken-1"
                empty-icon="$vuetify.icons.ratingFull" half-increments hover x-large></v-rating>
      <v-btn class="bot-rating-button" @click="setDateTimeValue">Submit</v-btn>
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
