<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <div class="title">反思记录生活</div>
        <div class="subtitle">轻松收集，有效整理</div>
        <img src="../../assets/login.png" alt="" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/logo.png" alt="" />
          <p class="logo-text">欢迎登录</p>
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          size="large"
        >
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="用户名"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              show-password
              v-model="loginForm.password"
              placeholder="密码"
            >
            </el-input>
          </el-form-item>
          <div class="flx-row">
            <el-checkbox
              style="flex: 1"
              v-model="loginForm.checked"
              label="记住我"
              size="large"
            />
            <span>忘记密码？</span>
          </div>
        </el-form>
        <div class="login-btn">
          <el-button
            :icon="CircleClose"
            round
            @click="resetForm(loginFormRef)"
            size="large"
          >
            重置
          </el-button>
          <el-button
            :icon="UserFilled"
            round
            @click="login(loginFormRef)"
            size="large"
            type="primary"
            :loading="loading"
          >
            登录
          </el-button>
        </div>
        <el-divider>其他方式登录 </el-divider>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { User, Lock, CircleClose, UserFilled } from "@element-plus/icons-vue";
import Cookies from "js-cookie";
import { Base64 } from "js-base64";
import { useRouter } from "vue-router";
import { signin } from "@api/modules/user";

const router = useRouter();

const loading = ref(false);
const loginForm = ref({
  username: "Nyan",
  password: "passw0rD",
  checked: true,
});
const loginFormRef = ref(null);
const loginFormRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
/**
 * 重置表单
 */
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
/**
 * 登录
 */
const login = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      signin(loginForm.value).then((res) => {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        router.replace("/home");
        loading.value = false;
      });
      if (loginForm.value.checked) {
        let password = Base64.encode(loginForm.value.password); // base64加密
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", password, { expires: 30 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 读取cookie 将用户名和密码回显到input框中
const getCookie = () => {
  let username = Cookies.get('username');
  let password = Base64.decode(Cookies.get('password'));
  loginForm.value.username = username;
  loginForm.value.password = password;
};
onMounted(() => {
  getCookie();
})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>