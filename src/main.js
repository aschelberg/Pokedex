import '@/assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { initializeApp } from 'firebase/app';
import { createEarthoOne } from "@eartho/one-client-vue";

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router(app));
app.use(
  createEarthoOne({
    clientId: import.meta.env.VITE_EARTHO_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  })
);

app.mount("#app");
