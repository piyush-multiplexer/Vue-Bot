<template>
  <div class="cardDisplay">
    <div v-html="widgetData.displayText"></div>
    <div class="card-group">
      <div class="single-card" v-for="card in widgetData.options">
        <img @click="setCardValue(card)" :src="card.url" :alt="card.value">
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
    width: 88vw;
    padding: 1rem;
    display: flex;
    overflow-x: scroll;
    scroll-padding: 0 50%;
    scroll-snap-type: x mandatory;
  }

  .single-card {
    scroll-snap-align: center;
    display: inline-block;
    border-radius: 3px;
    font-size: 0;
    margin-right: 3rem;
  }
</style>
