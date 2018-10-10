import Vue from 'vue'
import Router from 'vue-router'
// import store from './store'
import Home from './views/Home.vue'
import Products from './views/products.vue'
import Dashboard from './views/dashboard'

Vue.use(Router)
// TODO Authenticated Routes including LOGIN

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'products',
          component: Products
        },
        {
          path: 'cart',
          name: 'cart',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/cart.vue')
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('./views/checkout.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('./views/login.vue')
        },
        {
          path: 'profile/:id',
          name: 'profile',
          component: () => import('./views/profile.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
