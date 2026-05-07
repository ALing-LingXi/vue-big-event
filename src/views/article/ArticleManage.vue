<template>
  <pageContain title="文章管理">

    <selectVue v-model="cate_id"></selectVue>
    <template #extra><el-button type="primary" @click="handleAdd">添加分类</el-button></template>
    <el-table :data="data">
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="scope">
          {{ format(scope.row.pub_data) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button circle type="primary" :icon="Edit" plain @click="onEdit(scope.row)"></el-button>
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
  </pageContain>
</template>
<script setup>
import { format } from '@/utils/data';
import pageContain from '@/componets/pageContain.vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { reactive, ref, onMounted } from 'vue';
import selectVue from './components/select.vue';
import { getBook } from '@/api/article';
const params = reactive({
  pagenum: "1",
  pagesize: "10",
  cate_id: "",
  state: ''
})
const data = ref()
const cate_id = ref()
const total = ref()
function onEdit(row) {
  console.log(row)
}
function onDelete(row) {
  console.log(row.id)
}
async function bookList() {
  const book = await getBook(params)
  data.value = book.data
  total.value = book.total
  console.log(data.value)
  console.log(book)
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
onMounted(() => {
  bookList()
})
</script>
