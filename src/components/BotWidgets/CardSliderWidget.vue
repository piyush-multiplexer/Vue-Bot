<template>
  <div style="padding-bottom: 40px">
    <!--<div class="card-group" v-if="showWidget">-->

    <div class="bot-animated-card animated slideInUp" v-if="showWidget">
      <div class="widget-question">Select a Card</div>
      <!--      <div class="CardSliderWidget">-->
      <carousel :dots="false" :nav="false">
        <v-layout>
          <v-flex class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">
            <div>
              <v-img class="single-card-image" @click.once="setCardValue(card)" :src="thombarUrl+card.img_url"
                     :alt="card.name"/>
              <v-card-text class="single-card-content" v-html="card.footer_text"></v-card-text>
            </div>
          </v-flex>
        </v-layout>
      </carousel>
      <!--      <div>-->
      <!--    </div>-->
      <!--        <div class="CardSliderWidget">-->
      <!--          <v-layout>-->
      <!--            <v-flex class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">-->
      <!--              <div>-->
      <!--                <v-img class="single-card-image" @click.once="setCardValue(card)" :src="card.img_url" :alt="card.name"/>-->
      <!--                <v-card-text class="single-card-content" v-html="card.footer_text"></v-card-text>-->
      <!--              </div>-->
      <!--            </v-flex>-->
      <!--          </v-layout>-->
      <!--        </div>-->
    </div>
    <!--  </div>-->
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'
  import carousel from 'vue-owl-carousel'

  export default {
    name: 'CardSliderWidget',
    components: { carousel },

    props: ['widgetData'],
    data () {
      return {
        showWidget: false, thombarUrl: 'http://thumbor.avinashi.com/unsafe/250x300/smart/',
      }
    },
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setCardValue (card) {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = card.rsp_gid
          self.$parent.sendMessage(card.val)
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)

      },
    },
  }
</script>

<style>


</style>
