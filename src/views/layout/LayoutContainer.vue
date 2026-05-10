<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router
        :default-active="$route.path">
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <!-- 修改为动态获取用户名或昵称 -->
          用户姓名：<strong>{{ userStore.basicMessage.nickname || userStore.basicMessage.username || '未登录' }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <!-- 核心修复：判断是否为 Base64 或 远程路径 -->
            <el-avatar :src="computedAvatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="footer-container">
  <div class="footer-content">
    <!-- 第一行：品牌与版本 -->
    <div class="brand-row">
      <span class="project-title">npm 内容管理系统</span>
      <span class="version-tag">v2.1.0</span>
    </div>
  </div>
</el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import defaultAvatar from '@/assets/default.png'
import request from '@/utils/request';
import { useUserStore } from '@/stores';
import { onMounted, computed } from 'vue';
import {ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()

// 逻辑：计算最终显示的头像地址
const computedAvatar = computed(() => {
  const pic = userStore.basicMessage.user_pic
  if (!pic) return defaultAvatar

  // 如果是 base64 数据（以 data: 开头），直接返回
  if (pic.startsWith('data:')) return pic

  // 如果是服务器相对路径，则拼接 baseURL
  return request.defaults.baseURL + '/' + pic.replace(/^\//, '')
})

onMounted(async () => {
  try {
    await userStore.Basic()
  } catch (error) {
    console.error("获取用户信息失败", error)
  }
})

const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm(
        '确定要退出登录吗？',
        '温馨提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      userStore.removeToken()
      userStore.setBasic({})
      router.push('/login')
    } catch {
      // 用户取消
    }
  } else {
    router.push(`/user/${command}`)
  }
}
</script>

<style scoped>
/* 保持你原有的 CSS 样式 */
.layout-container {
  height: 100vh;
}
.el-aside {
  background-color: #232323;
}
.el-aside__logo {
  height: 120px;
  background: url('@/assets/logo-npm.png') no-repeat center / 120px auto;
}
.el-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown__box {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.el-dropdown__box .el-icon {
  margin-left: 5px;
}
.el-footer {
  text-align: center;
  line-height: 60px; /* 这里的像素值应与 el-footer 的默认高度一致，实现垂直居中 */
  color: #999;
}
</style>
