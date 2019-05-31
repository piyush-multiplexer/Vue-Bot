<template>
  <div>
    <!--<div class="card-group" v-if="showWidget">-->

    <div class="bot-animated-card-slider animated slideInUp p-l-0 p-r-0" v-if="showWidget">

      <v-layout row wrap>
        <v-flex xs10 sm10>
          <div class="widget-question">Select an Card</div>
        </v-flex>
        <v-flex xs2 sm2>
          <div @click.once="setCardValue({rsp_gid:widgetData.input.args.rsp_gid,val:'skipped',name:'skipped'},true)"
               class="widget-skip"
               v-if="widgetData.input.args.pass">skip
          </div>
        </v-flex>
      </v-layout>

      <swiper :options="swiperOption" class="p-r-24 bot-carousel">
        <swiper-slide :key="index" class="p-t-10 p-b-10" v-for="(card,index) in widgetData.input.args.options">
          <div class="bot-carousel-card">
            <v-img :alt="card.name" :src="card.img_url" @click.once="setCardValue(card,false)"
                   class="single-card-image"/>
            <p class="m-t-5 m-b-0">{{card.footer_text}}</p>
          </div>
        </swiper-slide>
        <div class="bot-silder-icon" slot="button-prev">
          <div class="swiper-button-prev">
            <i class="material-icons">
              keyboard_arrow_left
            </i>
          </div>
        </div>
        <div class="bot-silder-icon" slot="button-next">
          <div class="swiper-button-next">
            <i class="material-icons">
              keyboard_arrow_right
            </i>
          </div>
        </div>
      </swiper>

    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'
  import 'swiper/dist/css/swiper.css'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: 'CardSliderWidget',
    components: {
      swiper,
      swiperSlide,
    },
    props: ['widgetData'],
    data () {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          width: 500,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        showWidget: false, thombarUrl: 'http://thumbor.avinashi.com/unsafe/250x300/smart/',
      }
    },
    mounted () {
      let self = this
      EventBus.$once('AFTER_BUBBLE', function () {
        self.showWidget = true
      })
    },
    methods: {
      setCardValue (card, skip) {
        let self = this
        $(this.$el).addClass('animated bounceOutDown')
        setTimeout(function () {
          Bot.rsp_gid = card.rsp_gid
          self.$parent.sendMessage({ type: 'user_card', value: skip ? 'skipped' : card ,metaValue: skip ? 'skipped' : card.name })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)

      },
    },
  }
</script>

<style>


</style>
