<template>
  <pageContainer>
    <template #header>
      <div>更换头像</div>
    </template>
    <div class="avatar-upload">
      <div class="avatar-preview" @click="selectImage" :class="{ 'cursor-pointer': !previewImg }">
        <img v-if="previewImg" :src="previewImg" class="preview-image" />
        <el-icon v-else class="upload-icon">
          <Plus />
        </el-icon>
      </div>
      <div class="avatar-buttons">
        <input type="file" ref="fileInput" accept="image/*" class="hidden-input" @change="handleFileSelect" />
        <el-button size="large" type="primary" :icon="Plus" @click="selectImage">选择图片</el-button>
        <el-button size="large" type="success" :icon="Upload" @click="uploadImage"
          :disabled="!previewImg">上传头像</el-button>
      </div>
    </div>
  </pageContainer>
</template>

<script setup>
import { ref } from 'vue';
import { Plus, Upload } from '@element-plus/icons-vue';
import { updateUserInfo } from '@/api/user';
import { useUserStore } from '@/stores';
import { ElMessage } from 'element-plus';

const fileInput = ref(null);
const previewImg = ref('');
const selectedFile = ref(null);
const userStore = useUserStore();

const selectImage = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    selectedFile.value = file;
    previewImg.value = URL.createObjectURL(file);
  }
};

const uploadImage = async () => {
  if (!selectedFile.value) {
    ElMessage.warning('请先选择图片');
    return;
  }

  try {
    const fd = new FormData();
    fd.append('user_pic', selectedFile.value);

    const response = await updateUserInfo(fd);

    if (response.code === 0) {
      ElMessage.success('头像上传成功');
      if (response.data.user_pic) {
        userStore.basicMessage.user_pic = response.data.user_pic;
      }
    }
  } catch (error) {
    console.error('上传失败', error);
    ElMessage.error(error.response?.data?.message || '上传失败');
  }
};
</script>

<style scoped>
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
}

.avatar-preview {
  height: 400px;
  width: 300px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-icon {
  font-size: 48px;
  color: #909399;
}

.cursor-pointer {
  cursor: pointer;
}

.avatar-buttons {
  display: flex;
  gap: 20px;
}

.hidden-input {
  display: none;
}
</style>
