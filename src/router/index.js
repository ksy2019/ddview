import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/index/Home.vue' )
  },
  {
    path: '/menueditor',
    name: 'menueditor',
    component: ()=>import('@/views/menuEditor/index.vue' ),
    children: [
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
