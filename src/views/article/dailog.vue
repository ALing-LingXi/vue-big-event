<template>
  <!-- 这里数据回显拿到了id -->
  <el-dialog
    v-model="dialogVisible"
    :title="formData.id?'杂鱼杂鱼，欧尼酱就是杂鱼，这都要修正，真拿欧尼酱没办法呢':'添加分类'"
    width="500"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px" style="padding-right: 50px;">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formData.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formData.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { addArticle,putArticle } from '@/api/article';
import { ElMessage } from 'element-plus';
const formRef = ref()
// 自定义组件
const emit = defineEmits(['success'])
const onSubmit = async ()=>{
 await formRef.value.validate()
 const isEdit = formData.value.id
 if(isEdit){
  await putArticle(formData.value)
  ElMessage.success('编辑成功')
 }
 else{
  await addArticle(formData.value)
  ElMessage.success('添加成功')
 }
  dialogVisible.value = false
  emit("success")
}
const dialogVisible = ref(false)
const open  = (val)=>{
  dialogVisible.value=true
  formData.value={...val}
}
const formData = ref({
  cate_name:"",
  cate_alias:""
})
const rules = ref({
   cate_name:[{required:true,message:"内容不能为空",trigger:"blur"},
    {pattern:/^\S{1,10}$/,message:"请输入1-10位非空字符",trigger:"blur"}
   ],
   cate_alias:[{required:true,message:"内容不能为空",trigger:"blur"},
  {pattern:/^[0-9a-zA-Z]{1,10}$/,message:"请输入1-10位数字或字母",trigger:"blur"}]
})
defineExpose({open})
</script>
