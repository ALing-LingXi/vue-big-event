<template>
  <el-drawer :title="formModel.id ? '编辑文章' : '添加文章'" size="50%" v-model="drawershow">
    <el-form :model="formModel" ref="formRef" label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="文章分类" prop="cate_id">
        <selectVue v-model="formModel.cate_id" width="100%"></selectVue>
      </el-form-item>

      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :drag="false"
          :auto-upload="false"
          :on-change="onUploadFile"
          :show-file-list="false"
        >
          <img v-if="refImg" :src="refImg" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <div class="editor-wrapper">
          <QuillEditor theme="snow" v-model:content="formModel.content" content-type="html" />
        </div>
      </el-form-item>

      <el-form-item class="button-item">
        <div class="button-group">
          <el-button type="primary">发布</el-button>
          <el-button type="info">存稿</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ref } from 'vue';
import selectVue from './select.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const defaultData = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}

const refImg = ref('')
const formModel = ref({ ...defaultData })
const drawershow = ref(false)

const open = (row) => {
  drawershow.value = true
  if (row.id) {
    formModel.value = { ...row }
    refImg.value = row.cover_img
  } else {
    formModel.value = { ...defaultData }
    refImg.value = ''
  }
}

defineExpose({ open })

function onUploadFile(uploadfile) {
  refImg.value = URL.createObjectURL(uploadfile.raw)
  formModel.value.cover_img = uploadfile.raw
}
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding: 20px;
}

.button-item {
  margin-top: 20px !important;
  margin-bottom: 0;

  :deep(.el-form-item__content) {
    justify-content: flex-end;
    display: flex;
  }
}

.button-group {
  display: flex;
  gap: 12px;
}

.avatar-uploader {
  :deep() {
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration);
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
    .avatar {
      width: 178px;
      height: 178px;
      object-fit: contain;
      display: block;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor-wrapper {
  width: 100%;
}

:deep(.ql-toolbar) {
  border: 1px solid var(--el-border-color);
  border-radius: 8px 8px 0 0;
  background: #f8f9fa;
}

:deep(.ql-container) {
  border: 1px solid var(--el-border-color);
  border-top: none;
  border-radius: 0 0 8px 8px;
  height: 250px;
}
</style>
