<template>
  <div>
    <div class="card">
      <div class="pic">
        <img v-if="orgInfo.basicInfo.pic" :src="orgInfo.basicInfo.pic" alt />
        <img v-else src="../../assets/img/default/null.png" alt />
      </div>
      <div class="info">
        <div class="form">
          <el-form status-icon label-width="100px" size="small">
            <el-form-item label="名称：">
              <span style="width:50%">{{orgInfo.basicInfo.name}}</span>
            </el-form-item>
            <el-form-item label="等级：">
              <span style="width:50%">{{orgInfo.basicInfo.class}}</span>
            </el-form-item>
            <el-form-item label="类型：">
              <span style="width:50%">{{orgInfo.basicInfo.type}}</span>
            </el-form-item>
            <el-form-item label="医院地址：">
              <span>{{orgInfo.basicInfo.address}}</span>
            </el-form-item>
            <el-form-item label="联系方式：">
              <span>{{orgInfo.basicInfo.tel}}</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName">
        <!-- 医疗机构简介 -->
        <el-tab-pane label="简介" name="first">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="请输入医院简介"
            v-model="orgInfo.introduction"
            readonly
          ></el-input>
        </el-tab-pane>

        <!-- 医疗医师管理 -->
        <el-tab-pane label="医师" name="second">
          <div>
            <div class="filter">
              <el-form :inline="true" :model="doc.searchRule" class="demo-form-inline">
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">姓名：</span>
                  </template>
                  <el-input v-model="doc.searchRule.name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="doc.searchRule.department"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="item in docShowTable.departmentList"
                      :key="item.id"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="docReSet" style="margin-left:30px">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div
                v-for="(item) in docShowTable.result.slice(0,this.doc.count)"
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
                        <el-button type="text" @click="getDocDetail(item)" class="button">查看</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.doc.count<docShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="addDocShowCount" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </el-tab-pane>

        <!-- 医疗护士管理 -->
        <el-tab-pane label="护士" name="third">
          <div>
            <div class="filter">
              <el-form :inline="true" :model="nur.searchRule" class="demo-form-inline">
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">姓名：</span>
                  </template>
                  <el-input v-model="nur.searchRule.name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="nur.searchRule.department"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="item in nurShowTable.departmentList"
                      :key="item.id"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="nurReSet" style="margin-left:30px">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div
                v-for="(item) in nurShowTable.result.slice(0,this.nur.count)"
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
                        <el-button type="text" @click="getNurDetail(item)" class="button">查看</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.nur.count<nurShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="addNurShowCount" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 医师详情对话框 -->
    <el-dialog title="医师详情" :visible.sync="doc.detailDialogVisible" width="700px">
      <div class="dialog">
        <div class="basicInfo">
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p>
                <span class="lable">姓名：</span>
                {{doctorDetail.name}}
              </p>
              <p>
                <span class="lable">科室：</span>
                {{doctorDetail.department}}
              </p>
              <p>
                <span class="lable">擅长：</span>
                {{doctorDetail.specialty}}
              </p>
              <p></p>
            </span>
          </div>
        </div>
        <div class="introduction">
          <span>
            <p>
              <span class="lable">个人简介：</span>
              {{doctorDetail.introduction}}
            </p>
          </span>
        </div>
      </div>
    </el-dialog>

    <!-- 护士详情对话框 -->
    <el-dialog title="护士详情" :visible.sync="nur.detailDialogVisible" width="700px">
      <div class="dialog">
        <div class="basicInfo">
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p>
                <span class="lable">姓名：</span>
                {{nurseDetail.name}}
              </p>
              <p>
                <span class="lable">科室：</span>
                {{nurseDetail.department}}
              </p>
              <p>
                <span class="lable">擅长：</span>
                {{nurseDetail.specialty}}
              </p>
            </span>
          </div>
        </div>
        <div class="introduction">
          <span>
            <p>
              <span class="lable">个人简介：</span>
              {{nurseDetail.introduction}}
            </p>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import {
  getOrgDetail,
  getDoctorDetail,
  getNurseDetail
} from "../../api/medicalInfo/medicalInfo.js";
export default {
  name: "Deatails",
  data() {
    return {
      doc: {
        count: 10,
        searchRule: {
          name: "",
          department: ""
        },
        detailDialogVisible: false,
        detailDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        targetRow: {}
      },
      nur: {
        searchRule: {
          name: "",
          department: ""
        },
        detailDialogVisible: false,
        detailDialog: {
          name: "",
          account: "",
          password: "",
          department: ""
        },
        targetRow: {},
        count: 10
      },
      doctorDetail: {
        name: "",
        department: "",
        specialty: "",
        introduction: ""
      },
      nurseDetail: {
        name: "",
        department: "",
        specialty: "",
        introduction: ""
      },
      activeName: "third",
      orgInfo: {
        basicInfo: {
          name: "",
          class: "",
          type: "",
          address: "",
          tel: "",
          pic:"",
        },
        introduction: ``,
        doctors: [],
        nurses: []
      }
    };
  },
  computed: {
    docShowTable: function() {
      let result = [];
      let departmentList = [];
      this.orgInfo.doctors.forEach(data => {
        if (departmentList.indexOf(data.department) == -1) {
          departmentList.push(data.department);
        }
        if (
          (!this.doc.searchRule.name ||
            data.name == this.doc.searchRule.name) &&
          (!this.doc.searchRule.department ||
            data.department == this.doc.searchRule.department)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    },
    nurShowTable: function() {
      let result = [];
      let departmentList = [];
      this.orgInfo.nurses.forEach(data => {
        if (departmentList.indexOf(data.department) == -1) {
          departmentList.push(data.department);
        }
        if (
          (!this.nur.searchRule.name ||
            data.name == this.nur.searchRule.name) &&
          (!this.nur.searchRule.department ||
            data.department == this.nur.searchRule.department)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    }
  },
  methods: {
    docReSet() {
      (this.doc.searchRule.name = ""), (this.doc.searchRule.department = "");
    },
    addDocShowCount() {
      this.doc.count += 10;
    },
    docCurrentChange(val) {
      this.doc.currentPage = val;
    },
    getDocDetail(data) {
      getDoctorDetail(data.docId).then(res => {
        this.doctorDetail = res;
        this.doc.detailDialogVisible = true;
      });
    },
    nurReSet() {
      (this.nur.searchRule.name = ""), (this.nur.searchRule.department = "");
      this.nur.count = 10;
    },
    addNurShowCount() {
      this.nur.count += 10;
    },
    getNurDetail(data) {
      getDoctorDetail(data.nurId).then(res => {
        this.nurseDetail = res;
        this.nur.detailDialogVisible = true;
      });
    }
  },
  mounted() {
    let orgId = localStorage.getItem("orgId");
    getOrgDetail(orgId).then(res => {
      this.orgInfo = res;
    });
    this.orgInfo = this.$store.state.medicalInfo.organization.detail;
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