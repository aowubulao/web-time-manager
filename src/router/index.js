import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from "../components/Login.vue"
import Register from "../components/Register.vue"
import Reset from "../components/Reset.vue"
import Home from "../components/Home.vue"
import Index from "../components/home/Index"
import Schedule from "../components/home/Schedule.vue"
import User from "../components/home/User.vue"
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { title: 'Timaner | 登录' },},
  { path: '/register', component: Register, meta: { title: 'Timaner | 注册' } },
  { path: '/reset', component: Reset, meta: { title: 'Timaner | 重置密码' } },
  { path: '/home', component: Home, meta: { title: 'Timaner' },
    children: [
      { path: '/home', redirect: '/home/index' },
      { path: '/home/index', component: Index, meta: { title: 'Timaner' } },
      { path: '/home/schedule', component: Schedule, meta: { title: 'Timaner' } },
      { path: '/home/User', component: User, meta: { title: 'Timaner' } }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router