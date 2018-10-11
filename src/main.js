import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { currency } from './filters/currency'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.filter('currency', currency)

Vue.use(BootstrapVue)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
