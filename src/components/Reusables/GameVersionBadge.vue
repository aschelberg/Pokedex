<script setup>
const props = defineProps({
  pokemonGameVersion: {
    type: String,
  },
});
</script>

<template>
  <div>
    <div>
      <div
        :class="`${pokemonGameVersion}`"
        id="type_style"
        class="text-xs min-w-[768px]:text-md"
      >
        {{ pokemonGameVersion[0].toUpperCase() + pokemonGameVersion.slice(1) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#type_style {
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  border-style: solid;
  text-align: center;
}

.red {
  color: #ffffff;
  background: #d52941;
}
.blue {
  color: #ffffff;
  background: #0466c8;
}
.yellow {
  color: #000000;
  background: #ffea00;
}
.gold {
  color: #000000;
  background: #fdea71;
}
.silver {
  color: #000000;
  background: #e9ecef;
}
.crystal {
  color: #000000;
  background: #e7c6ff;
}
.ruby {
  color: #ffffff;
  background: #c44536;
}
.sapphire {
  color: #ffffff;
  background: #1b4965;
}
.emerald {
  color: #ffffff;
  background: #007200;
}
.firered {
  color: #ffffff;
  background: #ff5714;
}
.leafgreen {
  color: #000000;
  background: #70e000;
}
.diamond {
  color: #000000;
  background: #cae9ff;
}
.pearl {
  color: #000000;
  background: #bbd0ff;
}
.platinum {
  color: #ffffff;
  background: #adb5bd;
}
.heartgold {
  color: #000000;
  background: #edc531;
}
.soulsilver {
  color: #ffffff;
  background: #6c757d;
}
.black,
.black-2 {
  color: #ffffff;
  background: #212529;
}
.white,
.white-2 {
  color: #000000;
  background: #f8f9fa;
  border: #e9ecef;
  border-width: thin;
}
.colosseum {
  color: #000000;
  background: #e6e6fa;
}
.xd {
  color: #ffffff;
  background: #000000;
}
</style>
