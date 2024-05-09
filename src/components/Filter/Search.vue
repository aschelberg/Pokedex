<script setup>
const emit = defineEmits(['search'])

const search = (e) => {
  emit('search', e.target.value);
}

</script>

<template>
  <form class="py-3 px-4 flex items-center">
   <label class="sr-only">Search:</label>
   <div class="relative w-full">
    <input type="text" v-on:input="search" placeholder="Search..." class="px-2 bg-gray-50 border border-gray-300 text-grey-900 rounded-sm w-full">
   </div> 
  </form>
</template>

<style lang="scss" scoped>

</style>