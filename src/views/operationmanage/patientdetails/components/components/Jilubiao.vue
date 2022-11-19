<template>
  <div class="newNursingLog clearfix">
    <!-- 
   每日护理记录
    -->
    <div class="header">
      <span class="title">新增护理记录</span>
    </div>
    <el-form size="mini" ref="form" label-position="right" :model="form" label-width="85px">
      <div @input="formInput">
        <div>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">意识：</span>
            </template>
            <el-radio-group :disabled="readonly" disable v-model="form.yishi">
              <el-radio class="radioItem" label="清醒"></el-radio>
              <el-radio class="radioItem" label="嗜睡"></el-radio>
              <el-radio class="radioItem" label="昏睡"></el-radio>
              <el-radio class="radioItem" label="昏迷"></el-radio>
              <el-radio class="radioItem" label="意识模糊"></el-radio>
              <el-radio class="radioItem" label="谵妄"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">生命体征：</span>
            </template>
          </el-form-item>
          <div>
            <el-row>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">T(℃)</span>
                  </template>
                  <el-input v-model="form.tizheng.T"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">P(次/分))</span>
                  </template>
                  <el-input v-model="form.tizheng.P"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">HR(次/分)</span>
                  </template>
                  <el-input v-model="form.tizheng.HR"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">R(次/分)</span>
                  </template>
                  <el-input v-model="form.tizheng.R"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">BP(mmHg)</span>
                  </template>
                  <el-input v-model="form.tizheng.BP"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">SPO2(%)</span>
                  </template>
                  <el-input v-model="form.SPO2"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">入量：</span>
            </template>
          </el-form-item>
          <div>
            <el-row>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">名称</span>
                  </template>
                  <el-input v-model="form.ruliang.mingcheng"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">分类</span>
                  </template>
                  <el-input v-model="form.ruliang.fenglei"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">途径</span>
                  </template>
                  <el-input v-model="form.ruliang.tujing"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">量(ml)</span>
                  </template>
                  <el-input v-model="form.ruliang.liang"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">出量：</span>
            </template>
          </el-form-item>
          <div>
            <el-row>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">名称</span>
                  </template>
                  <el-input v-model="form.chuliang.mingcheng"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <template slot="label">
                    <span class="subLabel">量(ml)</span>
                  </template>
                  <el-input v-model="form.chuliang.liang"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">肌力：</span>
            </template>
            <el-radio-group v-model="form.jili" :disabled="readonly" disable>
              <el-radio class="radioItem" label="正常"></el-radio>
              <el-radio class="radioItem" label="下降"></el-radio>
              <el-radio class="radioItem" label="查体不配合"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">翻身卧位：</span>
            </template>
            <el-radio-group :disabled="readonly" disable v-model="form.fanshenwowei">
              <el-radio disable class="radioItem" label="需要辅助"></el-radio>
              <el-radio class="radioItem" label="自主"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">是否约束：</span>
            </template>
            <el-radio-group :disabled="readonly" v-model="form.shifouyueshu">
              <el-radio disable class="radioItem" label="是"></el-radio>
              <el-radio class="radioItem" label="否"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label-position="left">
            <template slot="label">
              <span class="label">护理意见：</span>
            </template>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.yijian"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-button @click="save" size="medium" type="primary" class="btn">确认</el-button>
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
        date: new Date(),
        yishi: "",
        tizheng: {
          T: "",
          P: "",
          HR: "",
          R: "",
          BP: ""
        },
        SPO2: "",
        ruliang: {
          mingcheng: "",
          fenglei: "",
          tujing: "",
          liang: ""
        },
        chuliang: {
          mingcheng: "",
          liang: ""
        },
        jili: "",
        fanshenwowei: "",
        shifouyueshu: "",
        yijian: ""
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
    save() {
      this.$emit("commit", this.form);
    }
  },
  mounted() {
    this.questionnaire = this.preData;
  }
};
</script>

<style lang="scss" scoped>
.newNursingLog {
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.3);
  .header {
    text-align: center;
    .title {
      font-size: 18px;
      color: #1e7e7c;
      font-weight: bold;
    }
  }

  .label {
    font-weight: bold;
    color: #1e7e7c;
  }
  .subLabel {
    color: #1e7e7c;
  }
  .selectItem {
    width: 90%;
  }
  .selectItem {
    .subLabel {
      font-size: 15px;
      margin-bottom: 5px;
    }
    .radioItem {
      margin: 5px;
    }
  }
  .btn {
    margin-top: 20px;
    float: right;
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
</style>

<style lang="scss">
.newNursingLog {
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