// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import $ from 'jquery'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'

Vue.use(DatetimePicker)
import Loader from './plugins/Loader'
import {animateSendButton} from './plugins/animateSendButton'
window.animateSendButton = animateSendButton
import move from 'move-js'
window.move = move
Vue.use(Loader)
import * as VueGoogleMaps from 'vue2-google-maps'
import '../static/assets/css/main.css'
Vue.use(VueGoogleMaps, {
  load: {
    region: 'IN',
    language: 'en',
    libraries: 'places',
    key: 'AIzaSyCgG2RHYJmuCsaY0di7Jz3lEIEbsVhhWfY',
  },
  installComponents: false,
})
Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)
import 'animate.css/animate.min.css'
import VueAnime from 'vue-animejs'

Vue.use(VueAnime)
import LightGallery from 'vue-light-gallery';
Vue.use(LightGallery);

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
