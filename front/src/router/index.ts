import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Topics from "../views/Topics.vue";
import Messages from "../views/Messages.vue";
import Signin from '../components/Signin.vue';
import Signup from '../components/Signup.vue';
import Room from '../views/Room.vue';
import NotFound from "../404.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/signin', name: 'signin', component: Signin },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/topics', name: 'topics', component: Topics },
    { path: '/messages', name: 'messages', component: Messages },
    { path: '/room/:id', name: 'room', component: Room },
    { path: '/404', name: 'not_found', component: NotFound },
    { path: '/:catchAll(.*)', component: NotFound }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
});

export default router;