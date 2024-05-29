<script setup>
import { watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import useUserStore from '@/stores/user.store.js';

const userStore = useUserStore();
// const { isAuthenticated } = storeToRefs(userStore);
// watchEffect(() => {
//   if (isAuthenticated.value) {
//     window.location.href = '/pokedex';
//   }
// });
</script>

<template>
  <div class="flex justify-center h-screen">
    <div class="flex flex-col max-h-md sm:w-full sm:max-w-sm p-12 bg-blue-600">
      <img class="h-36 w-auto px-4 bg-red-600 shadow-lg shadow-red-600 rounded-lg" src="@/assets/PokemonLogo.png" alt="Pokemon Pokedex" />
      <h1 class="flex justify-center text-md sm:text-xl text-white pt-16">Create a Pokedex Account</h1>
      <button class="flex pt-4" @click="userStore.login">
        <div class="flex w-full justify-center rounded-md bg-white border border-gray-700 py-2 text-md font-normal leading-6 text-gray-700 shadow-sm hover:border-red-500 hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 pr-4">
          <img src="@/assets/web_light_sq_na.svg" alt="Google Icon">
          <div class="flex my-auto align-middle xs:text-xs">Continue with Google</div>
        </div>
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>