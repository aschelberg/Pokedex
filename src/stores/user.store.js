import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useCurrentUser, useFirebaseAuth } from 'vuefire';
import { GoogleAuthProvider } from 'firebase/auth'
import {
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useRouter } from 'vue-router';
import useApi from '@/composables/useApi.js';

const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const googleAuthProvider = new GoogleAuthProvider()
  const auth = useFirebaseAuth() // only exists on client side
  const { request } = useApi();

  const user = useCurrentUser();
  const isAuthenticated = computed(() => !!user.value);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      await request('/pokemon/me', {
        method: 'POST'
      });
      router.push('/pokedex');
    } catch (err) {
      console.log(err)
    }
  };
  
  const logout = async () => {
    await signOut(auth);
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
  }
});

export default useUserStore;