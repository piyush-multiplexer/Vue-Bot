<template>
  <div class="BubbleWidget">
    <div v-for="(bubble,index) in localBubbles" :key="index">
      <div class="bubble-card">
        <div class="bubble-card-content" v-html="bubble.string"></div>
        <div v-if="bubble.img_url"><img :src="bubble.img_url"/></div>
      </div>
    </div>
    <div class="typing-loader" v-if="startTyping" ></div>
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
      appendBubble (bubble, bubbleIndex) {
        console.log(bubbleIndex)
        this.localBubbles.push(bubble)
        if (bubbleIndex + 1 === this.bubbles.length) {
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
    },
  }
</script>

<style scoped>
  .bubble-card img {
    width: 50%;
  }

  .bubble-card-content {
    word-break: break-word;
    display: inline-block;

  }

  .bubble-card {
    width: fit-content;
    max-width: 70%;
    padding: 1.5%;
    margin: 1%;
    border-radius: 10%;
    background-color: #5086c7;
    color: whitesmoke;
  }

  .typing-loader {
    margin: 60px auto 60px 1px;
    width: 6px;
    height: 6px;
    -webkit-animation: line 1s linear infinite alternate;
    -moz-animation: line 1s linear infinite alternate;
    animation: line 1s linear infinite alternate;
  }

  @-webkit-keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }

  @-moz-keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }

  @keyframes line {
    0% {

      background-color: rgba(0, 0, 0, 1);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    25% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2), 24px 0px 0px 0px rgba(0, 0, 0, 0.2);
    }
    75% {
      background-color: rgba(0, 0, 0, 0.4);
      box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2), 24px 0px 0px 0px rgba(0, 0, 0, 2);
    }
  }
</style>
