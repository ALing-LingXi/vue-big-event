import axios from "axios";
import { useUserStore } from "@/stores";
import { ElMessage } from "element-plus";
import router from "@/router";
const instance = axios.create({
  baseURL: "http://big-event-vue-api-t.itheima.net",
  timeout: 10000,
});

// instance.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做处理，例如添加 Token
//     const token = useUserStore().token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log("请求配置：", config);
//     return config;
//   },
//   (error) => {
//     // 请求错误处理
//     return Promise.reject(error);
//   }
// );
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 确保从 store 中拿到的 token 存在
    if (userStore.token) {
      // 按照文档要求：必须是 "Bearer " 打头
      config.headers.Authorization = userStore.token
    }
    return config
  }
)
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    // 处理请求成功，但是返回结果出问题的情况
      ElMessage.error(response.data.message || "服务异常")
      return Promise.reject(response.data);
    },
    (error) => {
      // 对响应错误进行处理
      if (error?.response?.status === 401) {
        useUserStore().removeToken() // 重点：不仅要跳转，还要把本地存的脏数据清掉
        router.push("/login")
        return Promise.reject(error)
      }
      ElMessage.error(error?.response?.data?.message || "服务异常")
      return Promise.reject(error)
    }
);

export default instance; // 注意这里是导出 instance
