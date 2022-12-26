<template>
    <div class="text-center">
        <v-dialog
            v-model="this.$props.dialog"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="primary"
                    v-bind="props"
                >
                    Open Dialog
                </v-btn>
            </template>

            <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="this.dialog = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        dialog: true
    },
    setup() {
        const test = ref(true);
        return {test}
    }
}
</script>

<style scoped>

</style>