<template>
  <div class="page">
    <div class="login-box">
      <el-form
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
        status-icon
      >
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="loginInfo.UserID"
            auto-complete="off"
            placeholder="用户名"
            id="loginEmail"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="loginInfo.password"
            auto-complete="off"
            placeholder="密码"
            id="loginPassword"
          ></el-input>
          <label id="showPasswordToggle">
            <!-- <el-checkbox id="showPasswordCheck">显示密码</el-checkbox> -->
          </label>
          <!-- <router-link to="/" style="float: right; color: #bbbbbb">忘记密码？</router-link> -->
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%; background-color:#1c7e7c;"
            @click="userLogin"
          >登录</el-button>
        </el-form-item>
        <!-- <el-form-item style="width:100%;">
          <el-button style="width:100%;">注册</el-button>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/user/user.js";
export default {
  name: "app-login",
  data() {
    return {
      loginInfo: {
        UserID: "103001",
        password: "123"
      }
    };
  },
  methods: {
    userLogin() {
      login(this.loginInfo);
    }
  },
  mounted() {
    // localStorage.clear();
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 24px;
  color: #1c7e7c;
}

.page {
  background-color: #eff3f4;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  margin: 0;
  padding: 2.25em;
  box-sizing: border-box;
  border: solid 1px #ddd;
  border-radius: 0.5em;
  font-family: "Source Sans Pro", sans-serif;
}
</style>