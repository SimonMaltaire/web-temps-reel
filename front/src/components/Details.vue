<template>
    <div v-if="isAdmin" class="rounded-md border bg-gray-100 p-3 text-slate-900">
        <span class="text-xl">In the header, you have multiple actions: </span>
        <ul class="py-4">
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-send" size="sm"></v-icon> Send a notification to all clients
            </li>            
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-bell" size="sm"></v-icon> Requests from client
            </li>
            <li class="flex items-center gap-3">
                <span>
                    <v-icon icon="mdi-lock-open-outline" size="sm"></v-icon>
                    <v-icon icon="mdi-lock-open-variant-outline" size="sm"></v-icon>
                </span>
                Set you status to available or unavailabe
            </li>
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-account" size="sm"></v-icon> Check your account
            </li>
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-logout" size="sm"></v-icon> Logout
            </li>
        </ul>
        <span class="text-xl">In the left navigation: </span>
        <ul class="py-4">
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-forum" size="sm"></v-icon> Access topic, create, update and chat.
            </li>            
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-chat" size="sm"></v-icon> Access acepted request, you can close them at any time
            </li>
        </ul>
    </div>
    <div v-else class="rounded-md border bg-gray-100 p-3 text-slate-900">
        <span class="text-xl">In the header, you have multiple actions: </span>
        <ul class="py-4">
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-chat-plus" size="sm"></v-icon> Request to speak with an admin
            </li>
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-account" size="sm"></v-icon> Check your account
            </li>
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-logout" size="sm"></v-icon> Logout
            </li>
        </ul>
        <span class="text-xl">In the left navigation: </span>
        <ul class="py-4">
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-forum" size="sm"></v-icon> Access topic, chat.
            </li>            
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-chat" size="sm"></v-icon> You can speak with all the clients including an admin if your request as has been accepted
            </li>
        </ul>
        <span class="text-xl">In the right bottom: </span>
        <ul class="py-4">
            <li class="flex items-center gap-3">
                <v-icon icon="mdi-message" size="sm"></v-icon> A chatbot is available to answer all your questions
            </li>            
        </ul>
    </div>
</template>

<script lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../store/userStore';

export default defineComponent({
    name: "Details",
    setup() {
        const { isAdmin } = storeToRefs(useUserStore());

        return { isAdmin }
    }
});

</script>