import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from "../views/Home.vue";
import Topics from "../views/Topics.vue";
import Messages from "../views/Messages.vue";
import Session from "../views/Session.vue";
import Signin from '../components/Signin.vue';
import Signup from '../components/Signup.vue';
import Room from '../views/Room.vue';
import NotFound from "../404.vue";
import { useUserStore } from "../store/userStore";
import { storeToRefs } from "pinia";

const routes = [
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/signin', name: 'signin', component: Signin, meta: { requiresAuth: false } },
    { path: '/signup', name: 'signup', component: Signup, meta: { requiresAuth: false } },
    { path: '/topics', name: 'topics', component: Topics, meta: { requiresAuth: true } },
    { path: '/messages', name: 'messages', component: Messages, meta: { requiresAuth: true } },
    { path: '/room/:id', name: 'room', component: Room, meta: { requiresAuth: true } },
    { path: '/404', name: 'not_found', component: NotFound, meta: { requiresAuth: false }  },
    { path: '/:catchAll(.*)', component: NotFound, meta: { requiresAuth: false }  }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const { isAuth } = storeToRefs(userStore);

    if (to.meta.requiresAuth && !isAuth.value) {
        next({name: 'signin'})
    } else {
        next()
    }
})

export default router;