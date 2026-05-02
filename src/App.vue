<template>
<div>测试</div>
<button @click="jump">跳跳乐</button>
<p>{{ token }}</p>
<el-button @click="setToken('xixibuxixi')">点我设置Token</el-button>
<el-button @click="removeToken()">点我移除Token</el-button>
<p>{{ count }}</p>
<el-button @click="add(1)">点我加1</el-button>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { useUserStore,useCountStore } from './stores';
import { storeToRefs } from 'pinia';
const {token} = storeToRefs(useUserStore())
const {setToken,removeToken} =useUserStore()
const {count} = storeToRefs(useCountStore())
const {add} = useCountStore()
const router = useRouter()
const route = useRoute()
function jump(){
  router.push("/buxixi")
  console.log(route,router)
}
</script>

<style scoped>

</style>