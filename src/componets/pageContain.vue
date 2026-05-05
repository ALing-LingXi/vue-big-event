
<script setup>
defineProps({title:{
  required:true,
  type:String
}})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <div><slot name="extra"></slot></div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>


<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
