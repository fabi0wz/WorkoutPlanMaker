<script>
import { ref } from 'vue';
import { signInWithPopup, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import router from '../../router';

export default {
  setup() {
    const user = ref(null);
    const email = ref(''); // Create a reference to the email input field
    const password = ref(''); // Create a reference to the password input field
    const passwordConfirm = ref(''); // Create a reference to the password confirmation input field

    let passwordMatch = ref(true); // Create a reference to the password match boolean (to display the label)
    let emailConfirm = ref(true); // Create a reference to the email confirmation boolean (to display the label)

    let EmailalertMessage = ref(''); // Create a reference to the email alert message
    let PasswordalertMessage = ref(''); // Create a reference to the password alert message


    const validations = () =>{ // validate functions (triggered on button click)
      validateEmail();
      checkPasswords();
      if(emailConfirm.value && passwordMatch.value){
        createUserWithEmailPassword();
      } 
    }

    const validateEmail = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email regex pattern 

      console.log(email.value);
      if (emailRegex.test(email.value)) 
        {
          emailConfirm.value = true;
        }
        else {
          emailConfirm.value = false;
          EmailalertMessage.value = 'Please enter a valid email address';
        }
      };

    const checkPasswords = () => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/; // Password regex pattern
        if(!passwordRegex.test(password.value)){ // Check if the password matches the regex pattern
          passwordMatch.value = false;
          PasswordalertMessage.value = 'Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter';
      }
      else{
        if (password.value === passwordConfirm.value && password.value.length > 0) { // Check if the password matches the confirmation password
          passwordMatch.value = true;
        } else {
          passwordMatch.value = false;
          PasswordalertMessage.value = 'Passwords do not match';
        }
      }
    };

    const createUserWithEmailPassword = async () => {
      if (passwordMatch) {
        const authInstance = getAuth(); // Get the auth instance
        try {
          await createUserWithEmailAndPassword(authInstance, email.value, password.value);
          // Clear the input fields after successful registration
          email.value = '';
          password.value = '';
          passwordConfirm.value = ''; // Clear the confirmation password field
          // You can also automatically sign in the new user here if desired
          router.push('/login');


        } catch (error) {
          console.error('Error creating user with email/password:', error);
        }
      }
    };

    const signInWithGoogle = async () => { // Sign in with Google
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        router.push('/login');
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

    return { user, email, EmailalertMessage, PasswordalertMessage, validations, emailConfirm, password, passwordConfirm, passwordMatch, signInWithGoogle, createUserWithEmailPassword };
  },
};
</script>


<template>
  <div>
    <h1>Login</h1>
    <div id="usernameField">
      <div>Email</div>
      <input id="email" type="text" v-model="email" />
      <div v-if="!emailConfirm">
        <label for="email">{{ EmailalertMessage }}</label>
      </div>
    </div>
    <div id="passwordField">
      <div>Password</div>
      <input id="password" type="password" v-model="password" />
    </div>
    <div id="passwordField">
      <div>Re-Enter Password</div>
      <input id="passwordConfirm" type="password" v-model="passwordConfirm" />
      <div v-if="!passwordMatch">
        <label for="passwordConfirm">{{ PasswordalertMessage }}</label>
      </div>
    </div>
    <button><router-link to="login">Already Registered</router-link></button>
    <button @click="validations">Create Account</button>
    <div>
      <img src="../assets/google.svg" @click="signInWithGoogle" />
    </div>
  </div>
</template>