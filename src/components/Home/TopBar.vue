<script setup>

    const props = defineProps({
        user: String,

    })

</script>

<template>

<div class="topbar">
    <div class="ProfilePhoto">photo</div>
    <div class="WelcomeText">
        <div>Hey, User</div>
        <div>Welcome Back!</div>
    </div>
    <div class="Notifcations">Logo</div>
</div>



</template>


<style scoped>

.topbar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px;
}

</style>