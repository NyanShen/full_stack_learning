<template>
  <div class="home">
    hello home
    <font-awesome-icon icon="fa-solid fa-coffee" />
  </div>
</template>

<script setup>
import { useUserStore } from "@store/userStore";
import { fetchRoles } from "@api/modules/user";

const userStore = useUserStore();
console.log("userStore>>>", userStore.userInfo)
fetchRoles()
</script>