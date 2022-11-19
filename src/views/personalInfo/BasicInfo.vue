<template>
  <div class="content">
    <el-collapse v-model="activeNames">
      <el-form size="small " :inline="true" :model="formData" ref="formData">
        <el-collapse-item name="基本信息">
          <template slot="title">
            <h3 class="title">基本信息</h3>
          </template>
          <div class="card">
            <el-row>
              <el-col :span="4" :offset="1">
                <el-upload
                  class="avatar-uploader"
                  action="http://132.232.18.227:8087/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="uploadToken"
                >
                  <img
                    v-if="this.formData.basicInfo.Portrait"
                    :src="this.formData.basicInfo.Portrait"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span="18" :offset="1">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="姓名：" prop="name">
                      <el-input
                        v-model="formData.basicInfo.Name"
                        placeholder="请输入姓名"
                        style="width:70%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="性别：" prop="gender">
                      <el-input
                        v-model="formData.basicInfo.Gender"
                        placeholder="请输入性别"
                        style="width:70%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="出生日期：" prop="date">
                      <!-- <el-input v-model="formData.basicInfo.Birthday" placeholder="请输入出生日期" style="width:70%"></el-input> -->
                      <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="formData.basicInfo.Birthday"
                        type="date"
                        placeholder="选择日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="10">
                    <el-form-item label="邮箱：" prop="post">
                      <el-input
                        v-model="formData.basicInfo.Post"
                        placeholder="请输入邮箱"
                        style="width:100%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="电话：" prop="tel">
                      <el-input
                        v-model="formData.basicInfo.Tel"
                        placeholder="请输入电话"
                        style="width:100%;"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item label="工作单位：" prop="job">
                      <el-input
                        v-model="formData.basicInfo.Job"
                        placeholder="请输入工作单位"
                        style="width:200%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="家庭住址：" prop="address">
                      <el-input
                        v-model="formData.basicInfo.Address"
                        placeholder="请输入家庭住址"
                        style="width:200%"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item
          v-for="(item) in formData.exp"
          :key="item.id"
          :name="item.title"
          style="margin-bottom:20px"
        >
          <template slot="title">
            <h3 class="title">{{item.title}}</h3>
          </template>
          <el-row>
            <el-col>
              <el-input type="textarea" v-model="item.text" class="text"></el-input>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-button type="primary" class="btn" @click="save">保存</el-button>
      </el-form>
    </el-collapse>
  </div>
</template>

<script type="text/javascript">
import BasicInfo from "./js/BasicInfo.js";
export default BasicInfo;
</script >

<style scoped lang="scss">
.content {
  margin: 20px 5%;
  .title {
    font-size: 20px;
    color: #1c7e7c;
  }
  .text {
    width: 90%;
    float: right;
  }
}
.btn {
  float: right;
  width: 100px;
  // background-color: #1c7e7c;
  margin-bottom: 50px;
  margin-left: 50px;
}
.card {
  img {
    height: 200px;
  }
}
</style>

<style lang="scss">
.el-collapse-item__wrap {
  border-bottom: 0px;
}
.el-collapse {
  border-bottom: 0px;
}
.avatar-uploader .el-upload {
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 1%;
  display: block;
}
</style>