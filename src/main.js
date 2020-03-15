import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta' // пакет для мет
import Vuelidate from 'vuelidate' // пакет для валидации
import Notifications from 'vue-notification' // пакет для уведомлений
import DateFilter from '@/filters/date.filter' // фильтр для дат
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
