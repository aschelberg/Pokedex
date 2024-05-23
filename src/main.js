import "@/assets/styles.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { createEarthoOne } from "@eartho/one-client-vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createEarthoOne({
    client_id: import.meta.env.NPM_CLIENT_ID,
  })
);

app.mount("#app");
