<template>
  <div class="RatingWidget">
    <div class="animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question">Rate It</div>
      <v-rating :half-increments="widgetData.input.args.step!=1?true:false" background-color="grey darken-1"
                class="bot-rating m-b-20" color="yellow darken-3"
                empty-icon="$vuetify.icons.ratingFull" hover
                v-model="rating" x-large></v-rating>
      <v-btn @click.once="setDateTimeValue" class="bot-button-round-text">Submit {{rating}} Rating</v-btn>
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
    data () {return { rating: 2, showWidget: false }},
    created () {
      if (window.BotMetaData.hasOwnProperty(this.widgetData.varid))
        this.rating = window.BotMetaData[this.widgetData.varid]
    },
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setDateTimeValue () {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          self.$parent.sendMessage({ type: 'user_rating', value: self.rating.toString() })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)
      },
    },
  }
</script>

<style scoped>

</style>
