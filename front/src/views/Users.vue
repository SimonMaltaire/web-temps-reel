<template>
    <UserList 
        v-if="users.length > 0 || acceptedRequests.length > 0" 
        :users="isAdmin ? acceptedRequests.map(request => request.user) : users.filter(u => u.id !== user.id)" 
        @rowClicked="setSelectedUser"
    />
    <div v-else>No users</div>

    <MessageTemplate
        v-if="selecteUser"
        :messages="messages"
        :name="selecteUser.username"
        @sendMessage="sendMessage"
        class="h-100"
    >
        <template #header v-if="isAdmin">
            <v-btn @click="closeRequest" variant="outlined" color="red">Close request</v-btn>
        </template>
    </MessageTemplate>
    <div v-else>
        Select a discussion
    </div>
</template>

<script lang="ts">

import { storeToRefs } from 'pinia';
import { defineComponent, ref, onMounted } from 'vue';
import MessageTemplate from '../components/MessageTemplate.vue';
import UserList from '../components/UserList.vue';
import { User } from '../interfaces/interfaces';
import { useUserStore } from '../store/userStore';
import { useChatStore } from '../store/chat';
import { useRequestStore } from '../store/requests';
import { emitChatMessage } from '../ws/chat';
import { joinRoom } from '..';
import { updateRequestWS } from '../ws/requests';

export default defineComponent({
    name: "Users",
    components: { UserList, MessageTemplate },
    setup() {
        const userStore = useUserStore();
        const chatStore = useChatStore();
        const requestStore = useRequestStore();

        const { getNonAdminUsers, getUser } = userStore;
        const { users, user, isAdmin } = storeToRefs(userStore);

        const { createChat, getChatMessages, getRequestAdmin } = chatStore;
        const { messages, chat } = storeToRefs(chatStore);

        const { getAcceptedRequests } = requestStore;
        const { acceptedRequests } = storeToRefs(requestStore);

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

        const closeRequest = () => {
            updateRequestWS({ userId: user.value.id, chatId: chat.value.id, status: 'COMPLETED' });
            // Set request to COMPLETED
        }

        onMounted(async () => {
            try {
                await getUser();
                if (user.value.isAdmin) {
                    await getAcceptedRequests();
                } else {
                    await getNonAdminUsers();
                    const requestAdmin = await getRequestAdmin();
                    users.value.unshift(requestAdmin[0]);
                }
            } catch (e) {
                console.error(e);
            }
        });

        return { users, setSelectedUser, selecteUser, acceptedRequests, closeRequest, sendMessage, messages, user, isAdmin }
    }
});

</script>