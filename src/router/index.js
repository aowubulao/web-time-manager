import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = ()=>import("../components/Login.vue")
const Register = ()=>import("../components/Register.vue")
const Reset = ()=>import("../components/Reset.vue")
const Home = ()=>import("../components/Home.vue")
const Index = ()=>import("../components/home/Index.vue")
const Schedule = ()=>import("../components/home/Schedule.vue")
const User = ()=>import("../components/home/User.vue")
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