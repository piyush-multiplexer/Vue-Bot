import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/Home.vue')
      },
    }, {
      path: '/list',
      name: 'BotList',
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/BotList.vue')
      },
    }, {
      path: '/list/',
      name: 'BotList',
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/BotList.vue')
      },
    }, {
      path: '/:botId',
      name: 'BotHome',
      component: function () {
        return import(/* webpackChunkName: "about" */ '../components/BotHome.vue')
      },
    },
  ],
})
export default router
