<template>
    <v-navigation-drawer
        :rail="showMessages"
        permanent
    >
        <v-list-item exact prepend-icon="mdi-unfold-more-vertical" append-icon="mdi-chevron-left" title="Messages" value="shared" class="h-14" @click="display">
        </v-list-item>

        <v-divider></v-divider>

        <v-text-field prepend-inner-icon="mdi-magnify" v-model="search" placeholder="Search"></v-text-field>

        <v-list-item
            v-for="(user, index) in filteredUsers"
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

import { defineComponent, ref, PropType, computed, toRefs } from 'vue';
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
        const { users } = toRefs(props);

        const showMessages = ref(true);
        const display = () => showMessages.value = !showMessages.value;

        const search = ref<string>('');

        const filteredUsers = computed(() => {
            return users.value.filter(user => {
                return user.username.indexOf(search.value) !== -1 ||
                user.email.indexOf(search.value) !== -1
            })
        })
        return { emit, display, showMessages, filteredUsers, search }
    }
});

</script>