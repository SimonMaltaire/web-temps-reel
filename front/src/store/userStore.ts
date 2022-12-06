import { defineStore } from 'pinia'
import { computed, type ComputedRef, onMounted, ref } from "vue";
import { security } from '../service/index';
import { useLocalStorage } from '../composables/storage';

export const useUserStore = defineStore('user', () => {
    const { _signin, _signup } = security;
    const { addToken, removeToken } = useLocalStorage();

    const user = ref<any>({});

    const isAuth = computed(() => {
        return user.value && Object.keys(user.value).length > 1;
    });

    async function signin(payload: { email: string, password: string }) {
        try {
            const res = await _signin(payload);
            user.value = res.user;
            console.log(user.value)
            addToken(res.accessToken);
        } catch (e) {
            throw e;
        }
    }

    async function signup(payload: Object) {
        try {
            const res = await _signup(payload);
        } catch (e) {
            throw e;
        }
    }

    function logout() {
        try {
            user.value = {};
            removeToken();
        } catch (e) {

        }
    }

    return { signin, signup, logout, isAuth, user }
});