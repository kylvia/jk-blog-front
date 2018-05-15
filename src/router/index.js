import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Layout,
      children: [{
        path: 'index',
        // component: _import('dashboard/index'),
        name: 'index',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }]
    }
    /* {
      path: '/front',
      name: 'front',
      component: Layout
    }*/
  ]
})
