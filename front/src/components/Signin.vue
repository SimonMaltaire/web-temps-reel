<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore'
import { createToast } from 'mosha-vue-toastify';
export default defineComponent({
  name: "Signin",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { signin, signup } = userStore;

    const email = ref<string>('');
    const password = ref<string>('');
    const valid = ref<boolean>(false);
    const showPassword = ref<boolean>(false);

    const validate = async () => {
        try {
            await signin({
                email: email.value,
                password: password.value
            });

            await router.push({ name: 'home' });
        } catch (e) {
            createToast("Error while signin in", { type: 'danger', position: 'bottom-right' });
            throw e;
        }
    }
    return { validate, email, password, valid, showPassword, router }
  }
});

</script>

<template>
    <v-card class="pa-6 w-1/2 self-center">
        <template #title>
            Signin by entering your credentials
        </template>
        <v-form 
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field v-model="email" type="email" placeholder="Email" required></v-text-field>
            <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required>
                <template v-slot:append-inner>
                    <v-icon
                        @click="showPassword = !showPassword"
                        :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    />
                    </template>
            </v-text-field>
            <v-btn
                color="success"
                class="mr-4"
                @click="validate"
                >
                Validate
            </v-btn>
            <v-btn
                color="info"
                class="mr-4"
                @click="router.push({ name: 'signup' })"
                >
                Signup instead
            </v-btn>
        </v-form>
    </v-card>
</template>



<style scoped>

</style>