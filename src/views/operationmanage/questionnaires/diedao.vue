<template>
  <div class="questionnaire">
    <!-- 
    跌倒风险评定

                <components
                    @commit="pingguCommit(index,$event)"
                    @cancel="pingguCancel(item,index)"
                    :preData="item.data"
                    :readonly="item.state=='已完成'?true:false"
                    :is="item.type"
                  ></components>
    -->
    <div class="header">
      <span class="title">跌倒风险评定</span>
    </div>
    <el-form
      size="mini"
      ref="form"
      label-position="left"
      :model="form"
      label-width="0px"
    >
      <div @input="formInput">
        <div>
          <span class="label">一、评估</span>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{
                "近3月有无跌倒/视觉障碍" + "："
              }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                disable
                v-model="questionnaire.youwudiedao"
              >
                <el-radio disable class="radioItem" label="无=0"></el-radio>
                <el-radio class="radioItem" label="有=25"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{ "多于一个疾病判断" + "：" }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                v-model="questionnaire.duobing"
              >
                <el-radio class="radioItem" label="无=0"></el-radio>
                <el-radio class="radioItem" label="有=15"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{ "使用行走辅助用具" + "：" }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                v-model="questionnaire.xingzou"
              >
                <el-radio
                  class="radioItem"
                  label="不需要/卧床休息/护士辅助=0"
                ></el-radio>
                <el-radio
                  class="radioItem"
                  label="拐杖、助步器、手杖=15"
                ></el-radio>
                <el-radio class="radioItem" label="依扶家具行走=30"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{ "静脉输液/使用药物治疗" + "：" }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                v-model="questionnaire.yongyao"
              >
                <el-radio class="radioItem" label="否=0"></el-radio>
                <el-radio class="radioItem" label="是=25"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{ "步态/移动" + "：" }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                v-model="questionnaire.yidong"
              >
                <el-radio
                  class="radioItem"
                  label="正常、卧床不能移动、轮椅代步=0"
                ></el-radio>
                <el-radio
                  class="radioItem"
                  label="虚弱乏力/≥65岁/体位性低血压=10"
                ></el-radio>
                <el-radio class="radioItem" label="失调不平衡=20"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="selectItem">
            <div>
              <span class="subLabel">{{ "精神状态" + "：" }}</span>
            </div>
            <el-form-item>
              <el-radio-group
                :disabled="readonly"
                v-model="questionnaire.jingshen"
              >
                <el-radio class="radioItem" label="了解自己能力=0"></el-radio>
                <el-radio
                  class="radioItem"
                  label="忘记自己受限制/意识障碍/躁动不安/沟通障碍/睡眠障碍=15"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <div>
          <span class="label">二、评估总分</span>
          <p>总得分：{{ totalScore }}</p>
        </div>
        <div>
          <span class="label">三、常规预防措施</span>
          <p v-for="(item, index) in table.prevention.normal" :key="item.id">
            {{ "（" + (index + 1) + "）" + item }}
          </p>
        </div>
        <div>
          <span class="label">四、选择预防措施</span>
          <el-form-item label-width="0px" prop="region">
            <el-checkbox-group
              :disabled="readonly"
              v-model="questionnaire.xuanzeyufang"
            >
              <div
                v-for="item in table.prevention.selectable.options"
                :key="item.od"
              >
                <el-checkbox :label="item"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <div class="btn">
        <el-button v-show="!readonly" @click="save" size="small " type="primary"
          >确认</el-button
        >
        <el-link style="margin-left:20px" @click="cancel">{{
          readonly ? "关闭" : "取消"
        }}</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    preData: {
      type: Object,
      default: () => {
        return {
          totalScore: "",
          youwudiedao: "",
          duobing: "",
          xingzou: "",
          yongyao: "",
          yidong: "",
          jingshen: "",
          xuanzeyufang: []
        };
      }
    },
    lastData: {},
    importFlag: false
  },
  data() {
    return {
      form: {
        feiyan: "",
        huxi: "",
        xitan: "",
        koushui: "",
        yishi: false,
        type: [],
        hezuo: "",
        xiyang: "",
        zuoqi: "",
        jieguo: "",
        jianyi: ""
      },
      table: {
        title: "Morsed跌倒危险因素评估及护理措施表",
        time: "",
        partOne: [
          {
            text: "近3月有无跌倒/视觉障碍",
            options: [
              {
                text: "无",
                socre: 0
              },
              {
                text: "有",
                socre: 15
              }
            ],
            selected: ""
          },
          {
            text: "多于一个疾病诊断",
            options: [
              {
                text: "无",
                socre: 0
              },
              {
                text: "有",
                socre: 15
              }
            ],
            selected: ""
          },
          {
            text: "使用行走辅助用具",
            options: [
              {
                text: "不需要/卧床休息/护士辅助",
                socre: 0
              },
              {
                text: "拐杖、助步器、手杖",
                socre: 15
              },
              {
                text: "依扶家具行走",
                socre: 30
              }
            ],
            selected: ""
          },
          {
            text: "静脉输液/使用药物治疗",
            options: [
              {
                text: "否",
                socre: 0
              },
              {
                text: "是",
                socre: 20
              }
            ],
            selected: ""
          },
          {
            text: "步态/移动",
            options: [
              {
                text: "正常、卧床不能移动、轮椅代步",
                socre: 0
              },
              {
                text: "虚弱乏力/≥65岁/体位性低血压",
                socre: 10
              },
              {
                text: "失调不平衡",
                socre: 20
              }
            ],
            selected: ""
          },
          {
            text: "精神状态",
            options: [
              {
                text: "了解自己能力",
                socre: 0
              },
              {
                text: "忘记自己受限制/意识障碍/躁动不安/沟通障碍/睡眠障碍",
                socre: 15
              }
            ],
            selected: ""
          }
        ],
        totalScore: "",
        prevention: {
          normal: [
            "安全指导:预防跌倒健康教育",
            "润历床旁走道障碍清除",
            "保持病房地面清洁干燥，告知卫生间防滑措施（沐浴时有人陪伴）",
            "将常用物品放置在便于患者拿取处",
            "指导呼叫器的使用"
          ],
          selectable: {
            options: [
              "指导患者渐进活动，必要时使用辅助工具",
              "要求家属需陪伴在旁，离开时需告知值班护士",
              "注意轮椅及便盆座椅的固定",
              "指导床上使用便器",
              "床档保护",
              "使用约束带保护",
              "高风险患者床头卡挂警示标识",
              "其它措施"
            ],
            // 多选
            selected: []
          }
        },
        isFall: "",
        notes: [
          "常规预防措施适合与对所有患者跌倒的预防。",
          "评估总分>45分为高危，护士应在常规预防措施的基础上，选择相应的预防措施。",
          "评估时请在评估日期栏注明具体时间。"
        ]
      },
      questionnaire: {
        totalScore: "",
        youwudiedao: "",
        duobing: "",
        xingzou: "",
        yongyao: "",
        yidong: "",
        jingshen: "",
        xuanzeyufang: []
      }
    };
  },
  watch: {
    importFlag(newValue) {
      if (newValue) {
        this.questionnaire = this.lastData;
        this.$emit("successImport");
      }
    }
  },
  computed: {
    totalScore() {
      let sum = 0;
      sum += this.getScore(this.questionnaire.youwudiedao);
      sum += this.getScore(this.questionnaire.duobing);
      sum += this.getScore(this.questionnaire.xingzou);
      sum += this.getScore(this.questionnaire.yongyao);
      sum += this.getScore(this.questionnaire.yidong);
      sum += this.getScore(this.questionnaire.jingshen);
      this.questionnaire.totalScore = sum;
      return sum;
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getScore(str) {
      if (!str) return 0;
      else {
        let reg = /[0-9]+$/;
        if (reg.exec(str)) {
          return parseInt(reg.exec(str)[0]);
        } else {
          return 0;
        }
      }
    },
    formInput() {
      this.$emit("input", this.questionnaire);
    },
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("commit", { data: this.questionnaire, name: "跌倒风险评定" });
    }
  },
  mounted() {
    if (Object.keys(this.preData).length > 0) this.questionnaire = this.preData;
  }
};
</script>

<style lang="scss" scoped>
.questionnaire {
  width: 80%;
  padding: 10px;
  background-color: #fff;

  .header {
    text-align: center;
    .title {
      font-size: 18px;
      color: #1e7e7c;
      font-weight: bold;
    }
  }
  .label {
    font-size: 16px;
    color: #1e7e7c;
    display: block;
    margin: 10px 0;
  }
  .selectItem {
    width: 90%;
  }
  .selectItem {
    .subLabel {
      font-size: 15px;
      margin-bottom: 5px;
      display: block;
    }
    .radioItem {
      margin: 5px;
    }
  }
  .btn {
    float: right;
    margin: 20px 20px;
  }
}
</style>

<style lang="scss">
.questionnaire {
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-form-item__content {
    line-height: 25px;
  }
  .el-form-item__label {
    line-height: 25px;
  }
}
</style>