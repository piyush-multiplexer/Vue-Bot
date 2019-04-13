<template>
  <div class="cardDisplay">
    <div v-html="widgetData.displayText"></div>
    <div class="card-group">
      <div class="single-card" v-for="card in widgetData.options">
        <img class="single-card-image" @click="setCardValue(card)" :src="card.url" :alt="card.value">
        <div class="single-card-content" v-html="card.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cardDisplay',
    props: ['widgetData', 'widgetId'],
    data () {
      return {}
    },
    methods: {
      setCardValue (btn) {
        this.$forceUpdate()
        this.$parent.toggleInput()
        this.$parent.hideWidget(this.widgetId)
        this.$parent.sendBotMessage(btn.value)
      },
    },
  }
</script>

<style scoped>
  .card-group {
    width: 90vw;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .card-group::-webkit-scrollbar {
    display: none;
  }

  .single-card {
    cursor: pointer;
    border: 2px solid #71a0ff;
    margin: 2px;
    display: inline-block;
    height: 100%;
    border-radius: 4%;
    -webkit-overflow-scrolling: touch;
  }

  .single-card-image {
    height: 25vh;
    width: 25vh;
  }
</style>
