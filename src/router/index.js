import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // import.meta.env.BASE_URL vite暴露的环境变量，
  // 可以在vite里面配置base来指定url的基地址
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
  ],
})

export default router
