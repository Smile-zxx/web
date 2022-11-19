<template>
  <!-- 评估日志 -->
  <div>
    <div class="search">
      <span class="formLabel">时间：</span>
      <el-date-picker
        v-model="pages.timeRange"
        type="daterange"
        size="small"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>

    <div class="treatmentLog">
      <div v-show="showTable.length==0" class="tips">暂无治疗记录</div>
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
      <div class="block" style="float:right;margin:20px 0px;">
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

export default {
  name: "TreatLogs",
  props: {
    TreatLogs: {
      type: Array,
      default: () => {
        return [
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          },
          {
            API_prescription: [],
            API_patientState: ["好的好的", "您说的对"],
            API_description: ["可以可以", "您说的有道理"],
            API_date: "2020-09-17"
          }
        ];
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
  computed: {
    showTable() {
      let arr = [];
      this.TreatLogs.forEach(element => {
        if (this.pages.timeRange) {
          let time1 = new Date(this.pages.timeRange[0]).getTime();
          let time2 = new Date(this.pages.timeRange[1]).getTime();
          let time = new Date(element.API_date).getTime();
          if (time > time1 && time < time2) {
            arr.push(element);
          }
        } else {
          arr.push(element);
        }
      });

      return arr;
    }
  },
  data() {
    return {
      dialogVisible: false,
      pages: {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [
            {
              text: "三天后",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
                picker.$emit("pick", date);
              }
            },
            {
              text: "一周后",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              }
            },
            {
              text: "半月后",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
                picker.$emit("pick", date);
              }
            }
          ]
        },
        timeRange: "",
        currentPage: 1,
        pageSize: 5,
        newLogFlag: false,
        questionnaire: {
          temptarget: "",
          target: "",
          questionnaireOptions: [
            { label: "吞咽功能评定", value: "TUNYAN" },
            { label: "跌倒风险评定", value: "DIEDAO" }
          ]
        }
      },
      nextPingguTime: ""
    };
  },
  components: {
    // NewTreatmentLog
  },
  methods: {
    handleSizeChange(val) {
      this.pages.pageSize = val;
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val;
    },

    lookQuestionnaire(log) {
      if (log.show) {
        log.show = false;
      } else {
        log.show = true;
        switch (log.name) {
          case "吞咽功能评定":
            log.type = "TUNYAN";
            break;
          case "跌倒风险评定":
            log.type = "DIEDAO";
            break;
        }
      }
      this.TreatLogs.push({});
      this.TreatLogs.pop();
    }
  }
};
</script>

<style lang="scss" scoped>
.newTreatLog {
  .header {
    width: 100%;
    text-align: center;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #1c7e7c;
    }
    .close {
      float: right;
      cursor: pointer;
    }
  }
  .footer {
    height: 50px;
  }
  width: 95%;
  margin: auto;
  padding: 10px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
}
.treatmentLog {
  .card {
    width: 95%;
    margin: auto;
    display: flex;
    margin-top: 20px;
    background-color: #eff3f4;
    border-radius: 5px;
    padding: 15px;
    .date {
      font-size: 18px;
      color: #1c7e7c;
    }
    .treatmentLog {
      margin-left: 30px;
      font-size: 18px;
    }
  }
}
.search {
  margin: 20px 0;
  .formLabel {
    font-size: 16px;
    color: #1c7e7c;
  }
  .clearfix:after {
    content: ""; /*设置内容为空*/
    height: 0; /*高度为0*/
    line-height: 0; /*行高为0*/
    display: block; /*将文本转为块级元素*/
    visibility: hidden; /*将元素隐藏*/
    clear: both; /*清除浮动*/
  }
}
</style>