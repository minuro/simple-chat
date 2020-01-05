import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwMSeb_7uOHuSo279JwgYXiZs2WPDQ_-U",
  authDomain: "simple-chat-ba64b.firebaseapp.com",
  databaseURL: "https://simple-chat-ba64b.firebaseio.com",
  projectId: "simple-chat-ba64b",
  storageBucket: "simple-chat-ba64b.appspot.com",
  messagingSenderId: "326815950437",
  appId: "1:326815950437:web:195e5b516d14202231c88c",
  measurementId: "G-31G2PKGCWM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
