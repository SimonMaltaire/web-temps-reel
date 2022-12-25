<template>
    <div class="relative">
        <v-list>
            <v-list-item v-for="message in messages" :key="message.id" class="pt-2">
                <v-list-item-title>
                    <span class="font-bold">
                        {{ message.createdBy }}
                    </span>
                    <span class="pl-3 font-italic text-body-2">
                        {{ formatDate(message.createdAt) }}
                    </span>
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ message.content }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
        <v-footer outlined absolute bottom padless class="absolute bottom-0 w-100">
            <v-text-field v-model="message" :placeholder="'Message @' + name" @keyup.enter="emitMessage">

            </v-text-field>
        </v-footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs, onMounted } from 'vue';
import { Message } from '../interfaces/interfaces';
import { emitMessage } from '../ws/message';

export default defineComponent({
    name: "Chat",
    props: {
        messages: {
            type: Array as PropType<Message[]>,
            default: () => []
        },
        name: {
            type: String as PropType<string>,
            default: ''
        }
    },
    setup(props, { emit }) {
        const { messages } = toRefs(props);

        const message = ref<string>('');
        
        onMounted(() => {
            console.log("mounted")
        })

        const emitMessage = () => {
            emit('sendMessage', message.value);
            message.value = "";
        }
        const formatDate = (dateString: string): string => {
            const date = new Date(dateString);
            return date.toLocaleString('en', 
                {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric", 
                    hour: "2-digit",
                    minute: "2-digit"
                });
        }

        return { message, emit, formatDate, messages, emitMessage }
    }
})
</script>