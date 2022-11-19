<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <personal-info :prsonalInfo="patientInfo.API_basicInfo"></personal-info>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">病情概况</h3>
          </template>
          <ill-state
            :illState="this.patientInfo.API_illState"
            :state="this.API_state"
            @modify="inputBoxShow('illState')"
            @vedio="videoPlay($event)"
          ></ill-state>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">患者病史</h3>
          </template>
          <div class="history">
            <p>既往史：{{this.patientInfo.API_history.API_patientHistory||"暂无"}}</p>
            <p>家族史：{{this.patientInfo.API_history.API_familyHistory||"暂无"}}</p>
            <p>过敏史：{{this.patientInfo.API_history.API_allergyHistory||"暂无"}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">检查结果</h3>
          </template>
          <ExamingResult :examInfo="this.patientInfo.API_examResult"></ExamingResult>
        </el-collapse-item>
        <el-collapse-item v-if="this.API_state!='申请中'" name="5">
          <template slot="title">
            <h3 class="title">诊断结论</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <div class="more">
                <el-link
                  v-show="this.API_state=='未完成'"
                  @click="pages.HistoryDialogVisable=true"
                  class="link"
                  type="success"
                >+导入诊断结论</el-link>
              </div>
            </div>
            <div class="text">
              <div class="box" @click="inputBoxShow('diagResult')">
                <p>{{API_diagInfo.API_diagResult.join("，")||"暂无"}}</p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="this.API_state!='申请中'" name="6">
          <template slot="title">
            <h3 class="title">治疗方案</h3>
          </template>
          <div class="diagResult">
            <div class="head clearfix">
              <div v-show="this.API_state=='未完成'" class="more">
                <el-link
                  @click="pages.HistoryTreatmentDialogVisable=true"
                  class="link"
                  type="success"
                >+导入治疗方案</el-link>
                <el-link @click="getPrescriptionHistory()" class="link" type="success">+导入处方</el-link>
              </div>
            </div>
            <div class="text">
              <div @click="inputBoxShow('treatment')" class="box">
                <p>{{API_diagInfo.API_treatment.API_description.join("，")||"暂无"}}</p>
              </div>
            </div>
            <div class="prescription">
              <div v-show="API_diagInfo.API_treatment.API_prescription.length>0">
                <span class="label">处方</span>
                <el-link
                  v-if="this.API_state=='未完成'"
                  type="danger"
                  @click="delPrescription"
                  style="float:right"
                >删除</el-link>
              </div>
              <prescription-edit
                v-if="this.API_state=='未完成'"
                @flagChange="prescriptionFlagChange"
                :prescription="API_diagInfo.API_treatment.API_prescription"
                v-model="API_diagInfo.API_treatment.API_prescription"
                type="type1"
              ></prescription-edit>
              <PrescriptionTable v-else :prescription="API_diagInfo.API_treatment.API_prescription"></PrescriptionTable>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item v-if="this.API_state!='申请中'" name="7">
          <template slot="title">
            <h3 class="title">后续治疗</h3>
          </template>
          <after
            :preInfo=" API_diagInfo.API_after"
            :medicalInfo="pages.medicalInfo"
            :state="this.API_state"
            @after="afterInfo($event)"
          ></after>
        </el-collapse-item>
        <el-button
          @click="save"
          size="medium"
          type="primary"
          class="btn"
        >{{this.API_state=='未完成'?'保存':'返回'}}</el-button>
      </el-collapse>
    </div>
    <div :class="this.$store.state.pageState?'inputBox':'inputBox2'">
      <!-- 病情描述输入 -->
      <special-input
        :data="pages.stateOptions"
        :flag="pages.inputBoxVisible.illState"
        :preValue="patientInfo.API_illState.API_description"
        @blur="inputBoxBlur('illState')"
        @select="inputBoxSelect($event,'illState')"
        @delete="inputBoxDelete($event,'illState')"
      ></special-input>

      <!-- 诊断结论描述输入 -->
      <special-input
        :data="pages.diagResultCheckReconmendList"
        :flag="pages.inputBoxVisible.diagResult"
        :preValue="API_diagInfo.API_diagResult"
        @blur="inputBoxBlur('diagResult')"
        @select="inputBoxSelect($event,'diagResult')"
        @delete="inputBoxDelete($event,'diagResult')"
      ></special-input>

      <!-- 治疗方案输入框 -->
      <special-input
        :data="pages.treatmentCheckReconmendList"
        :flag="pages.inputBoxVisible.treatment"
        :preValue="API_diagInfo.API_treatment.API_description"
        @blur="inputBoxBlur('treatment')"
        @select="inputBoxSelect($event,'treatment')"
        @delete="inputBoxDelete($event,'treatment')"
      ></special-input>
    </div>

    <!-- 视频对话框 -->
    <div v-show="pages.videoDialogVisible" v-drag class="drag">
      <span @click="videoDialogClose">X</span>
      <video :src="pages.videoDialogSrc" controls="controls" style="width:100%"></video>
    </div>

    <!-- 导入历史诊断结论 -->
    <el-dialog title="历史诊断结论" :visible.sync="pages.HistoryDialogVisable" width="40%">
      <el-table :data="pages.diagHistory" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="诊断结论">
          <template slot-scope="scope">
            <span>{{ scope.row.join('，') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="importResult(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <!-- 导入历史治疗方案 -->
    <el-dialog title="历史治疗方案" :visible.sync="pages.HistoryTreatmentDialogVisable" width="700px">
      <el-table ref="historyTreatment" :data="pages.treatHistory" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <PrescriptionTable :prescription="scope.row.API_prescription"></PrescriptionTable>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="治疗方案" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.API_description.join('，') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处方">
          <template slot-scope="scope">
            <el-button type="text" @click="toogleExpand(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" width="100" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="importTreatment(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>

    <!-- 导入处方 -->
    <div class="dialog">
      <el-dialog title="历史处方" :visible.sync="pages.HistoryPrescriptionDialogVisable" width="700px">
        <el-table :data="pages.prescriptionHistory" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="药物">
            <template slot-scope="scope">
              <span>{{ getDrugsName(scope.row.prescription)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" width="100" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="selectPrescription(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:30px">
          <div style="float:right">
            <el-link
              @click="prePrescriptionHistory"
              v-show="pages.historyPrescription.page>1"
              style="margin-right:20px"
            >上一页</el-link>
            <el-link
              style="margin-right:50px"
              @click="nextPrescriptionHistory"
              v-show="pages.historyPrescription.page<pages.historyPrescription.maxPage"
            >下一页</el-link>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPatientDetails,
  savePatientDiagInfo,
  getStateOptions,
  getResultOptions,
  getTreatmentOptions,
  getDiagHistory,
  getTreatHistory,
  getMedicalInfo,
  getHistoryPrescription
} from "../../api/patientdiag/patientdiag.js";
import message from "../../store/message/message.js";
import CheckBox from "../../components/common/CheckBox.vue";
import Prescription from "../../components/common/Prescription.vue";
import Radio from "../../components/common/Radio.vue";
import SpecialInput from "../../components/common/SpecialInput.vue";
import PrescriptionEdit from "../../components/common/PrescriptionEdit.vue";
import mixin from "./components/index.js";
export default {
  mixins: [mixin],
  components: {
    CheckBox: CheckBox,
    PrescriptionTable: Prescription,
    ChooseRadio: Radio,
    SpecialInput: SpecialInput,
    PrescriptionEdit: PrescriptionEdit
  },
  watch: {
    "pages.HistoryPrescriptionDialogVisable": function(value) {
      if (!value) {
        this.pages.historyPrescription.page = 1;
      }
    }
  },
  data() {
    return {
      API_state: "",
      pages: {
        collapse_activeNames: ["1", "2", "3", "4", "5", "6", "7"], //页面中激活的折叠面板
        videoDialogVisible: false, //视频播放框是否可见
        videoDialogSrc: "", //视频播放框中vedio标签的源
        stateOptions: [{ pinyin: "dx", value: "担心" }], //可以选择的病情描述项目，每一项由首字母组成的pinyin和项目名组成
        diagResultCheckReconmendList: [
          { pinyin: "aezhmzzq", value: "阿尔兹海默症中期" }
        ], //可以选择的诊断结论描述项目，每一项由首字母组成的pinyin和项目名组成
        treatmentCheckReconmendList: [
          { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
        ], //可以选择的治疗方案描述项目，每一项由首字母组成的pinyin和项目名组成
        diagHistory: [
          ["智能诊断系统显示患有阿尔兹海默症", "神经损伤"],
          ["神经损伤"]
        ], //可选的历史诊断结论
        HistoryDialogVisable: false, //导入历史诊断结论对话框是否可见
        treatHistory: [], //可选的历史治疗方案
        prescriptionHistory: [
          {
            prescription: [
              {
                API_drugsName: "青霉素",
                API_drugsNumberUnits: "片",
                API_drugsNumber: "10",
                API_drugsSpecification: "0.2g",
                API_drugsUsage: "2",
                API_useFrequency: "一天一次",
                API_useTime: "饭后"
              },
              {
                API_drugsName: "红霉素",
                API_drugsNumberUnits: "",
                API_drugsNumber: "",
                API_drugsUsage: "",
                API_drugsSpecification: "0.2g",
                API_useFrequency: "",
                API_useTime: ""
              }
            ]
          },
          {
            prescription: [
              {
                API_drugsName: "氯霉素",
                API_drugsNumberUnits: "",
                API_drugsNumber: "",
                API_drugsUsage: "",
                API_useFrequency: "",
                API_useTime: "",
                API_isEditable: false,
                API_days: ""
              },
              {
                API_drugsName: "红三",
                API_drugsNumberUnits: "",
                API_drugsNumber: "",
                API_drugsUsage: "",
                API_useFrequency: "",
                API_useTime: "",
                API_isEditable: false,
                API_days: ""
              }
            ]
          }
        ],
        HistoryTreatmentDialogVisable: false, //导入历史治疗方案对话框是否可见
        HistoryPrescriptionDialogVisable: false, //导入处方对话框是否可见
        medicalInfo: [
          {
            orgId: "1",
            orgName: "成都市第三人民医院",
            orgPic: "",
            doctors: [
              { docId: "101002", docPic: "", docName: "李四" },
              { docId: "101003", docPic: "", docName: "王五" },
              { docId: "101004", docPic: "", docName: "赵六" }
            ],
            nurses: [
              { nurId: "1", nurPic: "", nurName: "王三" },
              { nurId: "2", nurPic: "", nurName: "王二" },
              { nurId: "3", nurPic: "", nurName: "王大" }
            ]
          }
        ], //可选的医疗机构、医师、护士信息
        inputBoxVisible: {
          illState: false,
          diagResult: false,
          treatment: false
        },
        historyPrescription: {
          page: 1,
          maxPage: 0
        }
      },
      //患者相关信息
      patientInfo: {
        // 患者基本信息
        API_basicInfo: {
          API_pic: "",
          API_name: "",
          API_gender: "",
          API_birthday: "",
          API_address: "",
          API_tel: "",
          API_date: ""
        },
        // 患者病情描述
        API_illState: {
          API_description: [],
          API_audio: [
            {
              API_date: "",
              API_name: "",
              API_text: "",
              API_time: "",
              API_type: "",
              API_voice: ""
            }
          ],
          API_video: [
            {
              API_date: "",
              API_name: "",
              API_text: "",
              API_time: "",
              API_type: "",
              API_video: ""
            }
          ] //视频的地址，以数组的形式发过来
        },
        API_history: {
          API_allergyHistory: "",
          API_familyHistory: "",
          API_patientHistory: ""
        },
        API_examResult: [
          // {
          //   API_type: "",
          //   API_title: "",
          //   API_img: "", //图片文件
          //   API_aiResult: "" //智能诊断结论
          // }
        ]
      },
      API_diagInfo: {
        //诊断结论
        API_diagResult: [],
        //治疗方案
        API_treatment: {
          API_description: [],
          API_prescriptionFlag: true,
          API_prescription: [] //处方
        },
        // 推荐医疗机构/医师/护士
        API_after: []
      }
    };
  },
  methods: {
    getDrugsName(item) {
      let drugsName = [];
      item.forEach(element => {
        drugsName.push(element.API_drugsName);
      });
      return drugsName.join("，");
    },
    selectPrescription(item) {
      this.API_diagInfo.API_treatment.API_prescription = item.prescription;
      this.API_diagInfo.API_treatment.API_prescriptionFlag = true;
      this.pages.HistoryPrescriptionDialogVisable = false;
    },
    prescriptionFlagChange(flag) {
      this.API_diagInfo.API_treatment.API_prescriptionFlag = flag;
    },
    videoDialogClose() {
      this.pages.videoDialogVisible = false;
      this.pages.videoDialogSrc = "";
    },
    videoPlay(item) {
      this.pages.videoDialogVisible = true;
      this.pages.videoDialogSrc = item;
    },

    searchHistory() {
      console.log("查看病历");
    },

    delPrescription() {
      this.pages.prescription = [];
      this.API_diagInfo.API_treatment.API_prescription = [];
    },

    save() {
      if (this.API_state == "未完成") {
        savePatientDiagInfo(
          localStorage.getItem("pid"),
          this.API_state,
          this.patientInfo.API_illState,
          this.API_diagInfo
        );
      } else {
        this.$router.push("/patientdiag/todaydiagnosis");
      }
    },
    prePrescriptionHistory() {
      this.pages.historyPrescription.page--;
      this.getPrescriptionHistory(this.pages.historyPrescription.page);
    },
    nextPrescriptionHistory() {
      this.pages.historyPrescription.page++;
      this.getPrescriptionHistory(this.pages.historyPrescription.page);
    },
    getPrescriptionHistory() {
      getHistoryPrescription(this.pages.historyPrescription.page).then(res => {
        this.pages.historyPrescription.maxPage = parseInt(res.Maxnum / 5);
        this.pages.prescriptionHistory = res.prescriptionHistory;
        this.pages.HistoryPrescriptionDialogVisable = true;
      });
    },
    importResult(row) {
      this.API_diagInfo.API_diagResult = row;
      this.pages.HistoryDialogVisable = false;
    },
    importTreatment(row) {
      this.API_diagInfo.API_treatment = row;
      this.API_diagInfo.API_treatment.API_prescriptionFlag = true;
      this.pages.HistoryTreatmentDialogVisable = false;
    },
    toogleExpand(row) {
      let $table = this.$refs.historyTreatment;
      $table.toggleRowExpansion(row);
    },
    inputBoxShow(type) {
      if (this.API_state == "未完成") {
        switch (type) {
          case "illState":
            this.inputBoxBlur("diagResult");
            this.inputBoxBlur("treatment");
            this.pages.inputBoxVisible.illState = true;
            break;
          case "diagResult":
            this.inputBoxBlur("illState");
            this.inputBoxBlur("treatment");
            this.pages.inputBoxVisible.diagResult = true;
            break;
          case "treatment":
            this.inputBoxBlur("illState");
            this.inputBoxBlur("diagResult");
            this.pages.inputBoxVisible.treatment = true;
            break;
        }
      }
    },
    inputBoxBlur(type) {
      switch (type) {
        case "illState":
          this.pages.inputBoxVisible.illState = false;
          break;
        case "diagResult":
          this.pages.inputBoxVisible.diagResult = false;
          break;
        case "treatment":
          this.pages.inputBoxVisible.treatment = false;
          break;
      }
    },
    inputBoxDelete(index, type) {
      switch (type) {
        case "illState":
          this.patientInfo.API_illState.API_description.splice(index, 1);
          break;
        case "diagResult":
          this.API_diagInfo.API_diagResult.splice(index, 1);
          break;
        case "treatment":
          this.API_diagInfo.API_treatment.API_description.splice(index, 1);
          break;
      }
    },
    inputBoxSelect(data, type) {
      switch (type) {
        case "illState":
          this.patientInfo.API_illState.API_description.push(data);
          break;
        case "diagResult":
          this.API_diagInfo.API_diagResult.push(data);
          break;
        case "treatment":
          this.API_diagInfo.API_treatment.API_description.push(data);
          break;
      }
    },
    afterInfo(info) {
      this.API_diagInfo.API_after = info;
    }
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function(el) {
        let odiv = el; //获取当前元素
        el.onmousedown = e => {
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft;
          let disY = e.clientY - odiv.offsetTop;
          let left = "";
          let top = "";
          document.onmousemove = e => {
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX;
            top = e.clientY - disY;
            //绑定元素位置到positionX和positionY上面
            //移动当前元素
            odiv.style.left = left + "px";
            odiv.style.top = top + "px";
          };
          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    }
  },
  mounted() {
    let pid = localStorage.getItem("pid");
    getPatientDetails(pid).then(res => {
      this.patientInfo = res.patientInfo;
      this.API_diagInfo = res.API_diagInfo;
      console.log(this.API_state);
      this.API_state = res.API_state;
    });
    getStateOptions().then(res => {
      this.pages.stateOptions = res;
    });
    getResultOptions().then(res => {
      this.pages.diagResultCheckReconmendList = res;
    });
    getTreatmentOptions().then(res => {
      this.pages.treatmentCheckReconmendList = res;
    });
    getDiagHistory().then(res => {
      this.pages.diagHistory = res;
    });
    getTreatHistory().then(res => {
      this.pages.treatHistory = res;
    });
    getMedicalInfo().then(res => {
      this.pages.medicalInfo = res;
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

  .history {
    p {
      font-size: 18px;
      text-indent: 40px;
    }
  }
  .examResult {
    width: 95%;
    margin: auto;
    .textdefault {
      text-indent: 40px;
      font-size: 18px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .imgExam {
      display: flex;
      justify-content: space-between;
      .info {
        width: 300px;
        padding-left: 30px;
        border-left: 2px solid #d9d9d9;
        .label {
          font-weight: bold;
          font-size: 20px;
        }
        .text {
          text-indent: 20px;
          font-size: 18px;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .img {
        flex-shrink: 0;
      }
    }
    .tableExam {
      display: flex;
      justify-content: space-between;
      max-height: 350px;
      .table {
        flex-shrink: 0;
        width: 50%;
        min-width: 500px;
      }
      .pic {
        width: 45%;
        margin-top: 30px;
        margin-left: 30px;
        // max-height: 300px;
        overflow-y: auto;
      }
    }
  }
  .diagResult {
    width: 95%;
    margin: auto;
    .head {
      .checkBox {
        float: left;
      }
      .more {
        float: right;
        .link {
          margin-left: 30px;
        }
      }
    }
    .box {
      width: 100%;
      min-height: 100px;
      margin-top: 5px;
      border: 1px solid #e4e7ed;
      p {
        margin-top: 5px;
        font-size: 18px;
        text-indent: 20px;
      }
    }

    .prescription {
      margin-top: 20px;
      .label {
        font-size: 18px;
        color: #1c7e7c;
      }
    }
  }
  .after {
    width: 95%;
    margin: auto;
    .select {
      margin-top: 20px;
      margin-right: 50px;
    }
    .label {
      font-size: 18px;
    }
    .doc-nur {
      margin-top: 20px;
      display: flex;
      div {
        margin-right: 20px;
      }
    }
    .box {
      width: 100%;
      margin-top: 5px;
      margin-bottom: 20px;
      // border: 1px solid #e4e7ed;
    }
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
.inputBox {
  position: fixed;
  bottom: 0px;
  width: calc(89% - 240px);
  z-index: 100;
  transition: 0.5s;
}

.inputBox2 {
  position: fixed;
  bottom: 0px;
  width: calc(89%);
  transition: 0.5s;
}
.pageSwitch {
  .btn {
    float: right;
  }
}
</style>

<style lang="scss">
.dialog {
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
}
</style>
