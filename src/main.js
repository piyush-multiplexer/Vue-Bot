// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import 'animate.css/animate.min.css'
import VueAnime from 'vue-animejs'

Vue.use(VueAnime)
import VueTypedJs from 'vue-typed-js'

Vue.use(VueTypedJs)

Vue.use(Vuetify)
import BubbleWidget from './components/BotWidgets/BubbleWidget'

Vue.config.productionTip = false
window.$ = $
// Vue.use(TypingLoader)
Vue.component('bubble', BubbleWidget)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
