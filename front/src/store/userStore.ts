import { defineStore } from 'pinia'
import { computed, type ComputedRef, onMounted, ref } from "vue";
import { security } from '../service/api';
import { token } from '../service/index';

export const useUserStore = defineStore('user', () => {
    const { _signin, _signup, _signinWithToken } = security;

    const user = ref<any>({});

    const isAuth = computed(() => {
        return user.value && Object.keys(user.value).length > 1;
    });

    async function signin(payload: { email: string, password: string }) {
        try {
            const res = await _signin(payload);
            user.value = res.user;
            console.log(user.value)
            token.value = res.accessToken;
            // addToken(res.accessToken);
        } catch (e) {
            throw e;
        }
    }

    async function signinWithToken(accessToken: string ) {
        try {
            const res = await _signinWithToken(accessToken);
            user.value = res.user;
            token.value = res.accessToken;
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
            token.value = '';
        } catch (e) {

        }
    }

    return { signin, signup, signinWithToken, logout, isAuth, user }
});