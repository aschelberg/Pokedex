<script setup>
import usePokemon from "@/composables/usePokemon.js"
import TypeBadge from "@/components/Reusables/TypeBadge.vue";
import GameVersionBadge from "@/components/Reusables/GameVersionBadge.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { ArrowLongLeftIcon } from "@heroicons/vue/20/solid";
import { BookmarkIcon as BookmarkIconFalse } from "@heroicons/vue/24/outline";
import { BookmarkIcon as BookmarkIconTrue } from "@heroicons/vue/20/solid";

const route = useRoute();
const bookmark = ref(false);

const { getPokemon } = usePokemon();
const pokemon = await getPokemon(route.params.name)
console.log(pokemon)

const calcStdHeight = (value) => ((value/10)*39.2701).toFixed(0)
const calcPounds = (value) => ((value/10) * 2.2).toFixed(1)

const bookmarkToggle = () => {
  bookmark.value = !bookmark.value
  console.log(bookmark.value)
}

</script>

<template>
  <div class="min-h-full">
    <main>
      <div class="container mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <!-- Pokemon Name banner -->
        <div class="flex pb-6 border-b-2 shadow-sm">
          <RouterLink :to="'/'">
            <button class="inline-flex items-center gap-x-1.5 rounded-md bg-white border border-grey-400 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline-offset-0"><ArrowLongLeftIcon class="-ml-0.5 h-5 w-5 align-middle"/>Go Back</button>
          </RouterLink>
          <!-- <h1 class="flex justify-center text-3xl font-semibold text-gray-900">{{ pokemon.name.toUpperCase() }}</h1> -->
        </div>
        <!-- Your content -->
        <div class="flex justify-center gap-2 shadow-sm shadow-gray-400">
          <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} Picture`" class="m-auto w-[100%] h-[75%]">
          
          <!-- Characteristics -->
          <div class="container px-4 py-8 mx-auto shadow-sm shadow-gray-400">
            <div class="flex justify-between pb-2">
              <div class="text-2xl font-medium text-gray-900">
                #{{ pokemon.id.toString().padStart(4, '0') }}
              </div>
              <div class="flex gap-1 align-items hover:text-grey-500 justify-end cursor-pointer" @click="bookmarkToggle()">
                <h1 class="my-auto text-blue-700">Add to Bookmark</h1>
                <BookmarkIconFalse v-if="!bookmark" class="h-8 w-6 text-blue-700"/>
                <BookmarkIconTrue v-else class="h-8 w-6 text-blue-700"/>
              </div>
            </div>
            <!-- <h1 class="flex justify-center text-3xl font-semibold text-gray-900">{{ pokemon.name.toUpperCase() }}</h1> -->
            <div class="grid grid-cols-2 mx-auto pb-3">
              <div>
                <span class="font-semibold pr-2">Height:</span>
                <span>{{ Math.floor(calcStdHeight(pokemon.height)/12)  }}' {{ calcStdHeight(pokemon.height)%12 }}"</span>
                <span class="px-2"> | </span>
                <span>{{ pokemon.height/10 }} m</span>
              </div>
              <div>
                <span class="font-semibold pr-2">Weight:</span>
                <span>{{ calcPounds(pokemon.weight) }} lbs</span>
                <span class="px-2"> | </span>
                <span>{{ pokemon.weight/10 }} kg</span>
              </div>
            </div>

            <div class="flex pb-3">
              <span class="font-semibold">Abilities:</span>
              <div v-for="a in pokemon.abilities" class="px-1">
                  {{ a.ability.name[0].toUpperCase() + a.ability.name.slice(1) }}
              </div>
            </div>
            <div class="pb-3">
              <h2 class="font-semibold">Type:</h2>
              <div class="flex justify-left gap-2 py-2">
                <TypeBadge v-for="t in pokemon.types"
                :pokemonType="t.type.name"/>
              </div>
            </div>

            <!-- Pokemon Stats -->
            <div class="pb-3">
              <h2 class="font-semibold">Base Stats:</h2>
              <div
                v-for="stat in pokemon.stats" 
                class="flex justify-left gap-2 py-2">
                <h2>{{ stat.stat.name.toUpperCase() }}:</h2>
                <div>{{ stat.base_stat }}</div>
              </div>
            </div>

          </div>

        </div>
        <div class="pt-1">
          <div class="text-2xl font-medium text-gray-900" >
            Game Versions:
          </div>
          <div class="grid grid-cols-4 grid-flow-dense gap-2  py-2">
            <GameVersionBadge v-for="g in pokemon.game_indices"
              :pokemonGameVersion="g.version.name"
              class=""/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>