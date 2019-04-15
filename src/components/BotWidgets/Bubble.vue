<template>
  <div class="Bubble">
    <template v-for="(bubble,index) in localBubbles">
      <div class="bubble-card">
        <div v-html="bubble.string"></div>
        <div v-if="bubble.img_url"><img  :src="bubble.img_url"/></div>
      </div>
    </template>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'Bubble',
    props: ['bubbles'],
    data () {
      return {
        localBubbles: [],
      }
    },
    mounted () {
      let self = this
      this.bubbles.forEach((bubble, bubbleIndex) => {
        setTimeout(function () {
          self.appendBubble(bubble, bubbleIndex)
        }, bubble.delay)
      })
    },
    methods: {
      appendBubble (bubble, bubbleIndex) {
        this.localBubbles.push(bubble)
        if (bubbleIndex + 1 === this.bubbles.length) {
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
    },
  }
</script>

<style scoped>
.bubble-card img{
  height: 8%;
  width: 15%;
}
</style>
