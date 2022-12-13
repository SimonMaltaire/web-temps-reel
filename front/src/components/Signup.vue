<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { createToast } from 'mosha-vue-toastify';

export default defineComponent({
  name: "Signup",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { signup } = userStore; 

    const username = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');
    const valid = ref<boolean>(false);
    const showPassword = ref<boolean>(false);
    const showPasswordAgain = ref<boolean>(false);

    const validate = async () => {
        try {
            await signup({
                username: username.value,
                email: email.value,
                password: password.value,
                isAdmin: false
            });
            createToast("Account created succesfully", { type: 'success', position: 'bottom-right' });
            router.push({ name: 'signin' });
        } catch (e) {
            createToast("Error while creating account", { type: 'danger', position: 'bottom-right' });
        }
    }
    return { validate, username, email, password, valid, showPassword, showPasswordAgain, router }
  }
});

</script>

<template>
    <v-card class="pa-6">
        <template #title>
            Signup by entering your credentials
        </template>
        <v-form 
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field v-model="username" type="text" placeholder="Username" required></v-text-field>
            <v-text-field v-model="email" type="email" placeholder="Email" required></v-text-field>
            <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password" required>
                <template v-slot:append-inner>
                    <v-icon
                        @click="showPassword = !showPassword"
                        :icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    />
                </template>
            </v-text-field>
            <v-text-field v-model="password" :type="showPasswordAgain ? 'text' : 'password'" placeholder="Password again" required>
                <template v-slot:append-inner>
                    <v-icon
                        @click="showPasswordAgain = !showPasswordAgain"
                        :icon="showPasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
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
                @click="router.push({ name: 'signin' })"
                >
                Signin instead
            </v-btn>
        </v-form>
    </v-card>
</template>

<style scoped>

</style>