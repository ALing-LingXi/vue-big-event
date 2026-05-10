<template>
  <pageContain title="重置密码">
    <div class="form-container">
      <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px" label-position="right" size="large">
        <el-form-item label="旧密码" prop="old_pwd">
          <el-input v-model="formModel.old_pwd" type="password" show-password placeholder="请输入旧密码"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="formModel.new_pwd" type="password" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="re_pwd">
          <el-input v-model="formModel.re_pwd" type="password" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="button-group">
            <el-button type="primary" size="default" @click="submitForm">提交修改</el-button>
            <el-button @click="resetForm" size="default">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </pageContain>
</template>

<script setup>
import { ref, reactive } from 'vue';
import pageContain from '@/componets/pageContain.vue';
import { ElMessage } from 'element-plus';
import { updateAvatarPassword } from '@/api/user';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

const formRef = ref(null);
const formModel = reactive({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
});

const userStore = useUserStore();
const router = useRouter();

// 验证逻辑保持不变...
const rules = {
  old_pwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.old_pwd) {
          callback(new Error('新密码不能与原密码相同'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.new_pwd) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const submitForm = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    const response = await updateAvatarPassword({
      old_pwd: formModel.old_pwd,
      new_pwd: formModel.new_pwd,
      re_pwd: formModel.re_pwd
    });

    if (response.code === 0) {
      ElMessage.success('修改密码完成，请重新登录');
      userStore.removeToken();
      userStore.setBasic({});
      router.push('/login');
    }
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '修改失败');
  }
};

const resetForm = () => {
  formRef.value?.resetFields();
};
</script>

<style scoped>
/* 关键样式优化 */
.form-container {
  padding: 30px 20px;
  /* 限制最大宽度，防止输入框在宽屏上太长 */
  max-width: 500px;
}

/* 让按钮组有一点间距 */
.button-group {
  margin-top: 10px;
}

/* 深度选择器：如果你想让输入框稍微短一点也可以在这里控制 */
:deep(.el-input) {
  --el-input-width: 100%;
}
</style>
