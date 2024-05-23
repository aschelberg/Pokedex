import { createRouter, createWebHistory } from "vue-router";
import { createAuthGuard } from '@eartho/one-client-vue';
import { storeToRefs } from 'pinia';
import PokedexView from "@/views/PokedexView.vue";
import MyPokemonView from "@/views/MyPokemonView.vue";
import PokemonView from "@/views/PokemonView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import useUserStore from '@/stores/user.store.js';

const router = (app) => {
  return createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        redirect: {
          name: "pokedex",
        },
      },
      {
        path: "/pokedex",
        name: "pokedex",
        component: PokedexView,
        meta: {
          title: "Pokedex",
          mustBeAuthenticated: true
        },
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/pokemon/:name",
        name: "pokemonOverview",
        component: PokemonView,
        meta: {
          title: "Pokemon View",
          mustBeAuthenticated: true
        },
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/mypokemon",
        name: "mypokemon",
        component: MyPokemonView,
        meta: {
          title: "My Pokemon",
          mustBeAuthenticated: true
        },
        beforeEnter: createAuthGuard(app)
      },
      {
        path: "/login",
        name: "login",
        component: LoginView
      },
      {
        path: "/logout",
        name: "logout",
        component: LogoutView
      }
    ],
  });
}

export default router;
