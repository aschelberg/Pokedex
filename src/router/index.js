import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '@/views/PokedexView.vue'
import MyPokemon from '@/views/MyPokemon.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'pokedex',
      }
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView,
      meta: {
        title: 'Pokedex',
      }
    },
    {
      path: '/mypokemon',
      name: 'mypokemon',
      component: MyPokemon,
      meta: {
        title: 'My Pokemon',
      }
    }
  ]
})

export default router
