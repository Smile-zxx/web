<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <PersonalInfo :prsonalInfo="patientInfo.API_basicInfo"></PersonalInfo>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">入院治疗安排</h3>
          </template>
          <div class="container">
            <NewTreatmentLog
              :newLog="newTreatLog"
              @inputBox="inputBoxShow($event)"
              @prescription="prescription($event)"
            ></NewTreatmentLog>
            <!-- <NewTreatmentLog></NewTreatmentLog> -->
          </div>
        </el-collapse-item>
        <!-- <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">诊断记录</h3>
          </template>
          <div class="container reference">
            <DiagHistory></DiagHistory>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">患者评估</h3>
          </template>
          <div class="container reference">
            <div v-for="(item, index) in pinggu" :key="item.id" class="pinggu">
              <div>
                <span style="margin-right:40px"
                  >{{ item.name }}{{ "(" + item.state + ")" }}</span
                >
                <el-link
                  @click="jinxingpinggu(item, index)"
                  :type="item.state == '已完成' ? 'primary' : 'success'"
                  >{{ item.state == "已完成" ? "查看" : "进行评估" }}</el-link
                >
              </div>
              <div v-show="item.isOpen" class="pinggubiao">
                <div style="margin:20px 0;">
                  <components
                    @cancel="pingguCancel(item, index)"
                    :preData="item.data"
                    :readonly="true"
                    :is="item.type"
                  ></components>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item> -->
        <Reference></Reference>
        <el-button @click="save" size="medium" type="primary" class="btn"
          >确认</el-button
        >
      </el-collapse>
      <div :class="this.$store.state.pageState ? 'inputBox' : 'inputBox2'">
        <!-- 患者状态描述输入 -->
        <special-input
          :data="pages.stateOptions"
          :flag="pages.inputBoxVisible.illState"
          :preValue="newTreatLog.API_patientState"
          @blur="inputBoxBlur('illState')"
          @select="inputBoxSelect($event, 'illState')"
          @delete="inputBoxDelete($event, 'illState')"
        ></special-input>

        <!-- 治疗方案输入框 -->
        <special-input
          :data="pages.treatmentOptions"
          :flag="pages.inputBoxVisible.treatment"
          :preValue="newTreatLog.API_treatment"
          @blur="inputBoxBlur('treatment')"
          @select="inputBoxSelect($event, 'treatment')"
          @delete="inputBoxDelete($event, 'treatment')"
        ></special-input>
      </div>
      <!-- 聊天 -->
      <chatBox></chatBox>
      <!-- 查看问卷对话框 -->
    </div>
  </div>
</template>

<script>
import Prescription from "@components/common/Prescription.vue";
import chatBox from "@components/chatBox/chatBox.vue";
import SpecialInput from "@components/common/SpecialInput.vue";

import PersonalInfo from "./components/PersonalInfo.vue";
import DiagHistory from "./components/PatientDiagResult.vue";
import NewTreatmentLog from "./components/NewTreatmentLog.vue";
import Reference from "./components/Reference.vue";

import questionnaire from "../questionnaires/mixin.js";

import {
  getPatientsDetails,
  getApplyDetails,
  confirmApply
} from "@api/patienttreatment/patienttreatment.js";

