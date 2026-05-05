<template>
  <pageContain title="文章分类">
    <el-form inline="true">
      <el-form-item label="文章分类:">
        <el-select placeholder="请选择" style="width: 240px;">
          <el-option label="我不到啊" value="xixi"></el-option>
          <el-option label="我不吃牛肉" value="bang"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select placeholder="请选择" style="width: 240px;">
          <el-option label="别杀我" value="ouy"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="data">
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template  #default="scope">
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
import { reactive } from 'vue';
const data =reactive ([
  {
    "id": 1562,
    "title": "我是一个文章的标题示例",
    "pub_date": "Tue Jun 07 2022 07:53:46 GMT+0800",
    "state": "已发布",
    "cate_name": "123"
  }
])
function onEdit(row){
  console.log(row)
}
function onDelete(row){
  console.log(row.id)
}
</script>
