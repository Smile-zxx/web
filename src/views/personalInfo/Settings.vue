<template>
  <div>
    <el-row class="title">
      <el-col :span="6" :offset="1">
        <span>新消息设置</span>
      </el-col>
    </el-row>

    <el-row class="message">
      <el-col :span="6" :offset="2">
        <span>是否自动提醒新消息</span>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-switch v-model="notice"></el-switch>
      </el-col>
    </el-row>
    <el-divider class="line"></el-divider>
    <el-row class="title">
      <el-col :span="8" :offset="1">
        <span>密码设置</span>
      </el-col>
    </el-row>

    <el-row class="password">
      <el-form :model="formData" :rules="rules" label-width="100px" ref="passwordModigy">
        <el-col :span="7" :offset="7">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="prepass">
            <el-input type="password" v-model="formData.prepass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpass">
            <el-input type="password" v-model="formData.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="check">
            <el-input type="password" v-model="formData.check" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="2" :offset="10">
        <el-button class="btn" @click="password">提交</el-button>
      </el-col>
    </el-row>
    <el-divider type="primary" class="line"></el-divider>
  </div>
</template>

<script type="text/javascript">
import { modifyPassword } from "../../api/user/user.js";
import {
  validateAccount,
  validatePass,
  validateName
} from "../../utils/validator.js";
export default {
  name: "More",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      formData: {
        username: "",
        prepass: "",
        newpass: "",
        check: ""
      },
      notice: false,
      rules: {
        username: [{ validator: validateAccount, trigger: "blur" }],
        prepass: [{ validator: validatePass, trigger: "blur" }],
        check: [{ validator: validatePass2, trigger: "blur" }],
        newpass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    password() {
      this.$refs.passwordModigy.validate(valid => {
        if (valid) {
          modifyPassword(this.formData);
        } else {
          this.$message.error("请按格式输入！");
          return false;
        }
      });

      // console.log(this.$refs.passwordModigy);
    }
  }
};
</script >

<style scoped lang="scss">
.title {
  font-size: 20px;
  font-weight: bold;
  color: #1c7e7c;
  margin: 20px 0px 0px 0px;
}

.message {
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 18px;
}
.password {
  margin-top: 30px;
  margin-bottom: 10px;
}
.line {
  width: 85%;
  margin: auto;
  margin-top: 20px;
}
.btn {
  width: 100%;
  height: 40px;
  color: white;
  background-color: #409eff;
}
</style>
