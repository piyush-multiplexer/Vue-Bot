<template>
  <div>
    <!--<div class="card-group" v-if="showWidget">-->

    <div class="bot-animated-card animated slideInUp p-l-0 p-r-0" v-if="showWidget">
      <!--      <div class="CardSliderWidget">-->
      <swiper :options="swiperOption" class="p-r-24 bot-carousel">
        <swiper-slide :key="index" class="p-t-10 p-b-10" v-for="(card) in widgetData.input.args.options">
          <div class="bot-carousel-card">
            <v-img :alt="card.name" :src="card.img_url" @click.once="setCardValue(card)"
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
      <!--      <carousel :dots="false" :nav="false" class="bot-carousel">-->

      <!--            <div class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">-->
      <!--              <v-img class="single-card-image" @click.once="setCardValue(card)" :src="thombarUrl+card.img_url"-->
      <!--                     :alt="card.name"/>-->
      <!--              <v-card-text class="single-card-content" v-html="card.footer_text"></v-card-text>-->
      <!--            </div>-->

      <!--      </carousel>-->
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
          loop: false,
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
          self.$parent.sendMessage({ type: 'user_card', value: card.val })
          self.$destroy()
          self.$el.parentNode.removeChild(self.$el)
        }, 500)

      },
    },
  }
</script>

<style>


</style>
