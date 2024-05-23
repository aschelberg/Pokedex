import { createRouter, createWebHistory } from "vue-router";
import PokedexView from "@/views/PokedexView.vue";
import MyPokemonView from "@/views/MyPokemonView.vue";
import PokemonView from "@/views/PokemonView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";

const router = createRouter({
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
        // mustBeAuthenticated: true
      },
    },
    {
      path: "/pokemon/:name",
      name: "pokemonOverview",
      component: PokemonView,
      meta: {
        title: "Pokemon View",
        // mustBeAuthenticated: true
      },
    },
    {
      path: "/mypokemon",
      name: "mypokemon",
      component: MyPokemonView,
      meta: {
        title: "My Pokemon",
        // mustBeAuthenticated: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
  ],
});

export default router;
