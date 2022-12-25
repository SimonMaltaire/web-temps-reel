<template>
    <div>
        <v-list>
            <v-list-item 
                v-for="(user, index) in users" 
                :key="user.id" 
                :value="user" 
                active-color="primary"
                @click="emit('rowClicked', user)"
            >
                <template v-slot:prepend>
                    <v-avatar>
                        <v-img :src="`https://xsgames.co/randomusers/assets/avatars/pixel/${index}.jpg`"></v-img>
                    </v-avatar>
                </template>

                <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </div>
</template>

<script lang="ts">

import { defineComponent, ref, PropType } from 'vue';
import { User } from '../interfaces/interfaces';


export default defineComponent({
    name: "Users",
    props: {
        users: {
            type: Array as PropType<User[]>,
            default: () => []
        }
    },
    setup(props, { emit }) {
        return { emit }
    }
});

</script>