// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Bubble from './components/BotWidgets/Bubble'
import VueBotTwo from './plugins/VueBotTwo'
Vue.config.productionTip = false
window.$ = $
window.Bot = new VueBotTwo()
/* eslint-disable no-new */
// Vue.use(TypingLoader)
Vue.component('bubble', Bubble)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
