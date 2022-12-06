<template>
    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
                :title="user.username"
                :subtitle="user.email"
            ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item :to="{ name: 'topics' }" exact prepend-icon="mdi-folder" title="Topics" value="myfiles" ></v-list-item>
            <v-list-item :to="{ name: 'messages' }" exact prepend-icon="mdi-chat" title="Messages" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

export default defineComponent({
    setup() {
        const router = useRouter();
        const userStore = useUserStore();

        const { user } = storeToRefs(userStore);

        return { router, user }
    }
});

</script>