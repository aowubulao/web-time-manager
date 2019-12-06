import Vue from 'vue'
import ElementUI from 'element-ui'
import 'view-design/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
