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
          <el-form-item prop="account">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.account"
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
          <el-form-item prop="code">
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 65%"
              @keyup.enter.native="login(loginFormRef)"
            >
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="loadCaptcha" class="login-code-img" />
            </div>
          </el-form-item>
          <div class="flex-sbc">
            <el-checkbox
              style="flex: 1"
              v-model="loginForm.rememberMe"
              label="记住我"
              size="large"
            />
            <!-- <span>忘记密码？</span> -->
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
            {{ loading ? "登 录 中..." : "登 录" }}
          </el-button>
        </div>
        <el-divider>其他方式登录 </el-divider>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import $message from "@common/message";
import { User, Lock, CircleClose, UserFilled } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { getCaptcha, signin } from "@api/modules/user";
import {
  setToken,
  getLoginInfo,
  removeLoginInfo,
  setLoginInfo,
} from "@common/cookies";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const loginForm = ref({
  account: "",
  password: "",
  code: "",
  rememberMe: false,
});
const loginFormRef = ref(null);
const loginFormRules = ref({
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入图形验证码", trigger: "blur" }],
});
const codeUrl = ref("");
/**
 * 获取图形验证码
 */
const loadCaptcha = () => {
  getCaptcha().then((res) => {
    if (res.data.code !== 0) {
      $message.error(res.data.msg);
      return;
    }
    codeUrl.value = res.data.data;
  });
};
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
        loading.value = false;
        if (res.data.code !== 0) {
          $message.error(res.data.msg);
          loginForm.value.code = "";
          loadCaptcha();
          return;
        }
        $message.success("登录成功");
        setToken(res.data.data.token);
        if (loginForm.value.rememberMe) {
          setLoginInfo(loginForm.value);
        } else {
          removeLoginInfo();
        }
        router.push({ path: route.query.redirect || "/" });
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 读取cookie 将用户名和密码回显到input框中
const loadCookie = () => {
  loginForm.value.account = getLoginInfo().account;
  loginForm.value.password = getLoginInfo().password;
  loginForm.value.rememberMe = getLoginInfo().rememberMe;
};
onMounted(() => {
  loadCookie();
  loadCaptcha();
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
.login-code {
  flex: 1;
  height: 38px;
  margin-left: 15px;
  .login-code-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    vertical-align: baseline;
    background-color: #e9edf9;
  }
}
</style>