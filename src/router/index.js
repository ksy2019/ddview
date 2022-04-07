import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: 'all',
    component: ()=>import('@/views/menuEditor/index.vue' ),
    children: [
    ]
  },
  {
    path: '/pageeditor',
    name: 'pageeditor',
    component: ()=>import('@/views/index/Home.vue' )
  },
  {
    path: '/menueditor',
    name: 'menueditor',
    component: ()=>import('@/views/menuEditor/index.vue' ),
    children: [
    ]
  },
  {
    path: '/apieditor',
    name: 'menueditor',
    component: ()=>import('@/views/apiEditor/index.vue' ),
    children: [
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
