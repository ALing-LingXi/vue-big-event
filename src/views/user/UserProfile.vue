<template>
  <PageContain title="用户基本信息">
    <!-- 1. 将 v-model 改为 :model -->
    <!-- 2. label-width 改为 100px 左右 -->
    <!-- 3. label-position 建议用 right (默认)，视觉上文字紧贴输入框更美观 -->
    <el-form ref="form" :model="formModel" :rules="rules" label-width="100px">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="formModel.username" disabled style="width: 400px;"></el-input>
      </el-form-item>

      <el-form-item label="用户名称" prop="nickname">
        <el-input v-model="formModel.nickname" style="width: 400px;"></el-input>
      </el-form-item>

      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="formModel.email" style="width: 400px;"></el-input>
      </el-form-item>

      <!-- 添加提交按钮，否则表单不完整 -->
      <el-form-item>
        <el-button type="primary" @click="updata">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContain>
</template>

<script setup>
import PageContain from '@/componets/pageContain.vue';
import { useUserStore } from '@/stores';
import { ref, onMounted } from 'vue';
import { updateUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
const form = ref()
const rules = ref({
  username: [],
  nickname: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "昵称长度在1到10个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: 'email', message: "请输入正确的邮箱格式", trigger: "blur" }
  ]
})
const formModel = ref({
  username: "",
  nickname: "",
  email: "",
  id: ""
})
onMounted(async () => {
  try {
    if (!userStore.basicMessage.username) {
      await userStore.Basic()
    }
    // 将 Store 数据结构同步到表单模型
    // 使用展开运算符确保断开引用，防止表单修改直接影响 Store（除非提交成功）
    const { username, nickname, email, id } = userStore.basicMessage
    formModel.value = { username, nickname, email, id }
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
})
async function updata() {
  await form.value.validate()
  await updateUserInfo({
    id: formModel.value.id,
    nickname: formModel.value.nickname,
    email: formModel.value.email,
  })
  await userStore.Basic()
  ElMessage.success('更新成功')
}
</script>

<style scoped></style>
