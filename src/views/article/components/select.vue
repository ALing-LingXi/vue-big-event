<template>

    <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" :style="{width}">
      <el-option v-for="value in option" :key=value.id :label="value.cate_name" :value="value.id"></el-option>
    </el-select>


</template>

<script setup>
import { getArticle } from '@/api/article';
import { ref, onMounted } from 'vue';
const option = ref()
const article = async () => {
  const data = await getArticle()
  option.value = data.data
  console.log(option.value)
}
onMounted(() => {
  article()
})
defineProps({
  modelValue: [Number, String],
  width:[String]
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped></style>
