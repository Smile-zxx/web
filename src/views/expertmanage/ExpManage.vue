<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <template slot="label">
            <span class="searchLabel">团队名称：</span>
          </template>
          <el-input v-model="search.ExpertName" placeholder="请输入团队名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
          <!-- <el-button type="success" @click="addExpertGroupDialogVisible=true">添加</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <el-divider type="primary" class="searchLine"></el-divider>
    <div class="content">
      <el-row v-for="item in showTable" :key="item.key">
        <el-col :span="22" :offset="1">
          <div class="card leftLine">
            <el-col :span="5">
              <div class="pic">
                <img v-if="item.ExpertImage" :src="item.ExpertImage" alt />
                <img v-else src="../../assets/img/default/null.png" alt />
              </div>
            </el-col>
            <el-col :span="18">
              <div class="info">
                <span @click="details(item)">
                  <p class="name">{{item.ExpertName}}</p>
                  <p>擅长：{{item.ExpertSpecialty}}</p>
                  <p>简介：{{item.ExpertIntroduction}}</p>
                </span>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-divider type="primary" class="underline"></el-divider>
      </el-row>
    </div>
    <div class="footer">
      <el-pagination
        :hide-on-single-page="false"
        :total="showTable.length"
        layout="prev, pager, next"
      ></el-pagination>
      <div class="clear"></div>
    </div>
    <!-- 添加专家团队对话框 -->
    <el-dialog title="添加专家团队" :visible.sync="addExpertGroupDialogVisible" width="30%">
      <el-form label-position="left">
        <el-form-item label="专家团队名称：">
          <el-input v-model="ExpertGroupDialog.ExpertName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addExpertGroupDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addExpGroup">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ExpManage from "./js/ExpManage.js";
export default ExpManage;
</script>
<style scoped lang="scss">
.content {
  width: 95%;
  max-height: 700px;
  overflow: auto;
  margin: auto;
}
.search {
  margin: 30px 0 0 5%;
  .searchLabel {
    font-size: 20px;
    font-weight: bold;
    color: #1c7e7c;
    margin-top: 20px;
  }
}
.card {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  .pic {
    width: 100%;
    height: 250px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 250px;
    }
  }
  .info {
    margin-left: 30px;
    span {
      .name {
        font-size: 20px;
        font-weight: bold;
        color: #1c7e7c;
      }
      p {
        margin-top: 15px;
        font-size: 18px;
      }
    }
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.leftLine {
  border-left: 10px solid #eff3f4;
  border-top: 10px solid white;
  border-bottom: 10px solid white;
}
.underline {
  width: 90%;
  margin: 20px auto;
  clear: both;
}
.searchLine {
  width: 95%;
  margin: 5px auto 20px;
}
.footer {
  float: right;
  margin-right: 5%;
  .clear {
    height: 30px;
    clear: both;
  }
}
</style>

