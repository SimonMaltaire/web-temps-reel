<template>
    <v-dialog
        v-model="dialog"
        persistent
    >
        <template v-slot:activator="{ props }">
            <v-btn
                icon="mdi-send"
                color="primary"
                v-bind="props"
            />
        </template>

        <v-card>
            <v-card-title class="text-h5">
                Send a notification 
            </v-card-title>
            
            <v-card-text>
                <v-form ref="form">
                    <v-text-field v-model="title" type="text" placeholder="Title"></v-text-field>
                    <v-textarea v-model="content" type="text" placeholder="Content ..."></v-textarea>
                </v-form>
            </v-card-text>
                

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    variant="text"
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    variant="text"
                    @click="sendNotification()"
                >
                    Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createToast } from 'mosha-vue-toastify';
import { clientWithoutAuth } from '../../service';
export default defineComponent({
    setup() {
        const form = ref();
        const dialog = ref<boolean>(false);
        const title = ref<string>('');
        const content = ref<string>('');

        const sendNotification = async () => {
            try {
                clientWithoutAuth.post('http://localhost:4000/notifications', {
                        title: title.value,
                        content: content.value
                    })

                reset();
                createToast("Notification sent", { type: 'success', position: 'bottom-right' });
                dialog.value = false;
            } catch (e) {
                console.error(e);
                createToast("Error while sending notification", { type: 'danger', position: 'bottom-right' });
                dialog.value = false;
            }
        }

        const reset = () => {
           form.value.reset()
        }

        return { dialog, title, content, sendNotification, form, reset }
    }
})
</script>