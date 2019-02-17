import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Home from '@/components/Home'
import Modal from '@/components/Modal'
import store from './store'
import './registerServiceWorker'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
