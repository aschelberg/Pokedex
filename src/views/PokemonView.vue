<script setup>
import usePokemon from '@/composables/usePokemon.js';
import TypeBadge from '@/components/Reusables/TypeBadge.vue';
import GameVersionBadge from '@/components/Reusables/GameVersionBadge.vue';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid';
import { BookmarkIcon as BookmarkIconFalse } from '@heroicons/vue/24/outline';
import { BookmarkIcon as BookmarkIconTrue } from '@heroicons/vue/20/solid';

const route = useRoute();
const pokemon = ref(null);
const savedPokemon = ref([])
const isSaved = ref(null);
const { getPokemon, myPokemon, savePokemon, removePokemon } = usePokemon();

const calcStdHeight = (value) => ((value / 10) * 39.2701).toFixed(0);
const calcPounds = (value) => ((value / 10) * 2.2).toFixed(1);

const fetchPokemon = async () => pokemon.value = await getPokemon(route.params.name);
fetchPokemon()

const fetchSavedPokemon = async () => {
  savedPokemon.value = await myPokemon();
  isSaved.value = savedPokemon.value.find(p => p.id === pokemon.value.id)
}
fetchSavedPokemon()

const handleSave = async (id) => {
  await savePokemon(id);
  fetchSavedPokemon()
};

const handleRemove = async (id) => {
  await removePokemon(id);
  fetchSavedPokemon()
};

</script>

<template>
  <div v-if="pokemon" class="min-h-full">
    <main>
      <div class="container mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <!-- Pokemon Name banner -->
        <div class="flex pb-6 border-b-2">
          <RouterLink :to="'/pokedex'">
            <button
              class="inline-flex items-center gap-x-1.5 rounded-md bg-red-500 border border-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 hover:border-blue-400 focus-visible:outline-offset-0"
            >
              <ArrowLongLeftIcon class="-ml-0.5 h-5 w-5 align-middle" />Go Back
            </button>
          </RouterLink>
        </div>
        <!-- Your content -->
        <div
          class="inline justify-center gap-2 shadow-sm shadow-gray-400 sm:flex"
        >
          <img
            :src="pokemon.sprites.front_default"
            :alt="`${pokemon.name} Picture`"
            class="m-auto w-[70%] h-[50%]"
          />

          <!-- Characteristics -->
          <div class="container px-6 py-8 mx-auto shadow-sm shadow-gray-400">
            <div class="flex justify-between pb-2">
              <div class="text-2xl font-medium text-gray-900">
                #{{ pokemon.id.toString().padStart(4, "0") }}
              </div>
              <div
                class="flex gap-1 align-items justify-end"
              >
                <button v-if="!isSaved" @click="handleSave(pokemon.id)" class="flex text-blue-700 cursor-pointer hover:text-red-500">
                  <h1 class="flex my-auto">Add to Saved</h1>
                  <BookmarkIconFalse class="h-8 w-6" />
                </button>
                <button v-else @click="handleRemove(pokemon.id)" class="flex text-blue-700 cursor-pointer hover:text-red-500">
                  <h1 class="flex my-auto">Saved</h1>
                  <BookmarkIconTrue class="h-8 w-6" />
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-2">
              <div
                class="block gap-2 min-w-[820px]:grid min-w-[820px]:grid-cols-2"
              >
                <div class="flex justify-between pb-2">
                  <span class="font-semibold pr-2">Height:</span>
                  <div>
                    <span
                      >{{ Math.floor(calcStdHeight(pokemon.height) / 12) }} '
                      {{ calcStdHeight(pokemon.height) % 12 }} "</span
                    >
                    <span class="px-2"> | </span>
                    <span>{{ pokemon.height / 10 }} m</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="font-semibold pr-2">Weight:</span>
                  <div>
                    <span>{{ calcPounds(pokemon.weight) }} lbs</span>
                    <span class="px-2"> | </span>
                    <span>{{ pokemon.weight / 10 }} kg</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between pb-2">
                <span class="font-semibold">Abilities:</span>
                <div>
                  <div v-for="a in pokemon.abilities" class="inline-flex px-1">
                    {{
                      a.ability.name[0].toUpperCase() + a.ability.name.slice(1)
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Pokemon Stats -->
            <div>
              <h2 class="font-semibold">Base Stats:</h2>
              <div
                v-for="stat in pokemon.stats"
                class="flex justify-between py-1"
              >
                <h2 class="font-medium">{{ stat.stat.name.toUpperCase() }}:</h2>
                <div>{{ stat.base_stat }}</div>
              </div>
            </div>

            <div class="flex align-items justify-between">
              <h2 class="my-auto pr-2 font-semibold">Type:</h2>
              <div class="flex gap-2 py-2">
                <TypeBadge
                  v-for="t in pokemon.types"
                  :pokemonType="t.type.name"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="p-3 pt-1 min-w-[820]:p-3">
          <div class="text-2xl font-medium text-gray-900">Game Versions:</div>
          <div class="grid grid-cols-4 grid-flow-dense gap-2 py-2">
            <GameVersionBadge
              v-for="g in pokemon.game_indices"
              :pokemonGameVersion="g.version.name"
              class=""
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
