import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import PokedexView from '@/views/PokedexView.vue';
import MyPokemonView from '@/views/MyPokemonView.vue';
import PokemonView from '@/views/PokemonView.vue';
import LoginView from '@/views/LoginView.vue';
import LogoutView from '@/views/LogoutView.vue';
import useUserStore from '@/stores/user.store.js';
import { getCurrentUser } from 'vuefire';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'pokedex',
      },
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView,
      meta: {
        title: 'Pokedex',
        mustBeAuthenticated: true
      },
    },
    {
      path: '/pokedex/pokemon/:name',
      name: 'pokemonOverview',
      component: PokemonView,
      meta: {
        title: 'Pokemon View',
        mustBeAuthenticated: true
      },
    },
    {
      path: '/mypokemon',
      name: 'mypokemon',
      component: MyPokemonView,
      meta: {
        title: 'My Pokemon',
        mustBeAuthenticated: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    }
  ],
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.mustBeAuthenticated) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return 'login'
    }
  }
})

export default router;