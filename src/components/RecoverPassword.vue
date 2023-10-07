<script>
import { ref } from 'vue';
import { sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; // Import the Firebase method directly
import { auth } from '../../firebase';
import router from '../../router';

export default {
    setup() {
        const email = ref('');
        const emailConfirm = ref(true); // Create a reference to the email confirmation boolean (to display the label)

        const emailSent = ref(false);

        const sendResetEmail = async () => { // Rename the function to avoid conflicts
            validateEmail();
            if (emailConfirm.value) {
                try {
                    // Use the email entered by the user
                    await sendPasswordResetEmail(auth, email.value);
                    emailSent.value = true;
                    // Inform the user that a password reset email has been sent
                    console.log('Password reset email sent. Check your email inbox.');
                } catch (error) {
                    console.error('Error sending password reset email:', error);
                }
            }
        };

        const signInWithGoogle = async () => {
            const provider = new GoogleAuthProvider();
            try {
                await signInWithPopup(auth, provider);
                router.push('/login'); 
            }
            catch (error) {
                console.error('Error signing in:', error);
            }
        };

        const validateEmail = () => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex pattern 
            if (emailRegex.test(email.value)) {
                emailConfirm.value = true;
            } else {
                emailConfirm.value = false;
            }
        };

        return { email, sendResetEmail, emailConfirm, emailSent, signInWithGoogle }; // Return the renamed function
    },
    mounted() {
    },
};
</script>



<template>
  <div v-if="!emailSent">

      <h2>Recover Password</h2>
      <div id="usernameField">
        <div>Email</div>
        <input id="email" type="text" placeholder="" v-model="email" />
        <div v-if="!emailConfirm">
            <label for="email">Enter a valid email</label>
        </div>
      </div>
      <div>
        <button @click="sendResetEmail">Reset Password</button>
      </div>
      <button>
        <RouterLink to="/login">Back to Login</RouterLink>
      </button>
      <div>
        <h3>Or you can login with</h3>
        <img src="../assets/google.svg" @click="signInWithGoogle"/>
      </div>
  </div>
  <div v-else="emailSent">
    <h2>A recovery email has been sent</h2>
    <button>
        <RouterLink to="/login">Back to Login</RouterLink>
    </button>
  </div>
</template>