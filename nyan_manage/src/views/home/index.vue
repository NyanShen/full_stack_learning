<template>
  <div class="home">
    hello home
    <font-awesome-icon icon="fa-solid fa-coffee" />
  </div>
</template>

<script setup>
import { getLoginInfo } from "../../common/cookies";

console.log("getLoginInfo>>>", getLoginInfo())
</script>