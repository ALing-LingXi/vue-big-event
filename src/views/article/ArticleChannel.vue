<template>
  <pageContain title="文章分类">

    <selectVue v-model="cate_id"></selectVue>

    <el-table :data="data">
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间"></el-table-column>
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


  </pageContain>
</template>
<script setup>
import pageContain from '@/componets/pageContain.vue';
import { Delete, Edit } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import selectVue from './components/select.vue';
import { getBook } from '@/api/article';
const parmas = reactive({
  pagenum:"5",
  pagesize:"1",
  cate_id:"",
  sate:''
})
const data = ref([
  {
    "id": 1562,
    "title": "我是一个文章的标题示例",
    "pub_date": "Tue Jun 07 2022 07:53:46 GMT+0800",
    "state": "已发布",
    "cate_name": "123"
  }
])
const cate_id = ref()
const total = ref()
function onEdit(row) {
  console.log(row)
}
function onDelete(row) {
  console.log(row.id)
}
async function bookList(){
 const book = await getBook(parmas)
  data.value = book.data
  total.value = book.total
}
bookList()
</script>
