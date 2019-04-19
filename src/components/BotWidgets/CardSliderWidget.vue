<template>
  <div style="padding-bottom: 40px">
    <!--<div class="card-group" v-if="showWidget">-->
    <div class="CardSliderWidget animated slideInUp" v-if="showWidget">
      <v-layout>
        <v-flex class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">
          <v-img class="single-card-image" @click="setCardValue(card)" :src="card.img_url" :alt="card.name"/>
          <v-card-text class="single-card-content" v-html="card.footer_text"></v-card-text>
        </v-flex>
      </v-layout>

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
        $(this.$el).addClass('animated slideInDown')
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
