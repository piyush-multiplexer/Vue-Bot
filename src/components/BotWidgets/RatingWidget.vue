<template>
  <div class="RatingWidget">
    <div v-if="showWidget" class="animated slideInUp">
      <v-rating v-model="rating" color="yellow darken-3" background-color="grey darken-1"
                empty-icon="$vuetify.icons.ratingFull" half-increments hover x-large></v-rating>
      <v-btn class="bot-button" @click="setDateTimeValue">Submit</v-btn>
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
        let self = this
        $(this.$el).addClass('animated fadeOutDown')
        setTimeout(function () {
          self.$parent.sendMessage(self.rating.toString())
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
