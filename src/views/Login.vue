<template>
  <el-container class="login-container">
    <el-main class="login">
      <div class="header">
        <img class="logo" src="@/assets/images/logo.png">
      </div>
      <div class="login-form">
        <el-row>
          <el-col :span="24" class="login-title">
            <h2>用户登录</h2>
          </el-col>
        </el-row>
        <el-form ref="loginRef" :model="loginForm" status-icon :rules="rules" size="large">
          <div class="tool-button-container">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" type="text" placeholder="请输入用户名">
                <template #prefix><el-icon size="large">
                    <User />
                  </el-icon></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
                <template #prefix><el-icon size="large">
                    <Unlock />
                  </el-icon></template>
              </el-input>
            </el-form-item>
            <el-button type="primary" @click="handleLogin(loginRef)" class="login-btn" :disabled="loading">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div class="other-tips">
              <el-row class="row-bg" justify="end">
                <el-col :span="12" style="text-align: left;"><a href="#">忘记密码？</a></el-col>
                <el-col :span="12" style="text-align: right;"><span>还没有登录账号？</span>
                  <a href="#">注册账号</a></el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <!--  底部  -->
      <div class="el-login-footer">
        <span>Copyright © 2023 ecjtu-software All Rights Reserved.</span>
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'
import useUserStore from '@/stores/user'

const userStore = useUserStore()

const loginRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules>({
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }]
})

// 验证码地址
const loading = ref(false)

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      console.log('submit!')
      const userForm = reactive({
        username: loginForm.username,
        password: loginForm.password,
      })
      userStore.loginUser(userForm).then(() => {
        console.log("登陆成功");
        router.push('/home')
      }).catch(() => {
        loading.value = false
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.login-container {
  height: 100vh;
}

.login {
  background-image: url(@/assets/images/bg.jpg);
  background-size: cover;
  height: 100%;
  align-items: center;
  position: relative;
}

.text {
  color: #0052D9;
  font-weight: bold;
}

.login-header {
  height: 80px;
  line-height: 80px;
}

.logo {
  height: 60px;
  vertical-align: middle;
}

.title {
  display: inline;
  color: #0052D9;
}

.login-form {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 20px 50px;
  width: 480px;
  height: 360px;
  background-color: rgba(242,242,242,0.9);
  border-radius: 10px;
}

.login-title {
  color: #0052D9;
  text-align: center;
  padding: 20px 0;
}

.tool-button-container {
  text-align: center;
}

.login-btn {
  width: 380px;
  font-size: 18px;
  background-color: #0052D9;
  border-color: #0052D9;
}

.login-code {
  width: 40%;
  height: 40px;
  text-align: right;

  img {
    cursor: pointer;
  }
}

.login-code-img {
  height: 40px;
}

.other-tips {
  margin-top: 30px;
  font-size: 14px;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  font-size: 14px;
  letter-spacing: 1px;
  text-align: center;
}
</style>