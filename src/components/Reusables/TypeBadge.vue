<script setup>
const props = defineProps({
  pokemonType: {
    type: String,
  },
});
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
  padding: 2px 10px;
  border-radius: 8px;
  border-style: solid;
  border-color: #000000;
  font-size: 1rem;
}

.normal {
  color: #000000;
  background: #d2b48c;
}
.fighting {
  color: #ffffff;
  background: #dc143c;
}
.flying {
  color: #000000;
  background: #87cefa;
}
.poison {
  color: #ffffff;
  background: #800080;
}
.ground {
  color: #000000;
  background: #999999;
}
.rock {
  color: #000000;
  background: #8b4513;
}
.bug {
  color: #ffffff;
  background: #483d8b;
}
.ghost {
  color: #000000;
  background: #dcdcdc;
}
.steel {
  color: #ffffff;
  background: #c0c0c0;
}
.fire {
  color: #ffffff;
  background: #ff8c00;
}
.water {
  color: #ffffff;
  background: #00008b;
}
.grass {
  color: #000000;
  background: #228b22;
}
.electric {
  color: #000000;
  background: #ffff00;
}
.psychic {
  color: #ffffff;
  background: #c71585;
}
.ice {
  color: #000000;
  background: #afeeee;
}
.dragon {
  color: #000000;
  background: #708090;
}
.dark {
  color: #ffffff;
  background: #000000;
}
.fairy {
  color: #000000;
  background: #ffc0cb;
}
.stellar {
  color: #000000;
  background: #e6e6fa;
}
.unknown {
  color: #ffffff;
  background: #000000;
}
.shadow {
  color: #ffffff;
  background: #454545;
}
</style>
