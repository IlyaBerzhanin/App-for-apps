import { createRouter, createWebHistory } from "vue-router";

import home from "@/views/home"
import apps from "@/views/apps"
import sendacard from "@/views/sendacard"
import login from "@/views/login"
import register from "@/views/register"
import mail from "@/views/mail"

import store from "@/store/index";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: home,
  },
  {
    path: "/apps",
    name: "apps",
    meta: { layout: "main" },
    component: apps,
  },
  {
    path: "/mail",
    name: "mail",
    meta: { layout: "main" },
    component: mail,
  },
  {
    path: "/sendacard",
    name: "sendacard",
    meta: { layout: "main" },
    component: sendacard,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: login,
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty" },
    component: register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && !store.getters.user.data) {
    next({ name: 'login' })
  }
  else next()
})

export default router;
