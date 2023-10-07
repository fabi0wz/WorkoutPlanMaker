<script setup>
import Navbar from "./components/Navbar.vue";

</script>

<template>
  
  <router-view></router-view>

  
  <div class="navbar">
    <Navbar />
  </div>
</template>


<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
</style>




