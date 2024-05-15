<script setup>
import usePokemon from "@/composables/usePokemon.js"
import TypeBadge from "@/components/Reusables/TypeBadge.vue"

const props = defineProps({
  name: {
    type: String,
  }
})

const { getPokemon } = usePokemon();
const pokemon = await getPokemon(props.name)
console.log(pokemon)

// const calcHeight = (value) => {
//   const measurement = {
//     standard: {
//       feet: `${value*3.28084}`,
//       inches: 
//     },

//   }
//   return value/10
// }

</script>

<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="flex justify-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ pokemon.name.toUpperCase() }}</h1>
      </div>
    </header>
    <main>
      <div class="container mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Your content -->

        <div class="grid grid-cols-2 gap-2">
          <div>
            <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} Picture`" class="w-full h-full">
          </div>

          <div class="container px-4 py-10 bg-yellow-100 mx-auto">
            <div class="grid grid-cols-2 mx-auto pb-3">
              <div><span class="font-bold px-2">Height:</span>{{ pokemon.height }}</div>
              <div><span class="font-bold px-2">Weight:</span>{{ pokemon.weight }} lbs.</div>

            </div>

            <div class="flex pb-3">
              <span class="font-bold px-2">Abilities:</span>
              <div v-for="a in pokemon.abilities" class="px-1">
                  {{ a.ability.name[0].toUpperCase() + a.ability.name.slice(1) }}
              </div>
            </div>
            <div class="pb-3">
              <h2 class="font-bold px-2 pb-1">Type:</h2>
              <div class="flex">
                <TypeBadge v-for="t in pokemon.types"
                :pokemonType="t.type.name"/>
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