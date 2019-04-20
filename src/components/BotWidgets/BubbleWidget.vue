<template>
  <div class="BubbleWidget">
    <div v-for="(bubble,index) in localBubbles" :key="index">
      <div class="bubble-card">
        <div  class="bubble-card-content" v-html="bubble.string"></div>
      </div>
      <div class="bubble-card" v-if="bubble.img_url">
      <div class="bubble-card-media" v-if="bubble.img_url"><img :src="thombarUrl+bubble.img_url"/></div>
      </div>
    </div>
    <div class="bot-starttyping" v-if="startTyping">
      <div class="typing-loader"></div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'BubbleWidget',
    props: ['bubbles'],
    data () {
      return {
        localBubbles: [],
        startTyping: true,
        thombarUrl:'http://thumbor.avinashi.com/unsafe/300x350/smart/'
      }
    },
    mounted () {
      let self = this
      let offset = 0
      this.bubbles.forEach((bubble, bubbleIndex) => {
        setTimeout(function () {
          self.appendBubble(bubble, bubbleIndex)
        }, bubble.delay + offset)
        offset += bubble.delay
      })
    },
    methods: {
      checkBubble () {
        if (this.bubbles.length === this.localBubbles.length) {
          console.log(1)
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
      appendBubble (bubble, bubbleIndex) {
        this.localBubbles.push(bubble)
        if (bubbleIndex + 1 === this.bubbles.length) {
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
    },
  }
</script>
