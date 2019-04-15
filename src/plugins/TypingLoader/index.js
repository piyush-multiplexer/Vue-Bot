import TypingLoader from './TypingLoader'
import Vue from 'vue'

export default {
  install (Vue, options = {}) {
    let Constr = Vue.extend(TypingLoader)
    let Loader = new Constr()
    Loader.options = Object.assign(Loader.options, options)
    let vm = Loader.$mount()
    document.querySelector('body').appendChild(vm.$el)
    Vue.$typing = Vue.prototype.$typing = (options) => {
      Loader.startTyping(options)
    }
    Vue.$typing.start = Vue.prototype.$typing.start = (options) => {
      Loader.startTyping(options)
    }
    Vue.$typing.stop = Vue.prototype.$typing.stop = (options) => {
      Loader.stopTyping(options)
    }
  },
}
