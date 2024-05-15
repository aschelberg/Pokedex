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

const calcStdHeight = (value) => ((value/10)*39.2701).toFixed(0)
const calcPounds = (value) => ((value/10) * 2.2).toFixed(1)


</script>

<template>
  <div class="min-h-full">
    
    <main>
      <div class="container mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- Your content -->
        <div class="flex justify-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 border-b-2 shadow-sm">
          <h1 class="text-3xl font-semibold tracking-tight text-gray-900">{{ pokemon.name.toUpperCase() }}</h1>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} Picture`" class="m-auto w-[75%] h-[75%]">
            <div class="container px-4 py-10 bg-yellow-100 mx-auto">
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