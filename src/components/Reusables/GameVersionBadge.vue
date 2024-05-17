<script setup>
const props = defineProps({
  pokemonGameVersion: {
    type: String
  }
})
</script>

<template>
  <div>
    <div>
      <div :class="`${pokemonGameVersion}`" id="type_style" class="text-xs min-w-[768px]:text-md">
        {{ pokemonGameVersion[0].toUpperCase() + pokemonGameVersion.slice(1) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#type_style {
  padding: .25rem 1rem;
  border-radius: .25rem;
  border-style: solid;
  border-color: #000000;
  text-align: center;
}

.red 
  {color: #FFFFFF; background: #dc141b}
.blue
 {color: #FFFFFF; background: rgb(32, 32, 230)}
.yellow
 {color: #000000; background: #fbfb00}
.gold
 {color: #000000; background: #e0d91b}
.silver
 {color: #000000; background: #C0C0C0}
.crystal
 {color: #000000; background: 	#e3cef4}
.ruby
 {color: #FFFFFF; background: #ae0401}
.sapphire
 {color:  #FFFFFF; background: #0F52BA}
.emerald
 {color: #FFFFFF; background: #34d369}
.firered
 {color: #FFFFFF; background: #d52c01}
.leafgreen
 {color: #FFFFFF; background: #07cd28}
.diamond
 {color: #000000; background: #AFEEEE}
.pearl
 {color: #FFFFFF; background: #a674ae}
.platinum
 {color: #FFFFFF; background: #acacac}
.heartgold
 {color: #000000; background: #b1ab06}
.soulsilver
 {color: #FFFFFF; background: #708090}
.black, .black-2
 {color: #FFFFFF; background: #000000}
.white, .white-2
 {color: #000000; border:#000000; border-width: thin;}
.colosseum
 {color: #000000; background: #E6E6FA}
.xd
 {color: #FFFFFF; background: #000000}

</style>