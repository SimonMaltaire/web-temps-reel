<template>
    <v-navigation-drawer
        :rail="showMessages"
        permanent
    >
        <v-list-item exact prepend-icon="mdi-chat" append-icon="mdi-chevron-left" title="Messages" value="shared" class="h-14" @click="display">

        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-plus" title="New Messages" @click="showSearchUserModal.value = true"></v-list-item>
            <v-list-item
                v-for="item in userChats"
                :key="item.id"
                :value="item"
                active-color="primary"
                @click.prevent="setChat(item.id)"
                prepend-icon="mdi-star"
                :title="item.name"
                value="starred"></v-list-item>
        </v-list>

    </v-navigation-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import {defineComponent, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import {useChatStore} from "../../store/chat";
import {joinRoom} from "../../index";

export default {
    name: "MessagesNavigation",
    props: {
        showSearchUserModal: false
    },
    setup() {
        const router = useRouter();
        const userStore = useUserStore();

        const chatStore = useChatStore();
        const { getUserChats } = chatStore;
        const { userChats, currentChatId } = storeToRefs(chatStore);

        const { user } = storeToRefs(userStore);
        const showMessages = ref(true);
        const display = () => showMessages.value = !showMessages.value;

        onMounted(async () => {
            try {
                await getUserChats();
            } catch (e) {
                console.error(e);
            }
        });

        const setChat = (chatId) => {
            try {
                currentChatId.value = chatId
                console.log(chatId)
                console.log(currentChatId.value)
            } catch (e) {
                console.error(e);
            }
        }

        const navigateToChat = (chatId: string) => {
            router.push({ name: 'chat', params: { id: chatId }});
        }

        return { router, user, showMessages, display, userChats, navigateToChat, setChat}
    }
};

</script>