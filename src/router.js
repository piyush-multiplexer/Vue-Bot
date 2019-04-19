import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'BotList',
      component: function () {
        return import(/* webpackChunkName: "about" */ './components/BotList.vue')
      },
    },{
      path: '/bot/:botId',
      name: 'Home',
      component: function () {
        return import(/* webpackChunkName: "about" */ './components/Home.vue')
      },
    },
  ],
})
