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
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">患者评估</h3>
          </template>
          <div class="container">
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
                    class="quesComponent"
                    @commit="pingguCommit(index, $event)"
                    @cancel="pingguCancel(item, index)"
                    :preData="item.data"
                    :readonly="item.state == '已完成' ? true : false"
                    :is="item.type"
                  ></components>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <div>
          <Reference ref="Reference"></Reference>
        </div>
        <el-button @click="save" size="medium" type="primary" class="btn"
          >确认</el-button
        >
      </el-collapse>

      <!-- 聊天 -->
      <chatBox></chatBox>
    </div>
  </div>
</template>

<script>
import Prescription from "@components/common/Prescription.vue";
import chatBox from "@components/chatBox/chatBox.vue";

import PersonalInfo from "./components/PersonalInfo.vue";
import DiagHistory from "./components/PatientDiagResult.vue";
import Reference from "./components/Reference.vue";

import questionnaire from "../questionnaires/mixin.js";

import {
  getPatientsDetails,
  newQuestionnaire,
  getApplyDetails,
  postRuyuanPinggu,
  pingguConfirm
} from "@api/operationmanage/operationmanage.js";
export default {
  mixins: [questionnaire],
  components: {
    PrescriptionTable: Prescription,
    PersonalInfo: PersonalInfo,
    chatBox,
    DiagHistory,
    Reference
  },
  data() {
    return {
      moveTest(type) {
        let height = this.$refs[type].offsetTop;
        console.log(height);
        let el = document.getElementById("mainContent");
        el.scroll({
          top: height, //向上移动的距离，如果有fixede布局， 直接减去对应距离即可
          behavior: "smooth" // 平滑移动
        });
      },
      pages: {
        pageSize: 5,
        currentPage: 1,
        collapse_activeNames: ["1", "3"],
        search: {
          API_name: "",
          API_state: "",
          API_dateRange: ""
        },
        questionnaire: {
          chooseDialogVisible: false,
          questionnaireDialogVisible: false,
          target: "",
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
      newPinggu: [] //用一个数组来存储新录入的评估表，
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
      let flag = true;
      this.pinggu.forEach((item, index) => {
        if (item.state == "未完成") {
          flag = false;
        }
      });

      if (flag) {
        let pid = localStorage.getItem("pid");
        pingguConfirm(pid).then(res => {
          if (res) {
            this.$message.success("入院评估完成");
            this.$router.push("/operationmanage/applylist");
          }
        });
      } else {
        this.$message.error("请完善入院评估");
      }
    },
    jinxingpinggu(item, index) {
      let obj = JSON.parse(JSON.stringify(item));
      if (item.isOpen) {
        obj.isOpen = true;
      } else {
        obj.isOpen = true;
      }
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
    pingguCommit(index, data) {
      let pid = localStorage.getItem("pid");
      postRuyuanPinggu(pid, data).then(res => {
        if (res) {
          this.pinggu.forEach((item, index) => {
            if (item.name == data.name) {
              data.state = "已完成";
              switch (data.name) {
                case "跌倒风险评定":
                  data.type = "DIEDAO";
                  break;
                case "吞咽功能评定":
                  data.type = "TUNYAN";
                  break;
              }
              this.pinggu.splice(index, 1, data);
            }
          });
        }
      });
      this.$message.success("提交成功");
    },
    addTabs(name) {
      this.$refs["Reference"].addTab(name);
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getApplyDetails(pid).then(res => {
      this.patientInfo.API_basicInfo = res.API_basicInfo;
      this.pinggu = res.API_questionnaire;
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
  .quesComponent {
    margin: 20px auto;
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
