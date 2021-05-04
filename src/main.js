import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min.js";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import firebaseActions from '@/store/firebaseActions'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const firebaseConfig = {
  apiKey: "AIzaSyDgxb4KWUFcKfPUHX9V76M0R_fesgwPgU4",
  authDomain: "scrimba-crm.firebaseapp.com",
  databaseURL:
    "https://scrimba-crm-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrimba-crm",
  storageBucket: "scrimba-crm.appspot.com",
  messagingSenderId: "94806750930",
  appId: "1:94806750930:web:999df315631d2d9f481f0b",
  measurementId: "G-VP9HGCZ2TS",
};

const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
}

firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(router)
  .use(store)
  .use(Toast, toastOptions)
  .mount("#app");


firebaseActions.listenChangesInUserMessages()


