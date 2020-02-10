import Vue from 'vue'
import App from './App.vue'
import './styles/main.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.prototype.$dictionary = {
  'users': {
    name: 'Имя',
    surName: 'Фамилия',
    login: 'Логин'
  }
};
