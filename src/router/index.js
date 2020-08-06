import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/Index')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login')
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
