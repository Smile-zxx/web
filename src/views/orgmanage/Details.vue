<template>
  <div>
    <div class="card">
      <div class="pic">
        <el-upload
          class="avatar-uploader"
          action="http://132.232.18.227:8087/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="uploadToken"
        >
          <img
            v-if="this.orgInfo.HospitalOrgDetails.Image"
            :src="this.orgInfo.HospitalOrgDetails.Image"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="info">
        <div class="form">
          <el-form
            :model="orgInfo.HospitalOrgDetails"
            ref="introduction"
            :rules="rules3"
            status-icon
            label-width="100px"
            size="small"
          >
            <el-form-item label="名称：" prop="HospitalName">
              <el-input v-model="orgInfo.HospitalOrgDetails.HospitalName" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="等级：" prop="HospitalLeve">
              <el-input v-model="orgInfo.HospitalOrgDetails.HospitalLeve" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="类型：" prop="HospitalType">
              <el-input v-model="orgInfo.HospitalOrgDetails.HospitalType" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item prop="Address" label="医院地址：">
              <el-input v-model="orgInfo.HospitalOrgDetails.Address"></el-input>
            </el-form-item>
            <el-form-item prop="ContactPhone" label="联系方式：">
              <el-input v-model="orgInfo.HospitalOrgDetails.ContactPhone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="float:right" type="primary" @click="HospitalOrgDetails">保存</el-button>
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
            v-model="orgInfo.HospitalIntroduction"
          ></el-input>
          <el-button
            @click="HospitalOrgDetails"
            type="primary"
            style="float:right;margin-top:30px"
          >保存</el-button>
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
                  <el-input v-model="doc.searchRule.Name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="doc.searchRule.DepartmentIName"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="item in docShowTable.departmentList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item>
                  <el-button type="primary" @click="docReSet" style="margin-left:30px">重置</el-button>
                  <el-button
                    type="success"
                    @click="doc.addDialogVisible = true"
                    style="margin-left:30px"
                  >添加</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div v-if="docShowTable.result.slice(0,this.doc.count).length==0">
                <span>暂无数据</span>
              </div>
              <div
                v-for="(item,index) in docShowTable.result.slice(0,this.doc.count)"
                :key="index"
                class="cardItem"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img v-if="item.Image" :src="item.Image" class="image" />
                  <img v-else src="../../assets/img/default/null.png" class="image" alt />
                  <div style="padding: 14px;">
                    <p>姓名：{{item.Name||"暂无"}}</p>
                    <p>账号：{{item.UserID||"暂无"}}</p>
                    <div class="bottom clearfix">
                      <!-- <span class="time">{{ item.Research||"暂无"}}</span> -->
                      <div>
                        <el-button
                          type="text"
                          @click="delDoctor(item)"
                          class="button"
                          style="color:#F56C6C;margin-left:10px"
                        >删除</el-button>
                        <el-button type="text" @click="modifyDoctor(item)" class="button">修改</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.doc.count<docShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="doc.count += 10;" class="iconfont icon-more icon"></i>
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
                  <el-input v-model="nur.searchRule.Name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="nur.searchRule.DepartmentIName"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="(item,index) in nurShowTable.departmentList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item>
                  <el-button type="primary" @click="nurReSet" style="margin-left:30px">重置</el-button>
                  <el-button
                    type="success"
                    @click="nur.addDialogVisible = true"
                    style="margin-left:30px"
                  >添加</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div v-if="nurShowTable.result.slice(0,this.nur.count).length==0">
                <span>暂无数据</span>
              </div>
              <div
                v-for="(item) in nurShowTable.result.slice(0,this.nur.count)"
                :key="item.id"
                class="cardItem"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img v-if="item.Image" :src="item.Image" class="image" />
                  <img v-else src="../../assets/img/default/null.png" class="image" alt />
                  <div style="padding: 14px;">
                    <p>姓名：{{item.Name||"暂无"}}</p>
                    <p>账号：{{item.UserID||"暂无"}}</p>
                    <div class="bottom clearfix">
                      <!-- <span class="time">{{ item.DepartmentIName||"暂无" }}</span> -->
                      <div>
                        <el-button
                          type="text"
                          @click="delNurse(item)"
                          class="button"
                          style="color:#F56C6C;margin-left:10px"
                        >删除</el-button>
                        <el-button type="text" @click="modifyNurse(item)" class="button">修改</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.nur.count<nurShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="nur.count += 10;" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加医师对话框 -->
    <el-dialog title="添加医师" :visible.sync="doc.addDialogVisible" width="700px">
      <el-form :model="doc.addDialog" :rules="rule1" ref="docAddDialog">
        <el-form-item label="姓名：" label-width="100px" prop="Name">
          <el-input v-model="doc.addDialog.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px" prop="UserID">
          <el-input v-model="doc.addDialog.UserID" placeholder="请输入账号(6-12位数字)"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="doc.addDialog.Password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="科室：" label-width="100px">
          <el-select
            v-model="doc.addDialog.DepartmentIName"
            placeholder="请选择所属科室"
            style="width:100%"
          >
            <el-option label="脑科" value="脑科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="放射科" value="放射科"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDoctor">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除医师对话框 -->
    <el-dialog title="删除医师" :visible.sync="doc.delDialogVisible" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDocDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改医师对话框 -->
    <el-dialog title="修改医师" :visible.sync="doc.modifyDialogVisible" width="500px">
      <el-form :model="doc.modifyDialog" :rules="rules2" ref="docModifyDialog">
        <el-form-item label="姓名：" label-width="100px">
          <span>{{doc.modifyDialog.Name||"暂无"}}</span>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <span>{{doc.modifyDialog.UserID}}</span>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="doc.modifyDialog.Password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="科室：" label-width="100px">
          <el-select
            v-model="doc.modifyDialog.DepartmentIName"
            placeholder="请选择所属科室"
            style="width:100%"
          >
            <el-option label="脑科" value="脑科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="放射科" value="放射科"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDocmodify">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加护士对话框 -->
    <el-dialog title="添加护士" :visible.sync="nur.addDialogVisible" width="700px">
      <el-form :model="nur.addDialog" :rules="rule1" ref="nurAddDialog">
        <el-form-item label="姓名：" label-width="100px" prop="Name">
          <el-input v-model="nur.addDialog.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px" prop="UserID">
          <el-input v-model="nur.addDialog.UserID" placeholder="请输入账号(6-12位数字)"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="nur.addDialog.Password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="科室：" label-width="100px">
          <el-select
            v-model="nur.addDialog.DepartmentIName"
            placeholder="请选择所属科室"
            style="width:100%"
          >
            <el-option label="脑科" value="脑科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="放射科" value="放射科"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addNurse">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除护士对话框 -->
    <el-dialog title="删除护士" :visible.sync="nur.delDialogVisible" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmNusDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改护士对话框 -->
    <el-dialog title="修改护士" :visible.sync="nur.modifyDialogVisible" width="500px">
      <el-form :model="nur.modifyDialog" :rules="rules2" ref="nurModifyDialog">
        <el-form-item label="姓名：" label-width="100px">
          <span>{{nur.modifyDialog.Name||'暂无'}}</span>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <span>{{nur.modifyDialog.UserID}}</span>
        </el-form-item>
        <!-- <el-form-item label="姓名：" label-width="100px">
          <el-input v-model="nur.modifyDialog.Name"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px">
          <el-input v-model="nur.modifyDialog.UserID"></el-input>
        </el-form-item>-->
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="nur.modifyDialog.Password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="科室：" label-width="100px">
          <el-select
            v-model="nur.modifyDialog.DepartmentIName"
            placeholder="请选择所属科室"
            style="width:100%"
          >
            <el-option label="脑科" value="脑科"></el-option>
            <el-option label="神经内科" value="神经内科"></el-option>
            <el-option label="放射科" value="放射科"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmNurmodify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import Details from "./js/Details.js";
export default Details;
</script >

<style scoped lang="scss">
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
      cursor: pointer;
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
.avatar-uploader {
  width: 100%;
  height: 100%;
}
.avatar-uploader .el-upload {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
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