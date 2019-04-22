<template>
  <div style="padding-bottom: 40px">
    <!--<div class="card-group" v-if="showWidget">-->
    <div class="CardSliderWidget animated slideInUp bot-animated-card" v-if="showWidget">
      <div class="widget-question"> {{widgetData.text[widgetData.text.length-1].string}}</div>
      <v-layout>
        <v-flex class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">
          <v-img class="single-card-image" @click="setCardValue(card)" :src="card.img_url" :alt="card.name"/>
          <v-card-text class="single-card-content" v-html="card.footer_text"></v-card-text>
        </v-flex>
      </v-layout>


    <!--<div style="overflow:auto;white-space: nowrap; background-color: #ffffff; padding: 10px 5px">
      <a style="display: inline-block" target="_blank">
        <img style="padding: 0 10px; height: 150px; border-radius: 15px;"
             src="https://www.w3schools.com/w3images/avatar2.png"/>
      </a>
      <a style="display: inline-block" target="_blank">
        <img style="padding: 0 10px; height: 150px; border-radius: 15px;"
             src="https://www.w3schools.com/howto/img_avatar.png"/>
      </a>
      <a style="display: inline-block" target="_blank">
        <img style="padding: 0 10px; height: 150px; border-radius: 15px;"
             src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"/>
      </a>
      <a style="display: inline-block" target="_blank">
        <img style="padding: 0 10px; height: 150px; border-radius: 15px;"
             src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"/>
      </a>
    </div>-->

    </div>

  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'CardSliderWidget',
    props: ['widgetData'],
    data () {
      return { showWidget: false }
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
        $(this.$el).addClass('animated fadeOutDownBig')
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
