import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)

export const routerMap = [
  {
    path: '',
    name: 'index',
    component: Layout,
    redirect: '/index',
    children: [{
      path: '/index',
      component: _import('articleList/index'),
      name: 'index',
      meta: { title: '目录一', icon: 'home', noCache: true },
      children: [{
        path: '',
        component: _import('articleList/list'),
        name: 'list',
        meta: { keepAlive: true }
      }, {
        path: 'detail/:id',
        component: _import('articleList/detail'),
        name: 'detail'
      }]
    }, {
      path: '/about',
      component: _import('about/index'),
      name: 'about',
      meta: { title: '目录二', icon: 'aboutMe', noCache: true, keepAlive: true }
    }, {
      path: '/classes',
      component: _import('classes/index'),
      name: 'classes',
      meta: { title: '目录三', icon: 'classes', noCache: true, keepAlive: true }
    }]
  }
  /* {
    path: '/front',
    name: 'front',
    component: Layout
  }*/
]
export default new Router({
  mode: 'history',
  routes: routerMap,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

