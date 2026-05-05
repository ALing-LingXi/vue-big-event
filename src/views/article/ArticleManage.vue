<template>
  <pageContain title="文章管理">
    <template #extra><el-button>测试</el-button></template>
    <el-table v-loading="loading"  :data="articleList" style="min-width: 100%;">
      <el-table-column type="index" width="100" label="序号">
      </el-table-column>

      <el-table-column property="cate_alias" label="分类名称">
      </el-table-column>

      <el-table-column property="cate_name" label="分类别名">
      </el-table-column>

      <el-table-column width="150" label="操作">
        <!-- 成对出现通常是为了在这里添加自定义内容，例如按钮 -->
        <template #default="scope">
          <el-button type="primary" :icon="Edit" circle plain  @click="handleEdit(scope.$index, scope.row)">

          </el-button>
          <el-button :icon="Delete" circle type="danger" plain @click="handleDelete(scope.$index, scope.row)">

          </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <dailogVue ref="dailog"></dailogVue>
  </pageContain>
</template>
<script setup>
import pageContain from '@/componets/pageContain.vue';
import { Edit,Delete } from '@element-plus/icons-vue';
import { getArticle } from '@/api/article';
import dailogVue from './dailog.vue';
import { ref } from 'vue';

let articleList = ref([])
const loading = ref(true)
const getArticleMd = async () => {
  const data = await getArticle()
  articleList.value = data.data
  loading.value=false
}
getArticleMd()
const dailog = ref()
function handleEdit(){
  dailog.value.open()
}
</script>
