import Vue from 'vue'
import App from './App.vue'
import notifier from 'codex-notifier';
import './styles/main.css'
import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyBT6KEvSYmB-e9ZHt-D8G6GHpg8xF0b8Vs",
    authDomain: "user-manager-db.firebaseapp.com",
    databaseURL: "https://user-manager-db.firebaseio.com",
    projectId: "user-manager-db",
    storageBucket: "user-manager-db.appspot.com",
    messagingSenderId: "850184853349",
    appId: "1:850184853349:web:2bf0d3f3107b41fc88738c",
    measurementId: "G-8FJER5J63N"
});

Vue.prototype.$db = firebase.firestore();

Vue.prototype.$dictionary = {
    'users': {
        name: 'User name',
        surName: 'User surname',
        login: 'User login',
        id: 'Identifier'
    }
};

Vue.prototype.$getLabel = function (category, key) {
    return this.$dictionary[category] ? this.$dictionary[category][key] : key;
};

Vue.prototype.$notifier = notifier;

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
