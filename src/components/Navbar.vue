<script setup>
import { onMounted, ref } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase auth related functions
import { auth } from '../../firebase'; // Adjust the import path as needed
import { useRouter } from 'vue-router'; // Import Vue Router

const user = ref(null);
const router = useRouter();

// Listen for changes in user authentication state
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });
});

const signOutAndRedirect = async () => {
  try {
    await signOut(auth);
    router.push('/login'); // Redirect to the login page after signing out
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>

<template>
    <div class="navbar">
      <div v-if="user">
        <router-link to="/">Home</router-link>
      </div>
      <div v-if="user">
        Hello
      </div>
      <div v-if="user">
        <a @click="signOutAndRedirect">Sign Out</a>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
</template>

<style scoped>
    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        background-color: white;
        color: purple;
    }
</style>