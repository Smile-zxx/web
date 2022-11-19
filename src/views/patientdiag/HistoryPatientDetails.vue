<template>
  <div>
    <div class="mainContent">
      <el-collapse v-model="pages.collapse_activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <div class="basicInfo clearfix">
            <div class="pic">
              <img :src="patientInfo.API_basicInfo.API_pic" alt />
            </div>
            <div class="info">
              <div>
                <div>姓名：{{patientInfo.API_basicInfo.API_name}}</div>
                <div>性别：{{patientInfo.API_basicInfo.API_gender}}</div>
                <div>出生日期：{{new Date(patientInfo.API_basicInfo.API_birthday).toLocaleDateString()}}</div>
              </div>
              <div>
                <div>家庭住址：{{patientInfo.API_basicInfo.API_address}}</div>
              </div>
              <div>
                <div>联系方式：{{patientInfo.API_basicInfo.API_tel}}</div>
                <div>就诊时间：{{patientInfo.API_basicInfo.API_date}}</div>
                <div>
                  <!-- <el-link type="primary" @click="searchHistory">查看病历</el-link> -->
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="title">病情概况</h3>
          </template>
          <div class="illState">
            <div class="description">
              <div>
                <p>{{this.patientInfo.API_illState.API_description.length>0?this.patientInfo.API_illState.API_description.join("，"):"暂无"}}</p>
              </div>
              <div>
                <!-- <el-link @click="illStateModify" type="success" style="float:right">修改</el-link> -->
              </div>
            </div>
            <div
              class="media"
              v-if="patientInfo.API_illState.API_audio.length>0||patientInfo.API_illState.API_video.length>0"
            >
              <div>
                <el-link
                  v-if="patientInfo.API_illState.API_audio.length>0"
                  type="primary"
                  @click="mediaSwich('audio')"
                >音频</el-link>
                <template>
                  <span
                    v-if="patientInfo.API_illState.API_audio.length>0&&patientInfo.API_illState.API_video.length>0"
                    class="switch"
                  >/</span>
                  <el-link
                    v-if="patientInfo.API_illState.API_video.length>0"
                    type="primary"
                    @click="mediaSwich('video')"
                  >视频</el-link>
                </template>
              </div>
              <div
                v-if="patientInfo.API_illState.API_audio.length>0"
                v-show="this.pages.AVshow=='audio'"
              >
                <div v-for="item in patientInfo.API_illState.API_audio" :key="item.id">
                  <div>
                    <audio
                      :src="item.API_voice"
                      controls="controls"
                      preload="auto"
                      style="height:20px"
                    ></audio>
                  </div>
                  <div>
                    <!-- <p>{{item.API_text}}</p> -->
                  </div>
                </div>
              </div>
              <div
                v-if="patientInfo.API_illState.API_video.length>0"
                v-show="this.pages.AVshow=='video'"
              >
                <!-- <video
                  :src="patientInfo.API_illState.API_video[0].API_video"
                  preload="auto"
                  controls="controls"
                  style="width:100%"
                ></video>-->
                <div v-for="(item,index) in patientInfo.API_illState.API_video" :key="item.id">
                  <el-link
                    @click="videoPlay(item)"
                  >{{index+1}}.{{item.API_name}}({{Math.floor(item.API_time)}}s)</el-link>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="title">患者病史</h3>
          </template>
          <div class="history">
            <p>既往史：{{this.patientInfo.API_history.API_patientHistory}}</p>
            <p>家族史：{{this.patientInfo.API_history.API_familyHistory}}</p>
            <p>过敏史：{{this.patientInfo.API_history.API_allergyHistory}}</p>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4">
          <template slot="title">
            <h3 class="title">检查结果</h3>
          </template>
          <div class="examResult">
            <el-tabs type="card" value="0">
              <el-tab-pane
                v-for="(item,index) in patientInfo.API_examResult"
                :key="item.id"
                :label="item.API_title"
                :name="index+''"
              >
                <template v-if="item.API_type=='img'">
                  <div class="imgExam">
                    <div class="img">
                      <el-image
                        style="width: 500px;"
                        :src="item.API_img"
                        :preview-src-list="[item.API_img]"
                      ></el-image>
                    </div>
                    <div class="info">
                      <div>
                        <span class="label">智能诊断</span>
                      </div>
                      <div>
                        <p class="text">{{item.API_aiResult}}</p>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-if="item.API_type=='table'">
                  <div class="tableExam">
                    <div class="table">
                      <el-table
                        size="mini"
                        max-height="350px"
                        :data="item.API_table.API_data"
                        style="width: 100%"
                      >
                        <el-table-column prop="API_item" label="项目"></el-table-column>
                        <el-table-column label>
                          <template slot-scope="scope">
                            <i
                              v-if="scope.row.API_result<scope.row.API_rangeBottom"
                              class="el-icon-bottom"
                            ></i>
                            <i
                              v-if="scope.row.API_result>scope.row.API_rangeTop"
                              class="el-icon-top"
                            ></i>
                          </template>
                        </el-table-column>
                        <el-table-column prop="API_result" label="结果"></el-table-column>
                        <el-table-column prop="API_unit" label="单位"></el-table-column>
                        <el-table-column label="参考范围">
                          <template slot-scope="scope">
                            <span>{{scope.row.API_rangeBottom+"~"+scope.row.API_rangeTop}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="pic">
                      <el-image
                        style="width:100%;"
                        :src="item.API_img"
                        :preview-src-list="[item.API_img]"
                      ></el-image>
                    </div>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5">
          <template slot="title">
            <h3 class="title">诊断结论</h3>
          </template>
          <div class="diagResult">
            <!-- <div class="head clearfix">
              <div class="checkBox">
                <el-checkbox-group v-model="API_diagInfo.API_diagResult">
                  <el-checkbox
                    v-for="item in pages.diagResultCheckReconmendList.slice(0,2)"
                    :key="item.id"
                    :label="item.value"
                  ></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="more">
                <el-link @click="diagResultModify" class="link" type="success">更多选项</el-link>
                <el-link
                  @click="pages.HistoryDialogVisable=true"
                  class="link"
                  type="success"
                >+导入诊断结论</el-link>
              </div>
            </div>-->
            <div class="text">
              <div class="box">
                <p>{{API_diagInfo.API_diagResult.join("，")}}</p>
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="6">
          <template slot="title">
            <h3 class="title">治疗方案</h3>
          </template>
          <div class="diagResult">
            <div class="text">
              <div class="box">
                <p>{{API_diagInfo.API_treatment.API_description.join("，")}}</p>
              </div>
            </div>
            <div v-show="API_diagInfo.API_treatment.API_prescription.length>0" class="prescription">
              <span class="label">处方</span>
              <!-- <el-link type="danger" @click="delPrescription" style="float:right">删除</el-link> -->
              <PrescriptionTable :prescription="API_diagInfo.API_treatment.API_prescription"></PrescriptionTable>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="7">
          <template slot="title">
            <h3 class="title">后续治疗</h3>
          </template>
          <div class="after">
            <after :preInfo=" API_diagInfo.API_after" :state="this.API_state"></after>
            <!-- <div>
              <span class="label">推荐医疗机构：{{API_diagInfo.API_after.API_org.API_orgName||"未选择"}}</span>
            </div>
            <div>
              <span class="label">推荐主管医师：{{API_diagInfo.API_after.API_doc.API_docName||"未选择"}}</span>
            </div>
            <div>
              <span class="label">推荐主管护士：{{API_diagInfo.API_after.API_nur.API_nurName||"未选择"}}</span>
            </div>-->
          </div>
        </el-collapse-item>
        <el-button @click="save" size="medium" type="primary" class="btn">返回</el-button>
      </el-collapse>
    </div>
    <!-- 视频对话框 -->
    <div v-show="pages.videoDialogVisible" v-drag class="drag">
      <span @click="videoDialogClose">X</span>
      <video :src="pages.videoDialogSrc" controls="controls" style="width:100%"></video>
    </div>
  </div>
</template>

<script>
import { arrSubtraction } from "../../utils/common.js";
import {
  getPatientDetails,
  savePatientDiagInfo,
  getStateOptions,
  getResultOptions,
  getTreatmentOptions,
  getDiagHistory,
  getTreatHistory,
  getMedicalInfo
} from "../../api/patientdiag/patientdiag.js";
import message from "../../store/message/message.js";
import CheckBox from "../../components/common/CheckBox.vue";
import Prescription from "../../components/common/Prescription.vue";
import Radio from "../../components/common/Radio.vue";
import mixin from "./components/index.js";
export default {
  mixins: [mixin],
  components: {
    CheckBox: CheckBox,
    PrescriptionTable: Prescription,
    ChooseRadio: Radio
  },
  data() {
    return {
      pages: {
        collapse_activeNames: ["1", "2", "3", "4", "5", "6", "7"], //页面中激活的折叠面板
        AVshow: "video", //音视频切换标志
        videoDialogVisible: false, //视频播放框是否可见
        videoDialogSrc: "", //视频播放框中vedio标签的源
        illStateDialog: false, //病情描述对话框是否可见标志
        checkList: [], //病情描述选中的项目数组
        stateOptions: [{ pinyin: "dx", value: "担心" }], //可以选择的病情描述项目，每一项由首字母组成的pinyin和项目名组成
        diagResultCheckReconmendList: [
          { pinyin: "aezhmzzq", value: "阿尔兹海默症中期" }
        ], //可以选择的诊断结论描述项目，每一项由首字母组成的pinyin和项目名组成
        diagResultCheckList: [], //诊断结论选中的项目数组
        treatmentCheckReconmendList: [
          { pinyin: "yjjxsszl", value: "建议到医院进行手术治疗" }
        ], //可以选择的治疗方案描述项目，每一项由首字母组成的pinyin和项目名组成
        treatmentCheckList: [], //治疗方案选中的项目数组
        diagResultDialogVisible: false, //诊断结论对话框是否可见
        treatmentDialogVisible: false, //治疗方案对话框是否可见
        afterInfo: {
          orgList: [
            {
              orgName: "成都市第三人民医院",
              orgId: "0001"
            },
            {
              orgName: "成都市第一人民医院",
              orgId: "2"
            }
          ],
          docList: [
            { docName: "张三", docId: "0001" },
            { docName: "李四", docId: "101002" }
          ],
          nurList: [
            { nurName: "张三", nurId: "0001" },
            { nurName: "王二", nurId: "103001" }
          ]
        }, //医疗机构选项
        prescriptionDialogVisible: false, //处方对话框是否可见
        prescription: [
          {
            API_drugsName: "",
            API_drugsNumberUnits: "",
            API_drugsNumber: "",
            API_drugsUsage: "",
            API_useFrequency: "",
            API_useTime: "",
            API_isEditable: false,
            API_days: ""
          }
        ], //默认处方表格格式
        diagHistory: [
          ["智能诊断系统显示患有阿尔兹海默症", "神经损伤"],
          ["神经损伤"]
        ], //可选的历史诊断结论
        HistoryDialogVisable: false, //导入历史诊断结论对话框是否可见
        treatHistory: [
          {
            API_description: ["建议采用中药治疗", "建议采用西药治疗"],
            API_prescription: [
              {
                API_drugsName: "含曲林片",
                API_drugsNumberUnits: "盒",
                API_drugsNumber: "2",
                API_drugsUsage: "一次两粒",
                API_useFrequency: "一天一次",
                API_useTime: "饭后",
                API_isEditable: false,
                API_days: "7"
              }
            ]
          },
          {
            API_description: ["建议采用中药治疗"],
            API_prescription: []
          },
          {
            API_description: ["建议采用中药治疗"],
            API_prescription: [
              {
                API_drugsName: "含曲林片",
                API_drugsNumberUnits: "盒",
                API_drugsNumber: "2",
                API_drugsUsage: "一次两粒",
                API_useFrequency: "一天一次",
                API_useTime: "饭后",
                API_isEditable: false,
                API_days: "7"
              }
            ]
          }
        ], //可选的历史治疗方案
        HistoryTreatmentDialogVisable: false, //导入历史治疗方案对话框是否可见
        medicalInfo: [
          {
            orgId: "1",
            orgName: "成都市第三人民医院",
            doctors: [
              { docId: "101002", docName: "李四" },
              { docId: "101003", docName: "王五" },
              { docId: "101004", docName: "赵六" }
            ],
            nurses: [
              { nurId: "1", nurName: "王三" },
              { nurId: "2", nurName: "王二" },
              { nurId: "3", nurName: "王大" }
            ]
          }
        ], //可选的医疗机构、医师、护士信息
        choosedOrg: {
          orgId: "",
          orgName: "",
          doctors: [],
          nurses: []
        }
      },
      API_state: "已完成",
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
          {
            API_type: "",
            API_title: "",
            API_img: "", //图片文件
            API_aiResult: "" //智能诊断结论
          }
        ]
      },
      API_diagInfo: {
        //诊断结论
        API_diagResult: ["", ""],
        //治疗方案
        API_treatment: {
          API_description: ["", ""],
          API_prescription: [
            // {
            //   API_drugsName: "含曲林片",
            //   API_drugsNumberUnits: "盒",
            //   API_drugsNumber: "2",
            //   API_drugsUsage: "一次两粒",
            //   API_useFrequency: "一天一次",
            //   API_useTime: "饭后",
            //   API_isEditable: false,
            //   API_days: "7"
            // }
          ], //处方
          API_prescriptionFlag: true
        },
        // 推荐医疗机构/医师/护士
        API_after: []
      }
    };
  },
  methods: {
    videoDialogClose() {
      this.pages.videoDialogVisible = false;
      this.pages.videoDialogSrc = "";
    },
    videoPlay(item) {
      this.pages.videoDialogVisible = true;
      this.pages.videoDialogSrc = item.API_video;
    },
    mediaSwich(type) {
      this.pages.AVshow = type;
    },
    searchHistory() {
      console.log("查看病历");
    },
    handleEdit(index, row) {
      row.isEditable = true;
      console.log(index, row);
    },
    handleSave(index, row) {
      row.isEditable = false;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    prescriptionModify() {
      this.pages.prescriptionDialogVisible = true;
      let obj = JSON.parse(
        JSON.stringify(this.API_diagInfo.API_treatment.API_prescription)
      );
      obj.forEach(item => {
        item.isEditable = false;
      });
      this.pages.prescription = obj;
    },
    sevePrescription() {
      this.pages.prescriptionDialogVisible = false;
      this.API_diagInfo.API_treatment.API_prescription = JSON.parse(
        JSON.stringify(this.pages.prescription)
      );
    },
    delPrescription() {
      this.pages.prescription = [];
      this.API_diagInfo.API_treatment.API_prescription = [];
    },
    addMedical() {
      this.pages.prescription.push({
        name: "",
        specification: "",
        number: "",
        usage: "",
        frequency: "",
        isEditable: true,
        days: ""
      });
    },
    delMedical(index, row) {
      this.pages.prescription.splice(index, 1);
    },
    save() {
      this.$router.push("/patientdiag/historydiagnosis");
      // savePatientDiagInfo(
      //   this.API_state,
      //   this.patientInfo.API_illState.API_description,
      //   this.API_diagInfo
      // );
    },
    illStateModify() {
      this.pages.checkList = JSON.parse(
        JSON.stringify(this.patientInfo.API_illState.API_description)
      );
      this.pages.illStateDialog = true;
    },
    illStateSave() {
      if (this.pages.checkList.length > 0) {
        this.patientInfo.API_illState.API_description = JSON.parse(
          JSON.stringify(this.pages.checkList)
        );
      } else {
        this.patientInfo.API_illState.API_description = [];
      }
      this.pages.illStateDialog = false;
    },
    diagResultModify() {
      if (this.API_diagInfo.API_diagResult.length > 0) {
        this.pages.diagResultCheckList = JSON.parse(
          JSON.stringify(this.API_diagInfo.API_diagResult)
        );
      } else {
        this.pages.diagResultCheckList = [];
      }
      this.pages.diagResultDialogVisible = true;
    },
    diagResultSave() {
      if (this.pages.diagResultCheckList.length > 0) {
        this.API_diagInfo.API_diagResult = JSON.parse(
          JSON.stringify(this.pages.diagResultCheckList)
        );
      } else {
        this.API_diagInfo.API_diagResult = [];
      }
      this.pages.diagResultDialogVisible = false;
    },
    treatmentModify() {
      if (this.API_diagInfo.API_treatment.API_description.length > 0) {
        this.pages.treatmentCheckList = JSON.parse(
          JSON.stringify(this.API_diagInfo.API_treatment.API_description)
        );
      } else {
        this.pages.treatmentCheckList = [];
      }
      this.pages.treatmentDialogVisible = true;
    },
    treatmentSave() {
      if (this.pages.treatmentCheckList.length > 0) {
        this.API_diagInfo.API_treatment.API_description = JSON.parse(
          JSON.stringify(this.pages.treatmentCheckList)
        );
      } else {
        this.API_diagInfo.API_treatment.API_description = [];
      }
      this.pages.treatmentDialogVisible = false;
    },
    importResult(row) {
      this.API_diagInfo.API_diagResult = row;
      this.pages.HistoryDialogVisable = false;
    },
    importTreatment(row) {
      this.API_diagInfo.API_treatment = row;
      this.pages.HistoryTreatmentDialogVisable = false;
    },
    toogleExpand(row) {
      console.log(row);
      let $table = this.$refs.historyTreatment;
      $table.toggleRowExpansion(row);
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
      this.API_state = res.API_state;
      console.log(this.API_diagInfo);
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
  .basicInfo {
    padding-left: 20px;
    padding-top: 20px;
    .pic {
      width: 170px;
      height: 150px;
      border-right: 1px solid #d9d9d9;
      padding-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
      margin: auto;
      float: left;
    }
    .info {
      float: left;
      margin-left: 20px;
      width: 65%;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
      }
    }
  }
  .illState {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .description {
      width: 100%;
      height: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 18px;
        text-indent: 40px;
      }
    }
    .media {
      flex-shrink: 0;
      align-self: stretch;
      width: 450px;
      border-left: 2px solid #d9d9d9;
      padding-left: 20px;
      .switch {
        margin: 0 5px;
      }
      audio {
        margin-top: 10px;
      }
    }
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
</style>

<style lang="scss">
</style>
