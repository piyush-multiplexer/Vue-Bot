<template>
  <div class="CardSliderWidget">
    <div class="card-group" v-if="showWidget">
          <v-layout>
            <v-flex class="single-card" v-for="(card,index) in widgetData.input.args.options" :key="index">
              <v-img class="single-card-image" @click="setCardValue(card)" :src="card.img_url" :alt="card.name" />
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
        Bot.rsp_gid = card.rsp_gid
        this.$parent.sendMessage(card.val)
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
    },
  }
</script>
