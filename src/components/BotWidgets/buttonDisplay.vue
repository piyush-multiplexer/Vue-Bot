<template>
  <div class="buttonDisplay">
    <div v-html="widgetData.displayText"></div>
    <div class="btn-group">
      <template v-for="btn in widgetData.options">
        <button @click="setButtonValue(btn)">{{btn.value}}</button>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'buttonDisplay',
    props: ['widgetData','widgetId'],
    data () {
      return {}
    },
    methods: {
      setButtonValue (btn) {
        this.$forceUpdate()
        this.$parent.toggleInput()
        this.$parent.hideWidget(this.widgetId)
        this.$parent.sendBotMessage(btn.value)
      },
    },
  }
</script>

<style scoped>
  .btn-group button {
    border-radius: 50%;
    background-color: #586eaf;
    border: 1px solid #121180;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
    width: 100%;
    display: block;
  }

  .btn-group button:hover {
    background-color: #f9f9f9;
    color: black;
    border: 1px solid #121180;
  }

  .btn-group button:not(:last-child) {
    border-bottom: none;
  }
</style>
