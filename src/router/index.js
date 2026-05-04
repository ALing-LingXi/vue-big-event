import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  // import.meta.env.BASE_URL vite暴露的环境变量，
  // 可以在vite里面配置base来指定url的基地址
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: () => import("@/views/login/LoginPage.vue") },
    {
      path: '/',
      component: () => import("@/views/layout/LayoutContainer.vue"),
      redirect: "/article/manage",
      children: [
        {
          path: "/article/manage",
          component: () => import("@/views/article/ArticleManage.vue")
        },
        {
          path: "/article/channel",
          component: () => import("@/views/article/ArticleChannel.vue")
        },
        {
          path: "/user/profile",
          component: () => import("@/views/user/UserProfile.vue")
        },
        {
          path: "/user/avatar",
          component: () => import("@/views/user/UserAvatar.vue")
        },
        {
          path: "/user/password",
          component: () => import("@/views/user/UserPassword.vue")
        }
      ]
    }
  ],
})

// 路由拦截器
router.beforeEach((to)=>{
  const userStore = useUserStore()
  if(!userStore.token&&to.path!=='/login'){
    return '/login'
  }
  return true
})

export default router
