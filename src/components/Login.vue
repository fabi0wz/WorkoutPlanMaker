

<script>
import { ref } from 'vue';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { setLogLevel } from 'firebase/app';

export default {
    setup() {
        const user = ref(null);
        const username = ref('');
        const password = ref('');

        // Listen for changes in user authentication state
        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser;
        });
        const signInWithGoogle = async () => {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
            }
            catch (error) {
                console.error('Error signing in:', error);
            }
        };

        const signInWithEmailPassword = async () => {
          const auth = getAuth(); // Get the auth instance
          try {
            await signInWithEmailAndPassword(auth, username.value, password.value);
            // Clear the input fields after successful login
            username.value = '';
            password.value = '';
          } catch (error) {
            alert('Email or Password are Incorrect', error);
          }
        };

        // Sign out
        const signUserOut = async () => {
            try {
                await signOut(auth);
            }
            catch (error) {
                console.error('Error signing out:', error);
            }
        };
        return { user, username, password, signInWithGoogle, signUserOut, signInWithEmailPassword };
    },
    mounted() {
    },
    components: { setLogLevel }
};
</script>


<template>
  <div>
    <div v-if="!user">

      <h1>Login</h1>
      <div id="usernameField">
        <div>Email</div>
        <input type="text" placeholder="" v-model="username" />
      </div>
      <div id="passwordField">
        <div>Password</div>
        <input type="password" v-model="password" />
      </div>
      <button @click="signInWithEmailPassword">Sign In</button>
      <button>
      <RouterLink to="/signup">Create Account</RouterLink>
      </button>
      <div>
        <RouterLink to="/recover"> Forgot Password</RouterLink>
      </div>
      <div>
        <img src="../assets/google.svg" @click="signInWithGoogle"/>
      </div>
    </div>

    <div v-if="user">
      <p>Welcome, {{ user.displayName }}!</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>