<template>
 <el-form inline="true">
      <el-form-item label="文章分类:">
        <el-select :modelValue="modelValue"
        @update:modelValue="emit('update:modelValue',$event)"
         style="width: 240px; ">
          <el-option
          v-for="value in option"
           :key=value.id
           :label="value.cate_name"
           :value="value.id"
          ></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select  style="width: 240px;">
          <el-option label="已发布" value="true"></el-option>
          <el-option label="未发布" value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script setup>
import { getArticle } from '@/api/article';
import { ref } from 'vue';
const option = ref()
const article =async ()=>{
 const data = await getArticle()
 option.value = data.data
 console.log(option.value)
}
article()
defineProps({
  modelValue:{
    type:[Number,String]
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>
