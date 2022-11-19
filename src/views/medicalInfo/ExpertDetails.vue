<template>
  <div>
    <div class="card">
      <div class="pic">
        <img :src="expertGroupInfo.basicInfo.pic" alt />
      </div>
      <div class="info">
        <div class="form">
          <el-form status-icon label-width="100px" size="small">
            <el-form-item label="名称：">
              <span style="width:50%">{{expertGroupInfo.basicInfo.name}}</span>
            </el-form-item>
            <el-form-item label="联系方式：">
              <span style="width:50%">{{expertGroupInfo.basicInfo.tel}}</span>
            </el-form-item>
            <el-form-item label="团队特长：">
              <span>{{expertGroupInfo.basicInfo.specialty}}</span>
            </el-form-item>
            <el-form-item label="团队简介：">
              <span>{{expertGroupInfo.basicInfo.introduction}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <!-- 团队成员管理 -->
        <el-tab-pane label="成员" name="first">
          <div>
            <div class="filter">
              <el-form :inline="true" :model="exp.searchRule" class="demo-form-inline">
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">姓名：</span>
                  </template>
                  <el-input v-model="exp.searchRule.name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="exp.searchRule.department"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="item in expShowTable.departmentList"
                      :key="item.id"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="expReSet" style="margin-left:30px">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div
                v-for="(item) in expShowTable.result.slice(0,this.exp.count)"
                :key="item.id"
                class="cardItem"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.portrait" class="image" />
                  <div style="padding: 14px;">
                    <p>姓名：{{item.name}}</p>
                    <div class="bottom clearfix">
                      <span class="time">{{ item.department }}</span>
                      <div>
                        <el-button type="text" @click="getDxpertDetail(item)" class="button">查看</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.exp.count<expShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="addExpShowCount" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 查看专家对话框 -->
    <el-dialog title="专家详情" :visible.sync="exp.expertDialogVisible" width="700px">
      <div class="dialog">
        <div class="basicInfo">
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p>
                <span class="lable">姓名：</span>
                {{expertDetail.name}}
              </p>
              <p>
                <span class="lable">科室：</span>
                {{expertDetail.department}}
              </p>
              <p>
                <span class="lable">擅长：</span>
                {{expertDetail.specialty}}
              </p>
            </span>
          </div>
        </div>
        <div class="introduction">
          <span>
            <p>
              <span class="lable">个人简介：</span>
              {{expertDetail.introduction}}
            </p>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { getExpertGroupDetail } from "../../api/medicalInfo/medicalInfo.js";
export default {
  name: "Deatails",
  data() {
    return {
      exp: {
        count: 10,
        searchRule: {
          name: "",
          department: ""
        },
        expertDialogVisible: false,
        targetRow: {}
      },
      activeName: "first",
      expertGroupInfo: {
        basicInfo: {
          pic: "",
          name: "",
          specialty: "",
          introduction:"",
          expertGroupId: "",
          tel: ""
        },
        introduction: ``,
        experts: []
      },
      expertDetail: {
        name: "银黄胶囊",
        department: "医疗器械/医用敷料及卫生材料",
        specialty:
          "鄂食药监械(准)字2013第2641767号 (湖北华中医用材料有限公司生产)",
        introduction:
          "产品与伤口渗液相接触时，其中具有生物活性的生活活性玻璃(BG) 即可与组织发生一系列反应， 形成一个羟基磷灰 HAP网络又作为新生组织的支架，使新生组织得以顺利爬移。而透明质酸钠(HA) 具有促进创面愈合组织中表皮生长因子含量增加， 调控胶原合成、调节纤维活性和抗炎等作用; HA还能抑制胶原纤维组织挛缩，直至组织得到再生性修复。石"
      }
    };
  },
  computed: {
    expShowTable: function() {
      let result = [];
      let departmentList = [];
      this.expertGroupInfo.experts.forEach(data => {
        if (departmentList.indexOf(data.department) == -1) {
          departmentList.push(data.department);
        }
        if (
          (!this.exp.searchRule.name ||
            data.name == this.exp.searchRule.name) &&
          (!this.exp.searchRule.department ||
            data.department == this.exp.searchRule.department)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    }
  },
  methods: {
    expReSet() {
      this.exp.searchRule.name = "";
      this.exp.searchRule.department = "";
    },
    getDxpertDetail(data) {
      console.log(data);
      this.exp.modifyDialogVisible = true;
      this.exp.modifyDialog = data;
    },
    addExpShowCount() {
      this.exp.count += 10;
    }
  },
  mounted() {
    getExpertGroupDetail().then(res=>{
      this.expertGroupInfo=res
      console.log(res)
    });
  }
};
</script >

<style scoped lang="scss">
.dialog {
  width: 100%;
  .basicInfo {
    height: 200px;
    padding-left: 50px;
    display: flex;
    .pic {
      width: 200px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding-left: 20px;
      width: 100%;
      p {
        font-size: 18px;
        margin-bottom: 10px;
        .lable {
          font-weight: bolder;
          color: #1c7e7c;
        }
      }
    }
  }
  .introduction {
    padding-left: 20px;
    padding-top: 20px;
    width: 100%;
    p {
      font-size: 18px;
      margin-bottom: 10px;
      .lable {
        font-weight: bolder;
        color: #1c7e7c;
      }
    }
  }
}
.card {
  width: 95%;
  height: 300px;
  margin: 20px auto 10px;
  display: flex;
  .pic {
    width: 250px;
    height: 100%;
    margin-left: 30px;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: 80%;
    height: 280px;
    margin-right: 30px;
    margin-top: 20px;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #1c7e7c;
    margin-bottom: 15px;
  }
}
.tab {
  width: 90%;
  margin: auto;
  .cardContainer {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .cardItem {
      width: 18%;
      min-width: 150px;
      margin: 20px 1% 20px;
      img {
        width: 80%;
        height: 150px;
      }
      p {
        font-size: 15px;
        color: #606266;
        margin-bottom: 10px;
      }
      .more {
        text-align: center;
        .icon {
          font-size: 80px;
          color: #c0c4cc;
          line-height: 300px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 70%;
  display: block;
  margin: 20px auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>