import {
  getTreatmentOptions,
  getStateOptions
} from "@api/patientdiag/patientdiag.js";
export default {
  mixins: [questionnaire],
  components: {
    PrescriptionTable: Prescription,
    PersonalInfo: PersonalInfo,
    chatBox,
    DiagHistory,
    NewTreatmentLog,
    SpecialInput,
    Reference
  },
  props: {
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      pages: {
        inputBoxVisible: {
          illState: false,
          diagResult: false,
          treatment: false
        },

        stateOptions: [],
        treatmentOptions: [],
        diagHistory: [],
        treatHistory: [],

        pageSize: 5,
        currentPage: 1,
        collapse_activeNames: ["1", "2"],
        search: {
          API_name: "",
          API_state: "",
          API_dateRange: ""
        },
        questionnaire: {
          chooseDialogVisible: false,
          questionnaireDialogVisible: false,
          target: "",
          questionnaireOptions: ["吞咽功能评定", "跌倒风险评定", "护理记录"],
          data: {},
          readOnlyDialoguVisible: false,
          readOnlyDialoguTarget: {},
          lastData: {}, //用于导入的数据
          importFlag: false
        }
      },
      patientInfo: {
        API_basicInfo: {}
      },
      pinggu: [],
      newTreatLog: {
        API_patientState: [],
        API_treatment: [],
        API_prescription: []
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    },
    confirmQuestionnaire() {
      this.pages.questionnaire.chooseDialogVisible = false;
      this.pages.questionnaire.questionnaireDialogVisible = true;
      this.pages.questionnaire.data = {};
    },

    lookQuestionnaire(questionnaire) {
      this.pages.questionnaire.readOnlyDialoguTarget = questionnaire;
      this.pages.questionnaire.readOnlyDialoguVisible = true;
    },
    postQuestionnaire() {
      let pid = localStorage.getItem("pid");
      newQuestionnaire(
        pid,
        this.pages.questionnaire.target,
        this.pages.questionnaire.data
      ).then(res => {
        this.pages.questionnaire.questionnaireDialogVisible = false;
        getPatientsDetails(pid).then(res => {
          this.patientInfo.API_basicInfo = res.API_basicInfo;
          this.API_nursingLog = res.API_nursingLog;
        });
      });
    },
    importPreData() {
      let flag = false;
      for (let i = 0, len = this.showTable.length; i < len; i++) {
        this.showTable[i].API_questionnaire.forEach(item => {
          if (item.name == this.pages.questionnaire.target) {
            console.log(item);
            this.pages.questionnaire.lastData = item.data;
            this.pages.questionnaire.importFlag = true;
            flag = true;
          }
        });
        if (flag) break;
      }
      if (!flag) {
        this.$message("无可导入数据");
      }
    },
    successImport() {
      this.pages.questionnaire.importFlag = false;
    },
    save() {
      let pid = localStorage.getItem("pid");
      confirmApply(pid, this.newTreatLog).then(res => {
        if (res) {
          this.$message.success("患者确认入院");
        } else {
          this.$message.error("患者入院失败");
        }
      });
    },
    jinxingpinggu(item, index) {
      let obj = JSON.parse(JSON.stringify(item));
      if (item.isOpen) {
        obj.isOpen = false;
      } else {
        obj.isOpen = true;
      }
      this.pinggu.splice(index, 1, obj);
      this.pinggu.splice(index, 1, obj);
    },
    pingguCancel(item, index) {
      let obj = JSON.parse(JSON.stringify(item));
      if (item.isOpen) {
        obj.isOpen = false;
      } else {
        obj.isOpen = false;
      }
      this.pinggu.splice(index, 1, obj);
    },
    inputBoxShow(type) {
      switch (type) {
        case "state":
          this.inputBoxBlur("treatment");
          this.pages.inputBoxVisible.illState = true;
          break;
        case "treatment":
          this.inputBoxBlur("state");
          this.pages.inputBoxVisible.treatment = true;
          break;
      }
    },
    inputBoxBlur(type) {
      switch (type) {
        case "illState":
          this.pages.inputBoxVisible.illState = false;
          break;
        case "treatment":
          this.pages.inputBoxVisible.treatment = false;
          break;
      }
    },
    inputBoxDelete(index, type) {
      switch (type) {
        case "illState":
          this.newTreatLog.API_patientState.splice(index, 1);
          break;
        case "treatment":
          this.newTreatLog.API_treatment.splice(index, 1);
          break;
      }
    },
    inputBoxSelect(data, type) {
      switch (type) {
        case "illState":
          this.newTreatLog.API_patientState.push(data);
          break;
        case "treatment":
          this.newTreatLog.API_treatment.push(data);
          break;
      }
    },
    prescription(data) {
      this.newTreatLog.API_prescription = data;
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getApplyDetails().then(res => {
      this.patientInfo.API_basicInfo = res.API_basicInfo;
      this.pinggu = res.API_questionnaire;
    });
    getTreatmentOptions().then(res => {
      this.pages.treatmentOptions = res;
    });
    getStateOptions().then(res => {
      this.pages.stateOptions = res;
    });
  }
};
</script>

<style scoped lang="scss">
.mainContent {
  width: 95%;
  height: 100%;
  margin: 20px auto;
  .title {
    font-size: 20px;
    color: #1c7e7c;
  }
  .btn {
    float: right;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-right: 50px;
    width: 120px;
  }
}
.clearfix:after {
  content: ""; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
}
.drag {
  width: 300px;
  position: absolute;
  top: 30%;
  left: calc(50% - 150px);
  span {
    z-index: 100;
    position: absolute;
    top: 0px;
    right: 10px;
    color: white;
    cursor: pointer;
  }
}
.container {
  width: 95%;
  margin: auto;
  .search {
    .formLabel {
      font-size: 20px;
      color: #1c7e7c;
    }
    .addbtn {
      margin-left: 20px;
      width: 90px;
    }
  }
  .page {
    width: 95%;
    .block {
      float: right;
    }
  }
  .pinggu {
    margin-right: 20px;
    font-size: 18px;
    .pinggubiao {
      transition: 1s;
    }
  }
}
.addprescription {
  margin-top: 20px;
  font-size: 18px;
}

.inputBox {
  position: fixed;
  right: 2.5%;
  bottom: 0px;
  width: calc(93% - 240px);
  z-index: 3000;
  transition: 0.5s;
}
.inputBox2 {
  position: fixed;
  right: 2.5%;
  bottom: 0px;
  width: calc(95%);
  transition: 0.5s;
}
.tips {
  margin-top: 20px;
  font-size: 18px;
}
</style>
