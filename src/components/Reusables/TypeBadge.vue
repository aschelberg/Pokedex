<script setup>
const props = defineProps({
  pokemonType: {
    type: String
  }
})
</script>

<template>
  <div>
    <div class="flex">
      <div :class="`${pokemonType}`" id="type_style">
        {{ pokemonType[0].toUpperCase() + pokemonType.slice(1) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#type_style {
  padding: 8px 24px;
  border-radius: 25px;
  border-style: solid;
  border-color: #000000;
}

.normal 
  {color: #000000; background: #D2B48C}
.fighting
 {color: #FFFFFF; background: #DC143C}
.flying
 {color: #000000; background: #87CEFA}
.poison
 {color: #FFFFFF; background: #800080}
.ground
 {color: #000000; background: #999999}
.rock
 {color: #000000; background: 	#8B4513}
.bug
 {color: #FFFFFF; background: #483D8B}
.ghost
 {color:  #000000; background: #DCDCDC}
.steel
 {color: #FFFFFF; background: #C0C0C0}
.fire
 {color: #FFFFFF; background: #FF8C00}
.water
 {color: #FFFFFF; background: #00008B}
.grass
 {color: #000000; background: #228B22}
.electric
 {color: #000000; background: #FFFF00}
.psychic
 {color: #FFFFFF; background: #C71585}
.ice
 {color: #000000; background: #AFEEEE}
.dragon
 {color: #000000; background: #708090}
.dark
 {color: #FFFFFF; background: #000000}
.fairy
 {color: #000000; background: #FFC0CB}
.stellar
 {color: #000000; background: #E6E6FA}
.unknown
 {color: #FFFFFF; background: #000000}
.shadow
 {color: #FFFFFF; background: #454545}
</style>