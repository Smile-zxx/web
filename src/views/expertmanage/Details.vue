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
            v-if="this.expertGroupInfo.expertdetails.ExpertImage"
            :src="this.expertGroupInfo.expertdetails.ExpertImage"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="info">
        <div class="form">
          <el-form
            ref="introduction"
            :model="expertGroupInfo.expertdetails"
            :rules="rules3"
            status-icon
            label-width="100px"
            size="small"
          >
            <el-form-item label="名称：" prop="ExpertName">
              <el-input v-model="expertGroupInfo.expertdetails.ExpertName" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：" prop="ExpertTel">
              <el-input v-model="expertGroupInfo.expertdetails.ExpertTel" style="width:50%"></el-input>
            </el-form-item>
            <el-form-item label="团队特长：" prop="ExpertSpecialty">
              <el-input v-model="expertGroupInfo.expertdetails.ExpertSpecialty"></el-input>
            </el-form-item>
            <el-form-item label="团队简介：" prop="ExpertIntroduction">
              <el-input
                type="textarea"
                v-model="expertGroupInfo.expertdetails.ExpertIntroduction"
                :autosize="{minRows:4,maxRows: 6}"
                style="max-height:200px"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="basicInfo" style="float:right" type="primary">保存</el-button>
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
                  <el-input v-model="exp.searchRule.Name" placeholder="请输入姓名" style="width:150px"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                  <template slot="label">
                    <span class="formLabel">科室：</span>
                  </template>
                  <el-select
                    v-model="exp.searchRule.department"
                    placeholder="请选择"
                    style="width:200px"
                  >
                    <el-option
                      v-for="(item,index) in expShowTable.departmentList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item>
                  <el-button type="primary" @click="expReSet" style="margin-left:30px">重置</el-button>
                  <el-button
                    type="success"
                    @click="exp.addDialogVisible=true"
                    style="margin-left:30px"
                  >添加</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="cardContainer" style="overflow:auto">
              <div
                v-for="(item,index) in expShowTable.result.slice(0,this.exp.count)"
                :key="index"
                class="cardItem"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <img v-if="item.Image" :src="item.Image" class="image" />
                  <img v-else src="../../assets/img/default/null.png" class="image" alt />
                  <div style="padding: 14px;">
                    <p>姓名：{{item.Name||'暂无'}}</p>
                    <p>账号：{{item.UserID}}</p>
                    <div class="bottom clearfix">
                      <!-- <span class="time">{{ item.department }}</span> -->
                      <div>
                        <el-button
                          type="text"
                          @click="delExpert(item)"
                          class="button"
                          style="color:#F56C6C;margin-left:10px"
                        >删除</el-button>
                        <el-button type="text" @click="modifyExpert(item)" class="button">修改</el-button>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <div v-if="this.exp.count<expShowTable.result.length" class="cardItem">
                <div class="more">
                  <i @click="exp.count+=10" class="iconfont icon-more icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="footer"></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加专家对话框 -->
    <el-dialog title="添加专家" :visible.sync="exp.addDialogVisible" width="700px">
      <el-form :model="exp.addDialog" :rules="rules" ref="addDialog">
        <el-form-item label="姓名：" label-width="100px" prop="Name">
          <el-input v-model="exp.addDialog.Name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px" prop="UserID">
          <el-input v-model="exp.addDialog.UserID" placeholder="请输入账号(6-12位数字)"></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="exp.addDialog.Password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="exp.addDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="addExpert">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除专家对话框 -->
    <el-dialog title="删除专家用户" :visible.sync="exp.delDialogVisible" width="30%">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exp.delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmExpDel">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改专家对话框 -->
    <el-dialog title="修改密码" :visible.sync="exp.modifyDialogVisible" width="700px">
      <el-form :model="exp.modifyDialog" :rules="rules2" ref="modifyDialog">
        <el-form-item label="姓名：" label-width="100px" prop="Name">
          <span>{{exp.modifyDialog.Name||"暂无"}}</span>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px" prop="UserID">
          <span>{{exp.modifyDialog.UserID}}</span>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="exp.modifyDialog.Password" placeholder="请输入密码"></el-input>
          <!-- <el-input v-model="exp.modifyDialog.Password"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="密码：" label-width="100px" prop="Password">
          <el-input v-model="exp.modifyDialog.Password"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="科室：" label-width="100px">
          <el-select v-model="exp.modifyDialog.department" placeholder="请选择所属科室" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="exp.modifyDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="confirmExpmodify">确 定</el-button>
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