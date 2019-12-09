import Vue from 'vue'
import VueRouter from 'vue-router'
import md5 from 'js-md5'
import cookie from 'vue-cookie'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.prototype.$md5 = md5
Vue.prototype.$cookie = cookie;
Vue.prototype.$nprogress = NProgress;

Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: (resolve) => require(['../components/Login.vue'], resolve), meta: { title: 'Timaner | 登录' },},
  { path: '/register', component: (resolve) => require(['../components/Register.vue'], resolve), meta: { title: 'Timaner | 注册' } },
  { path: '/reset', component: (resolve) => require(['../components/Reset.vue'], resolve), meta: { title: 'Timaner | 重置密码' } },
  { path: '/home', component: (resolve) => require(['../components/Home.vue'], resolve), meta: { title: 'Timaner' },
    children: [
      { path: '/home', redirect: '/home/index' },
      { path: '/home/index', component: (resolve) => require(['../components/home/Index.vue'], resolve), meta: { title: 'Timaner' } },
      { path: '/home/schedule', component: (resolve) => require(['../components/home/Schedule.vue'], resolve), meta: { title: 'Timaner' } },
      { path: '/home/User', component: (resolve) => require(['../components/home/User.vue'], resolve), meta: { title: 'Timaner' } }
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

