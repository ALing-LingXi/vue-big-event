<template>
  <el-drawer :title="formModel.id ? '编辑文章' : '添加文章'" size="50%" v-model="drawershow">
    <el-form :model="formModel" ref="formRef" label-width="80px" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <el-form-item label="文章分类" prop="cate_id">
        <selectVue v-model="formModel.cate_id" width="100%"></selectVue>
      </el-form-item>

      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :drag="false" :auto-upload="false" :on-change="onUploadFile"
          :show-file-list="false">
          <img v-if="refImg" :src="refImg" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容" prop="content">
        <div class="editor-wrapper">
          <QuillEditor theme="snow" v-model:content="formModel.content" content-type="html" ref="editorRef" />
        </div>
      </el-form-item>

      <el-form-item class="button-item">
        <div class="button-group">
          <el-button type="primary" @click="submitForm('已发布')">发布</el-button>
          <el-button type="info" @click="submitForm('草稿')">存稿</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import selectVue from './select.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { postArticle, getInfo } from '@/api/article';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
const emit = defineEmits(['success'])

const defaultData = {
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}

const refImg = ref('')
const formModel = reactive({ ...defaultData })
const formRef = ref(null)
const drawershow = ref(false)
const editorRef = ref()

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 30, message: '标题长度在1到30个字符', trigger: 'blur' }
  ],
  cate_id: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

const open = async (row = null) => {
  drawershow.value = true
  if (row?.id) {
    const data = await getInfo(row.id)
    console.log(data.data)
    formModel.id = data.data.id
    formModel.title = data.data.title
    formModel.cate_id = data.data.cate_id
    formModel.content = data.data.content
    formModel.state = data.data.state
    if (data.data.cover_img) {
      refImg.value = request.defaults.baseURL + '/' + data.data.cover_img.replace(/^\//, '')
    }
  } else {
    resetForm()
  }
}

const resetForm = () => {
  Object.assign(formModel, { ...defaultData })
  refImg.value = ''
  // 这里drawer组件是懒加载,刚点击,富文本编辑器可能还没加载,这个函数就走了一遍
  // 导致了报错,所以我们应该有个可选链来处理这种情况
  // editorRef.value拿到的是富文本编辑器这个实例
  editorRef.value?.setHTML('')
  // formRef.value 拿到的是表单 resetFields重置表单并清除所有红字
  formRef.value.resetFields()
}
const closeDrawer = () => {
  drawershow.value = false
}

function onUploadFile(uploadfile) {
  refImg.value = URL.createObjectURL(uploadfile.raw)
  formModel.cover_img = uploadfile.raw
}

const submitForm = async (state) => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    if (!formModel.cover_img && !formModel.id) {
      ElMessage.error('请上传文章封面')
      return
    }

    const fd = new FormData()
    fd.append('title', formModel.title)
    fd.append('cate_id', String(formModel.cate_id))
    fd.append('content', formModel.content)
    fd.append('state', state)

    if (formModel.id) {
      fd.append('id', formModel.id)
    }

    if (formModel.cover_img instanceof File) {
      fd.append('cover_img', formModel.cover_img)
    } else if (formModel.id && formModel.cover_img) {
      fd.append('cover_img', formModel.cover_img)
    }

    await postArticle(fd)

    ElMessage.success(state === '已发布' ? '发布成功' : '存稿成功')
    emit('success')
    resetForm()
    closeDrawer()

  } catch (error) {
    console.error('提交失败', error)
    ElMessage.error(error.response?.data?.message || '提交失败')
  }
}

defineExpose({ open })
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
