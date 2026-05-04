import axios from "axios";
import { useUserStore } from "@/stores";
import { ElMessage } from "element-plus";
import router from "@/router";
const instance = axios.create({
  baseURL: "http://big-event-vue-api-t.itheima.net",
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做处理，例如添加 Token
    const token = useUserStore().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("请求配置：", config);
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    ElMessage.error(response.data.message || "服务异常")
    return Promise.reject(response.data);
  },
  (error) => {
    // 对响应错误进行处理
    if (error?.response?.status === 401) {
      router.push("/login")
    }
    ElMessage.error(error?.response?.data?.message || "服务异常")
    return Promise.reject(error)
  }
);

export default instance; // 注意这里是导出 instance
