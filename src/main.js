import Vue from 'vue'
import ElementUI from 'element-ui'
import 'view-design/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

import md5 from 'js-md5'
import cookie from 'vue-cookie'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Vue.prototype.$md5 = md5
Vue.prototype.$cookie = cookie;
Vue.prototype.$nprogress = NProgress;

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
