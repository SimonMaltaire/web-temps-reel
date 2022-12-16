import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import router from './router';
import { createPinia } from 'pinia';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

import 'v-calendar/dist/style.css';
import VCalendar from 'v-calendar';

// Use plugin with defaults

//vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(vuetify);
app.use(router);
app.use(VCalendar, {})

app.mount('#app');

import './ws/message';