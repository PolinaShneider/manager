import Vue from 'vue'
import App from './App.vue'
import './styles/main.css'
import firebase from "firebase";

import 'firebase/firestore';

Vue.config.productionTip = false;

const firebaseConfig = {
    apiKey: "AIzaSyBT6KEvSYmB-e9ZHt-D8G6GHpg8xF0b8Vs",
    authDomain: "user-manager-db.firebaseapp.com",
    databaseURL: "https://user-manager-db.firebaseio.com",
    projectId: "user-manager-db",
    storageBucket: "user-manager-db.appspot.com",
    messagingSenderId: "850184853349",
    appId: "1:850184853349:web:2bf0d3f3107b41fc88738c",
    measurementId: "G-8FJER5J63N"
};

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

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// db.collection("users").add({
//     name: "Simon",
//     surName: "Safonov",
//     login: "vuety"
// })
//     .then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });

export function getUsers() {
    firebase.initializeApp(firebaseConfig);
    return firebase.firestore().collection("users").get().then((querySnapshot) => {
        return querySnapshot
    }).then(({docs}) => {
        return Array.from(docs).map(doc => doc.data())
    });
}
