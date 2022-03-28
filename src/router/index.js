import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/views/index/Home.vue' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, 
]

const router = new VueRouter({
  routes
})

export default router
