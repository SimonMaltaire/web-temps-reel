import { defineStore } from 'pinia'
import { computed, type ComputedRef, onMounted, ref } from "vue";
import { security, user as userApi } from '../service/api';
import { token } from '../service';
import { User } from '../interfaces/interfaces';
import { joinRoom, leaveRoom } from '..';

export const useUserStore = defineStore('user', () => {
    const { _signin, _signup, _signinWithToken } = security;
    const { _updateUser, _getNonAdminUsers } = userApi;

    const user = ref<User>({});
    const users = ref<User[]>([]);

    const isAuth = computed(() => {
        return user.value && Object.keys(user.value).length > 1;
    });

    const isAdmin = computed(() => {
        return isAuth && user.value.isAdmin;
    });

    const isAvailable = computed(() => {
        return user.value.isAvailable;
    });

    function toggleDisponibily() {
        if (user.value.isAvailable) {
            joinRoom("admin-room-requests");
        } else {
            leaveRoom("admin-room-requests")
        }
    }

    async function getNonAdminUsers() {
        try {
            const res = await _getNonAdminUsers();
            users.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function updateUser(payload: { isAvailable: boolean }) {
        try {
            const res = await _updateUser(payload);
            user.value = res;
            toggleDisponibily();
        } catch (e) {
            throw e;
        }
    }
    
    async function signin(payload: { email: string, password: string }) {
        try {
            const res = await _signin(payload);
            user.value = res.user;
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

    return { signin, signup, signinWithToken, users, logout, toggleDisponibily, getNonAdminUsers, updateUser, isAuth, isAdmin, isAvailable, user }
});