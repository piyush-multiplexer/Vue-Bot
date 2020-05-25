// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import $ from 'jquery'
import Vuetify from 'vuetify'
import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'
import Loader from './plugins/Loader'
import { animateSendButton } from './plugins/animateSendButton'
import move from 'move-js'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'vuetify/dist/vuetify.min.css'
import '../static/assets/css/main.css'
import 'animate.css/animate.min.css'
import VueAnime from 'vue-animejs'
import LightGallery from 'vue-light-gallery'
import VueTypedJs from 'vue-typed-js'
import BubbleWidget from './components/BotWidgets/BubbleWidget'

Vue.use(DatetimePicker)
window.animateSendButton = animateSendButton
window.move = move
Vue.use(Loader)
Vue.use(VueGoogleMaps, {
  load: {
    region: 'IN',
    language: 'en',
    libraries: 'places',
    key: '',
  },
  installComponents: false,
})
Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)

Vue.use(VueAnime)
Vue.use(LightGallery)

Vue.use(VueTypedJs)

Vue.use(Vuetify)

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
