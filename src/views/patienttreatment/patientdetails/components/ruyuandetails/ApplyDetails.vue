<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">入院患者评估</h3>
          </template>
          <div class="container">
            <div v-for="(item, index) in pinggu" :key="item.id" class="pinggu">
              <div>
                <span style="margin-right:40px">吞咽风险评估</span>
                <el-link @click="jinxingpinggu(item, index)" type="success"
                  >进行评估</el-link
                >
              </div>
              <div v-show="item.isOpen" class="pinggubiao">
                <TUNYAN></TUNYAN>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">入院治疗安排</h3>
          </template>
          <div class="container">
            <NewTreatmentLog></NewTreatmentLog>
          </div>
        </el-collapse-item>
      </el-collapse>

      <!-- 聊天 -->
      <chatBox></chatBox>
      <!-- 查看问卷对话框 -->
    </div>
  </div>
</template>

<script>
import Prescription from "@components/common/Prescription.vue";
import chatBox from "@components/chatBox/chatBox.vue";

import PersonalInfo from "./components/PersonalInfo.vue";
import DiagHistory from "./components/PatientDiagResult.vue";
import NewTreatmentLog from "./components/NewTreatmentLog.vue";

import questionnaire from "../../../questionnaires/mixin.js";

import {
  getPatientsDetails,
  newQuestionnaire
} from "@api/operationmanage/operationmanage.js";
export default {
  mixins: [questionnaire],
  components: {
    PrescriptionTable: Prescription,
    PersonalInfo: PersonalInfo,
    chatBox,
    DiagHistory,
    NewTreatmentLog
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
        pageSize: 5,
        currentPage: 1,
        collapse_activeNames: ["1", "4"],
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
      pinggu: [
        {
          name: "吞咽功能评估",
          state: "已完成",
          data: {}
        },
        {
          name: "患者护理首页",
          state: "已完成",
          data: {}
        },
        {
          name: "跌倒风险评估",
          state: "已完成",
          data: {}
        }
      ]
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
      this.$router.push("/treatment/applylist");
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
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientsDetails(pid).then(res => {
      this.patientInfo.API_basicInfo = res.API_basicInfo;
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
    font-size: 17px;
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
  left: 240px;
  bottom: 0px;
  width: calc(95% - 240px);
  z-index: 3000;
  transition: 0.5s;
}

.tips {
  margin-top: 20px;
  font-size: 18px;
}
</style>
