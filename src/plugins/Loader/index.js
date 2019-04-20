import VueLoader from './Loader'
import Vue from 'vue'
import Vuetify, {
  VLayout,
  VDialog,
  VContainer,
  VProgressCircular,
} from 'vuetify/lib'

Vue.use(Vuetify,
  { components: { VLayout, VDialog, VContainer, VProgressCircular } })
export default {
  install (Vue, options = {}) {
    let Constr = Vue.extend(VueLoader)
    let Loader = new Constr()
    Loader.options = Object.assign(Loader.options, options)
    let vm = Loader.$mount()
    document.querySelector('body').appendChild(vm.$el)
    Vue.$loading = Vue.prototype.$loading = (options = { loaderText: 'Loading...' }) => {
      Loader.startLoading(options)
    }
    Vue.$loading.start = Vue.prototype.$loading.start = (options = { loaderText: 'Loading...' }) => {
      Loader.startLoading(options)
    }
    Vue.$loading.stop = Vue.prototype.$loading.stop = (options = { loaderText: 'Loading...' }) => {
      Loader.stopLoading(options)
    }
    Vue.$loading.toggle = Vue.prototype.$loading.toggle = (options = { loaderText: 'Loading...' }) => {
      Loader.toggleLoading(options)
    }
  },
}
