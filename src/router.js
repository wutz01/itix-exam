import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  { path: '/products', name: 'products', component: () => import(/* webpackChunkName: 'error' */ '@/views/product-listing') },
  { path: '/product/:id', name: 'view-product', component: () => import(/* webpackChunkName: 'error' */ '@/views/product') }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
