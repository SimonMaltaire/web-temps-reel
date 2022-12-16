import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Session from "../views/Session.vue";
import NotFound from "../404.vue";
import Signin from '../components/Signin.vue';
import Signup from '../components/Signup.vue';
import Room from '../components/Room.vue';
import Topics from "../components/Topics.vue";
import Messages from "../components/Messages.vue";
import {useUserStore} from "../store/userStore";

const routes = [
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true },
        children: [
            { path: '/topics', name: 'topics', component: Topics, meta: { requiresAuth: true } },
            { path: '/messages', name: 'messages', component: Messages, meta: { requiresAuth: true } },
            { path: '/room/:id', name: 'room', component: Room, meta: { requiresAuth: true } },
        ]
    },
    { path: '/session', name: 'session', component: Session, meta: { requiresAuth: false }, redirect: 'signin',
        children: [
            { path: '/signin', name: 'signin', component: Signin },
            { path: '/signup', name: 'signup', component: Signup },
        ]
    },
    { path: '/404', name: 'not_found', component: NotFound, meta: { requiresAuth: false }  },
    { path: '/:catchAll(.*)', component: NotFound, meta: { requiresAuth: false }, redirect: 'not_found' }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});


export default router;