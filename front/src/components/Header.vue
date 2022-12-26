<template>
    <v-app-bar title="MotoCycle Energy">
        <template v-slot:prepend>
            <v-app-bar-nav-icon
                @click="emit('updateDisplay')"
            ></v-app-bar-nav-icon>
        </template>
        <template v-slot:append>
            <template v-if="isAdmin">
                <SendNotificationDialog />
                <v-menu location="bottom" class="max-h-96 overflow-y-auto">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            color="primary"
                            dark
                            class="text-none" stacked
                            v-bind="props"
                        >
                            <v-badge :content="requests.length" color="error">
                                <v-icon>mdi-bell</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
    
                    <v-list v-if="requests.length > 0">
                        <v-list-item
                            v-for="item in requests"
                            :key="item.id"
                            :value="item"
                            active-color="primary"
                        >
                            <div class="flex">
                                <div>
                                    <v-list-item-subtitle>{{  item.user.username }} - {{  item.user.email }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>Status: {{ item.status }}</v-list-item-subtitle>
                                </div>
                                <div class="flex pl-2 gap-x-2">
                                    <v-list-item-action @click="acceptRequest(item)" class="flex flex-grow">
                                        <v-btn 
                                            icon="mdi-check"
                                            color="green"
                                            size="sm"
                                        />
                                        <!-- <v-icon color="green">mdi-check</v-icon> -->
                                    </v-list-item-action>
                                    <v-list-item-action @click="denyRequest(item)">
                                        <v-btn 
                                            icon="mdi-close"
                                            color="red"
                                            size="sm"
                                            variant="outlined"
                                        />
                                    </v-list-item-action>
                                </div>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-tooltip v-if="!isAvailable" text="Set available" location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" @click="updateUser({ isAvailable: true })" icon="mdi-lock-open-outline"></v-btn>
                    </template>
                </v-tooltip>
                <v-tooltip v-else text="Set unavailable" location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" @click="updateUser({ isAvailable: false })" icon="mdi-lock-open-variant-outline"></v-btn>
                    </template>
                </v-tooltip>
            </template>
            <v-tooltip v-if="isAuth && !isAdmin" text="Request admin" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click="sendRequest" icon="mdi-chat-plus"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip v-if="isAuth" text="Account" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" @click="router.push({ name: 'profile' })" icon="mdi-account"></v-btn>
                </template>
            </v-tooltip>
            <v-tooltip text="Logout" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn @click="logoutUser" v-bind="props" icon="mdi-logout"></v-btn>                
                </template>
            </v-tooltip>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { requestAdmin, updateRequestWS } from '../ws/requests';
import { useRequestStore } from '../store/requests';
import { Request } from '../interfaces/interfaces';
import SendNotificationDialog from './dialogs/SendNotificationDialog.vue';
import { useChatStore } from '../store/chat';

export default defineComponent({
    name: "AppHeader",
    components: { SendNotificationDialog },
    setup(props, { emit }) {
        const router = useRouter();
        const userStore = useUserStore();
        const requestStore = useRequestStore();
        const chatStore = useChatStore();

        const { updateUser, logout } = userStore;
        const { user, isAvailable, isAuth, isAdmin } = storeToRefs(userStore);

        const { getRequests } = requestStore;
        const { requests } = storeToRefs(requestStore);

        const { createChat, getUserChats } = chatStore;

        onMounted(async () => {
            if (isAdmin) {
                try {
                    await getRequests();
                } catch (e) {
                    console.error(e);
                }
            }
        });

        const logoutUser = async () => {
            logout();
            router.push({ name: "signin" });
        };

        const sendRequest = async () => {
            try {
                requestAdmin({ userId: user.value.id });
            } catch (e) {
                console.error(e);
            }
        }

        const acceptRequest = async (request: Request) => {
            const chat = await createChat({ userIds: [user.value.id, request.user.id]});
            updateRequestWS({ userId: user.value.id, requestId: request.id, chatId: chat.id, status: 'ACCEPTED' });
            // await getUserChats();
            // Send notif to users 'Admin accepted your request, click to access chats'
            // Get chats
            // Create a new chat frontend 
            // Click on it, joinRoom(chatId);
            // WS for messages
        }

        const denyRequest = async (request: Request) => {
            updateRequestWS({ userId: user.value.id, requestId: request.id, chatId: '', status: 'REFUSED' });
        }

        return { router, isAuth, isAdmin, logoutUser, user, emit, sendRequest, requests, acceptRequest, updateUser, denyRequest, isAvailable };
    }
});

</script>
