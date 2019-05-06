import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function () {
        return import('../components/Home.vue')
      },
    }, {
      path: '/list/',
      name: 'BotList',
      component: function () {
        return import('../components/BotList.vue')
      },
    },
    {
      path: '/:botId/:hashId?',
      name: 'BotHome',
      component: function () {
        return import('../components/BotHome.vue')
      },
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: function () {
    //     return import('../components/test.vue')
    //   },
    // },
  ],
})
export default router
