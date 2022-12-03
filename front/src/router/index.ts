import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/message', component: Message },
  { path: '/Login', component: Login },
  { path: '/Register', component: Register },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;