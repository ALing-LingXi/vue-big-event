<template>
  <pageContain title="文章分类">
    <template #extra><el-button type="primary" @click="handleAdd">发布文章</el-button></template>
    <el-table v-loading="loading" :data="articleList" style="min-width: 100%;">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>

      <el-table-column property="cate_alias" label="分类名称">
      </el-table-column>

      <el-table-column property="cate_name" label="分类别名">
      </el-table-column>

      <el-table-column width="150" label="操作">
        <!-- 成对出现通常是为了在这里添加自定义内容，例如按钮 -->
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle plain @click="handleEdit(scope.row)">

          </el-button>
          <el-button :icon="Delete" circle type="danger" plain @click="handleDelete(scope.row)">

          </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <dailogVue ref="dailogRef" @success="update"></dailogVue>

  </pageContain>
</template>
<script setup>
import pageContain from '@/componets/pageContain.vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { getArticle, delteArticle } from '@/api/article';
import dailogVue from './components/dailog.vue';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
const articleList = ref([])
const loading = ref(true)
const getArticleMd = async () => {
  const data = await getArticle()
  articleList.value = data.data
  loading.value = false
}
getArticleMd()
const dailogRef = ref()
function handleEdit(row) {
  dailogRef.value.open(row)
}
function handleAdd() {
  dailogRef.value.open()
}
function update() {
  getArticleMd()
}
function handleDelete(row) {
  ElMessageBox.confirm(
    "您确定要删除这个分类吗?",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await delteArticle(row.id)
      await getArticleMd()
      ElMessage.success("删除成功")
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
