import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//解决router重复进入报错
VueRouter.prototype.push = function push (location) {
        return originalPush.call(this, location).catch(err => err)
} 
export default new VueRouter({
    mode: 'hash'
    ,routes: [
                {
                    path: '/',                             //首页进入重定向
                    redirect: '/home/dashboard/'
                },
                {
                    path: '/home',
                    component: ()=>import('../pages/home'),
                    children: [
                        {
                            path: 'template',
                            component: ()=>import('../pages/home/children/dashboard/children/template'),
                            meta: {
                                key: 'template'
                            }
                        },
                            {
                                path: 'dashboard',
                                name: 'dashboard',
                                component: ()=>import('../pages/home/children/dashboard'),
                                children: [
                                    {
                                        path: 'template',
                                        component: ()=>import('../pages/home/children/dashboard/children/template'),
                                        meta: {
                                            key: 'template'
                                        }
                                    },
                                ]
                            },
                    ]
                },
                {       //登陆界面
                    path: '/login',
                    name: 'login',
                    component: ()=>import('../pages/login')
                },
                {
                    path: '/test',
                    component: ()=>import('../pages/login')
                },
                
    ],
})