<script setup>

import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { regesterUserService, LoginUserService } from '@/api/user'
import { useUserStore } from '@/stores/index.js'
import router from '@/router'
const isRegister = ref(false)
const formData = reactive({
  username: '',
  password: '',
})
const formModel = reactive({
  username: '',
  password: '',
  repassword: ''
})
const rulesLogin = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
}
const rulesReg = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" },
  { min: 5, max: 10, message: "用户名长度为5到10位", trigger: "blur" }
  ],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" },
  { pattern: /^\S{6,10}$/, message: "密码长度6到10位且不能有空字符", trigger: "blur" }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.password) {
          callback(new Error("两次输入的密码不一致"))
        }
        else {
          callback()
        }
      }, message: "两次密码输入不一致", trigger: "blur"
    }
  ]
}



// const login = async () => {
//   if (!formModel.username || !formModel.password) {
//     ElMessage.warning('请输入用户名和密码')
//     return
//   }
//   ElMessage.success('登录成功')
// }

const form = ref()
const register = async () => {
  await form.value.validate()
  await regesterUserService(formModel)
  ElMessage.success('注册成功')
  setTimeout(() => {
    isRegister.value = false
    console.log('5. 切换到登录表单')
  }, 1500)
}

// form的数据可以重复使用 切换的时候还要清除里面的数据
watch(isRegister, () => {
  formData.username = ''
  formData.password = ''
  formModel.username = ''
  formModel.password = ''
  formModel.repassword = ''
})
// 1逻辑校验 2提交数据去后端 3拿到后端的数据如果错误则显示
// 4 拿到token 存入pinia中 5跳转到用户界面
const login = async () => {
  await form.value.validate()
  const res = await LoginUserService(formData)
  const { setToken } = useUserStore()
  setToken(res.token)
  router.push("/")
}
</script>

<template>
  <!--
    1. 结构相关
      el-row表示一行，一行分成24份
       el-col表示列
       (1) :span="12"  代表在一行中，占12份 (50%)
       (2) :span="6"  表示在一行中，占6份  (25%)
       (3) :offset="3" 代表在一行中，左侧margin份数

       el-form 整个表单组件
       el-form-item 表单的一行 （一个表单域）
       el-input 表单元素（输入框）
    2. 校验相关
       (1) el-form => :model="ruleForm"      绑定的整个form的数据对象 { xxx, xxx, xxx }
       (2) el-form => :rules="rules"         绑定的整个rules规则对象 { xxx, xxx, xxx }
       (3) 表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性
       (4) el-form-item => prop配置生效的是哪个校验规则 (和rules中的字段要对应)
  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form :model="formModel" :rules="rulesReg" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form :model="formData" :rules="rulesLogin" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formData.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" name="password" :prefix-icon="Lock" type="password"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
