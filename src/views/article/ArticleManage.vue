<template>
  <pageContain title="文章管理">
    <el-form inline="true">
      <el-form-item label="文章分类">
        <selectVue v-model="params.cate_id" width="240px">
        </selectVue>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" style="width: 240px;">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <template #extra><el-button type="primary" @click="addArticle">添加分类</el-button></template>
    <el-table :data="data" v-loading="refloding">
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="scope">
          {{ format(scope.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle type="primary" :icon="Edit" plain @click="editArticle(scope.row)"></el-button>
          <el-button circle type="danger" :icon="Delete" plain @click="onDelete(scope.row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>

    <el-pagination background="true" style="margin-top: 30px; justify-content: flex-end;"
      v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[2, 5, 8, 10]" :size="size"
      layout=" jumper,total, sizes, prev, pager, next," :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <drawer ref="drawerData" @success="handleSuccess"></drawer>
  </pageContain>

</template>
<script setup>
import drawer from './components/drawer.vue';
import { format } from '@/utils/data';
import pageContain from '@/componets/pageContain.vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import selectVue from './components/select.vue';
import { getBook, deleteArticle } from '@/api/article';
import { ElMessageBox, ElMessage } from 'element-plus';
const params = reactive({
  pagenum: "1",
  pagesize: "10",
  cate_id: "",
  state: ''
})
//
const drawerData = ref()
const data = ref()
const total = ref()
const refloding = ref(false)

async function onDelete(row) {
  try {
    await ElMessageBox.confirm(
      '确定要删除这篇文章吗？',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await deleteArticle(row.id)
    ElMessage.success('删除成功')
    bookList()
  } catch {
    ElMessage.info('已取消删除')
  }
}

async function bookList() {
  refloding.value = true
  console.log(params)
  const book = await getBook(params)
  console.log(book)
  data.value = book.data
  total.value = book.total
  refloding.value = false
}
function handleSizeChange(size) {
  params.pagesize = size;
  params.pagenum = 1; // 切换每页显示数量时，回到第一页
  bookList();
}
function handleCurrentChange(page) {
  params.pagenum = page;
  bookList();
}
function search() {
  params.pagenum = 1
  bookList()
}
function reset() {
  params.pagenum = 1
  params.cate_id = ""
  params.state = ""
  bookList()
}

// 给添加文章按钮进行绑定
function addArticle() {
  //  drawerData.value 拿到的是drawer组件以及它暴露的属性和方法
  drawerData.value.open()
}
function editArticle(row) {
  drawerData.value.open(row)
}

function handleSuccess() {
  bookList()
}

onMounted(() => {
  bookList()
})
</script>
