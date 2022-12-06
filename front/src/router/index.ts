import { createRouter, createWebHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Topics from "../views/Topics.vue";
import Messages from "../views/Messages.vue";
import Signin from '../components/Signin.vue';
import Signup from '../components/Signup.vue';
import NotFound from "../404.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/signin', name: 'signin', component: Signin },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/topics', name: 'topics', component: Topics },
    { path: '/messages', name: 'messages', component: Messages },
    { path: '/404', name: 'not_found', component: NotFound },
    { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;