import { createRouter, createWebHashHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Login from '/src/components/Login.vue'; 
import Home from '/src/components/Home.vue'; 
import SignUp from '/src/components/SignUp.vue'; 
import RecoverPassword from '/src/components/RecoverPassword.vue'; 

const About = { template: '<div>About</div>' }

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } }, // Add the meta property to make it require authentication to access (dealt with below redirecting to login page)
    { path: '/about', component: About },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp},
    { path: '/recover', component: RecoverPassword}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // Check if the route requires authentication
  if (requiresAuth) {
    // Use onAuthStateChanged to check the user's authentication status
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, proceed to the route
        next();
      } else {
        // User is not authenticated, redirect to the login page
        next('/login');
      }
    });
  } else {
    // If the route does not require authentication, proceed
    next();
  }
});

export default router;
