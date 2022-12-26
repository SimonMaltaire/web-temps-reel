<template>
    <v-navigation-drawer
        :rail="showMessages"
        permanent
    >
        <v-list-item exact prepend-icon="mdi-chat" append-icon="mdi-chevron-left" title="Messages" value="shared" class="h-14" @click="display">
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item exact prepend-icon="mdi-chat" title="Rechercher" value="shared" class="h-14" @click="display" />

        <v-list-item
            v-for="(user, index) in users"
            :title="user.username"
            :subtitle="user.email"
            :key="user.id"
            :value="user"
            active-color="primary"
            class="px-2"
            @click="emit('rowClicked', user)"
            :prepend-avatar="`https://xsgames.co/randomusers/assets/avatars/pixel/${index}.jpg`"
        >
        </v-list-item>
    </v-navigation-drawer>
</template>

<script lang="ts">

import { defineComponent, ref, PropType } from 'vue';
import { User } from '../interfaces/interfaces';


export default defineComponent({
    name: "Users",
    props: {
        users: {
            type: Array as PropType<User[]>,
            default: () => []
        },
        showSearchUserModal: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const showMessages = ref(true);
        const display = () => showMessages.value = !showMessages.value;

        return { emit, display, showMessages }
    }
});

</script>