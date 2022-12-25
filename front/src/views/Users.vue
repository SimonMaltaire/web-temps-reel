<template>
    <v-row no-gutters class="h-100">
        <v-col cols="4">
            <v-sheet class="pa-2">
                <UserList v-if="users.length > 0" :users="users.filter(u => u.id !== user.id)" @rowClicked="setSelectedUser"/>
                <div v-else>No users</div>
            </v-sheet>
        </v-col>
       
    
        <v-col class="pa-2 border-l border-sky-500">
            <v-sheet class="h-100">
                <MessageTemplate 
                    v-if="selecteUser" 
                    :messages="messages" 
                    :name="selecteUser.username" 
                    @sendMessage="sendMessage"
                    class="h-100" 
                />
                <div v-else>
                    Select a discussion
                </div>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent, ref, onMounted } from 'vue';
import MessageTemplate from '../components/MessageTemplate.vue';
import UserList from '../components/UserList.vue';
import { User } from '../interfaces/interfaces';
import { useUserStore } from '../store/userStore';
import { useChatStore } from '../store/chat';
import { emitChatMessage } from '../ws/chat';
import { joinRoom } from '..';

export default defineComponent({
    name: "Users",
    components: { UserList, MessageTemplate },
    setup() {
        const userStore = useUserStore();
        const chatStore = useChatStore();

        const { getNonAdminUsers} = userStore;
        const { users, user } = storeToRefs(userStore);

        const { createChat, getChatMessages } = chatStore;
        const { messages, chat } = storeToRefs(chatStore);

        const selecteUser = ref();

        const setSelectedUser = async (userToChatWith: User) => {
            selecteUser.value = userToChatWith;
            try {
                const chat = await createChat({ userIds: [userToChatWith.id, user.value.id] });
                joinRoom(chat.id);
                await getChatMessages(chat.id);
            } catch (e) {
                console.error(e);
            }
        }

        const sendMessage = (message: string) => {
            emitChatMessage({ senderId: user.value.id, chatId: chat.value.id, content: message})
        }

        onMounted(async () => {
            try {
                await getNonAdminUsers();
            } catch (e) {
                console.error(e);
            }
        });

        return { users, setSelectedUser, selecteUser, sendMessage, messages, user }
    }
});

</script>