<template>
    <v-card>
            <v-list>
                <v-list-subheader>Messages</v-list-subheader>
    
                <v-list-item
                    v-for="item in userChats"
                    :key="item.id"
                    :value="item"
                    active-color="primary"
                    @click="navigateToChat(item.id)"
                >
    
                    <v-list-item-title v-text="item.name">
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';
import { useChatStore } from '../store/chat';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const router = useRouter();
        
        const chatStore = useChatStore();
        const { getUserChats } = chatStore;
        const { userChats } = storeToRefs(chatStore);

        onMounted(async () => {
            try {
                await getUserChats();
            } catch (e) {
                console.error(e);
            }
        });

        const navigateToChat = (chatId: string) => {
            router.push({ name: 'chat', params: { id: chatId }});
        }

        return { userChats, navigateToChat }
    }
})
</script>

<style scoped>

</style>