// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Vuetify, {
  VApp, // required
  VCard,
  VDatePicker,
  VToolbar,
  VFadeTransition,
  VTextField,
  VBtn,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  components: {
    VApp,
    VCard,
    VDatePicker,
    VToolbar,
    VFadeTransition,
    VTextField,
    VBtn,
  },
  theme: {
    primary: '#E53935',
    secondary:' #FFCDD2',
    accent: ' #3F51B5'
  },
  directives: {
    Ripple,
  },
})
import BubbleWidget from './components/BotWidgets/BubbleWidget'
import VueBot from './plugins/VueBot'

Vue.config.productionTip = false
window.$ = $
window.Bot = new VueBot()
/* eslint-disable no-new */
// Vue.use(TypingLoader)
Vue.component('bubble', BubbleWidget)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
