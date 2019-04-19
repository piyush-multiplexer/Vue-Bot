import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/list',
      name: 'BotList',
      component: function () {
        return import(/* webpackChunkName: "about" */ './components/BotList.vue')
      },
    }, {
      path: '/:botId',
      name: 'BotHome',
      component: function () {
        return import(/* webpackChunkName: "about" */ './components/BotHome.vue')
      },
    },
  ],
})
