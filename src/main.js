import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store' //vuex套件
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import api from './utils/api.js'

// axios.defaults.headers.common['Authorization'] = store.state.idToken;

Vue.prototype.api = api
Vue.use(BootstrapVue)



export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App) //import App from './App.vue' ，此處的App指的是App.vue的檔案
}).$mount('#app')  //此Vue instance將掛載(mount)在 index.html的body中一個id=app的<div/>中
