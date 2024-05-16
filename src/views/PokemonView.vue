<script setup>
import usePokemon from "@/composables/usePokemon.js"
import TypeBadge from "@/components/Reusables/TypeBadge.vue"
import { useRoute } from "vue-router";
import { ArrowLongLeftIcon } from "@heroicons/vue/20/solid";

const route = useRoute();

const { getPokemon } = usePokemon();
const pokemon = await getPokemon(route.params.name)
console.log(pokemon)

const calcStdHeight = (value) => ((value/10)*39.2701).toFixed(0)
const calcPounds = (value) => ((value/10) * 2.2).toFixed(1)

</script>

<template>
  <div class="min-h-full">
    <main>
      <div class="container mx-auto max-w-7xl pb-6 sm:px-6 lg:px-8">
        <!-- Pokemon Name banner -->
        <div class="flex pb-6 border-b-2 shadow-sm">
          <RouterLink :to="'/pokedex'">
            <button class="inline-flex items-center gap-x-1.5 rounded-md bg-white border border-grey-400 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-blue-400 focus-visible:outline-offset-0"><ArrowLongLeftIcon class="-ml-0.5 h-5 w-5 align-middle"/>Go Back</button>
          </RouterLink>
          <!-- <h1 class="flex justify-center text-3xl font-semibold text-gray-900">{{ pokemon.name.toUpperCase() }}</h1> -->
        </div>
        <!-- Your content -->
        <div class="flex justify-center gap-2">
          <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} Picture`" class="m-auto w-[100%] h-[75%]">
          
          <!-- Characteristics -->
          <div class="container px-4 py-10 bg-yellow-100 mx-auto">
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
              <div class="flex justify-left gap-2 py-2">
                
              </div>
            </div>

          </div>

        </div>
      </div>
      <!-- <div v-for="game in pokemon.game_indices">
        {{ game.version.name[0].toUpperCase() }}{{ game.version.name.slice(1) }}
      </div> -->
    </main>
  </div>
</template>

<style lang="scss" scoped>

</style>