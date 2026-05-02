<template>
<div>测试</div>
<button @click="jump">跳跳乐</button>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
function jump(){
  router.push("/buxixi")
  console.log(route,router)
}
</script>

<style scoped>

</style>