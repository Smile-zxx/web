<template>
  <div>
    <el-button @click="test">就诊申请</el-button>
    {{this.$store.state.patientDiag.todayPatientsList.length}}
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  validateAccount,
  validatePass,
  validateName
} from "../../utils/validator.js";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        account: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: validateAccount, trigger: "blur" }]
      }
    };
  },
  methods: {
    test() {
      this.$socket.client.emit(
        "seekMedicalAdvice",
        JSON.stringify({
          fromid: "101003", //这个写101001-101200之间的数字都可以
          toid: "101001", //这个写医生的账号
          API_name: "王小虎",
          API_symptom: "感冒发烧流鼻涕"
        })
      );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
