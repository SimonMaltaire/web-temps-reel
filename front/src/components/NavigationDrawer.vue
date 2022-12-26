<template>
    <v-navigation-drawer
        :rail="display"
        permanent
      >
        <v-list-item
          :prepend-avatar="`https://xsgames.co/randomusers/assets/avatars/pixel/43.jpg`"
          :title="user.username"
          :subtitle="user.email"
          nav
          class="py-2"
        />

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :to="{ name: 'topics' }" exact prepend-icon="mdi-forum" title="Topics" value="myfiles" ></v-list-item>
          <v-list-item :to="{ name: 'messages' }" exact prepend-icon="mdi-chat" title="Messages" value="shared"></v-list-item>
          <!-- <v-list-item :to="{ name: 'users' }" exact prepend-icon="mdi-account" title="Users" value="users"></v-list-item> -->
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, toRefs, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

export default defineComponent({
	props: {
		display: {
		type: Boolean as PropType<boolean>,
			default: false
		}
	},
    setup(props) {
        const router = useRouter();
        const userStore = useUserStore();
        const { user } = storeToRefs(userStore);

        const { display } = toRefs(props);
        
		const randomBetweenOneAndFifty = () => {
			return Math.round(Math.random() * 50);
		}

        return { router, user, display, randomBetweenOneAndFifty }
    }
});

</script>