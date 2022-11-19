<template>
  <div>
    <div class="search">
      <span class="formLabel">时间：</span>
      <el-date-picker
        v-model="pages.searchForm.timeRange"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="treatmentLog">
      <div v-show="API_treatmentLog.length==0" class="tips">暂无治疗记录</div>
      <div
        v-for="item in showTable.slice((pages.currentPage-1)*pages.pageSize,(pages.currentPage-1)*pages.pageSize+pages.pageSize)"
        :key="item.id"
        class="card"
      >
        <div class="date">
          <p>{{ new Date(item.API_date).toLocaleDateString()}}</p>
        </div>
        <div class="treatmentLog">
          <p>患者状况：{{item.API_patientState.join(',')||"暂无"}}</p>
          <p>治疗意见：{{item.API_description.join(',')||"暂无"}}</p>
          <div v-if="item.API_prescription.length>0">
            <el-link @click="lookPrescription(item.API_prescription)" type="primary">查看处方</el-link>
          </div>
        </div>
      </div>
    </div>
    <div class="page clearfix">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pages.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pages.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showTable.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import SpecialInput from "@components/common/SpecialInput.vue";
import PrescriptionEdit from "@components/common/PrescriptionEdit.vue";
import Prescription from "@components/common/Prescription.vue";
export default {
  name: "NewTreatmentLog",
  props: {
    NursingLogs: {
      type: Object,
      default: () => {
        return {
          API_patientState: ["头疼", "眼花缭乱"],
          API_treatment: ["按时吃药", "定时体检"],
          API_prescription: [
            {
              API_drugsName: "含曲林片",
              API_drugsNumberUnits: "盒",
              API_drugsNumber: "2",
              API_drugsUsage: "一次两粒",
              API_useFrequency: "一天一次",
              API_drugsSpecification: "0.1g",
              API_useTime: "饭后",
              API_isEditable: false,
              API_days: "7"
            }
          ]
        };
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          type: "newLog"
        };
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      pages: {
        searchForm: {
          timeRange: ""
        },
        currentPage: 1,
        pageSize: 5
      },
      nursingLogs: [
        {
          API_date: "2019-7-8",
          API_nursingLog: {
            API_data: {
              T: "",
              P: "",
              HR: "",
              R: "",
              BP: "",
              SPO2: "",
              ruliang: {
                mingcheng: "",
                fenglei: "",
                tujing: "",
                liang: ""
              },
              chuliang:{
                mingcheng:"",
                liang:""
              },
              jili:"",
              fanshenwowei:"",
              shifouyueshu:""
            },
            API_text: ""
          }
        }
      ]
    };
  },
  components: {
    SpecialInput,
    PrescriptionEdit,
    Prescription
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.newLog {
  .label {
    font-size: 16px;
    color: #1c7e7c;
  }
  .box {
    width: 100%;
    min-height: 60px;
    margin-top: 5px;
    border: 1px solid #e4e7ed;
    p {
      margin-top: 5px;
      font-size: 16px;
      text-indent: 20px;
    }
  }
}
</style>