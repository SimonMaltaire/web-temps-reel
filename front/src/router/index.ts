import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from "../layouts/HomeLayout.vue";
import SessionLayout from "../layouts/SessionLayout.vue";
import MessageLayout from "../layouts/MessageLayout.vue";
import Home from "../views/Home.vue";
import Message from "../views/Message.vue";
import Room from "../views/Room.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../404.vue";

const routes = [
    {
        path: '/session',
        component: SessionLayout,
        children: [
            {path: '', redirect: '/session/login'},
            { path: 'login', name: 'login', component: Login },
            { path: 'register', name: 'register', component: Register },
        ]
    },
    {
        path: '/',
        component: HomeLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            }
        ]
    },
    {
        path: '/message',
        component: MessageLayout,
        children: [
            {
                path: '',
                name: 'message',
                component: Message
            },
            {
                path: '/room',
                name: 'room',
                component: Room
            }
        ]
    },
    { path: '/404', name: 'not_found', component: NotFound },
    { path: '/:catchAll(.*)', redirect: '/404' }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;