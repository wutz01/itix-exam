import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'product' */ '@/views/products/index'),
    redirect: '/products',
    children: [
      { path: 'products', name: 'products', component: () => import(/* webpackChunkName: 'product' */ '@/views/products/listing') },
      { path: 'product/:id', name: 'view-product', component: () => import(/* webpackChunkName: 'product' */ '@/views/products/view') }
    ]
  },

]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
