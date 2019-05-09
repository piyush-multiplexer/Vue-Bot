<template>
  <div class="BubbleWidget" >
    <div :key="index" v-for="(bubble,index) in localBubbles">
      <div class="bubble-card" v-if="bubble.string">
        <div v-html="bubble.string"
             v-if="typeof bubble.string === 'string' || typeof bubble.string === 'number' "></div>
        <div v-else-if="!bubble.img_url">
          {{bubble.string.address}}
        </div>
      </div>
      <div class="" v-if="bubble.img_url" @keyup.esc="imageIndex=null">
        <LightGallery width="10" :images="[bubble.img_url]" :index="imageIndex" @close="imageIndex=null"></LightGallery>
        <img class="bubble-card" style="cursor: pointer;margin: 0" :src="thombarUrl+bubble.img_url" @click="imageIndex=0"/>
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
        imageIndex: null,
        localBubbles: [],
        startTyping: true,
        thombarUrl: 'http://thumbor.avinashi.com/unsafe/smart/',
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
        // if (bubbleIndex === 0 || bubbleIndex + 1 < this.bubbles.length) {
        this.localBubbles.push(bubble)
        // }
        if (bubbleIndex + 1 === this.bubbles.length) {
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
    },
  }
</script>
<style>
  .light-gallery__modal{
    height: 100vh !important;
    z-index: 9999;
  }
  .loaded{
    width: 50% !important;
  }

  .light-gallery__container{
    transform: translate(-50%, 0%);
    top: calc(50vh - 25%);

  }
</style>
