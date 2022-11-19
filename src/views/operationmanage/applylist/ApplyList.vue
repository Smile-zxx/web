<template>
  <div>
    <div class="filter">
      <div style="margin-bottom: 15px">
        <span
          style="font-size: 18px;font-weight: bold;color: #1c7e7c;margin-left: 5px"
          >患者查询</span
        >
      </div>
      <div>
        <div>
          <el-row :gutter="20">
            <el-col :span="3">
              <el-select
                @change="searchRuleChange"
                class="searchRule"
                size="small"
                v-model="searchRule.rule"
                placeholder="选择查询条件"
              >
                <el-option label="姓名" value="API_name"></el-option>
                <el-option label="住院号" value="API_number"></el-option>
                <el-option label="主诊专家" value="API_expert"></el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <el-input
                size="small"
                v-model="formInline[searchRule.rule]"
              ></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="eltable">
      <el-table
        :data="
          showTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        border
        :cell-style="{ 'text-align': 'center' }"
        :header-cell-style="{
          background: '#EFF3F4',
          color: '#1c7e7c',
          'text-align': 'center',
          'font-size': '16px'
        }"
      >
        <el-table-column label="住院号" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.API_toHospitalID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.API_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="诊断专家">
          <template slot-scope="scope">
            <span>{{ scope.row.API_expert }}</span>
          </template>
        </el-table-column>

        <el-table-column label="申请时间">
          <template slot-scope="scope">
            <span>{{ scope.row.API_date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="patientDetails(scope.$index, scope.row)"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="showTable.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPatientsList,
  getApplyList
} from "@api/operationmanage/operationmanage.js";
export default {
  data() {
    return {
      searchRule: {
        rule: "API_name",
        value: ""
      },
      formInline: {
        API_name: "",
        API_number: "",
        API_expert: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    reSet() {
      (this.formInline.API_name = ""), (this.formInline.API_state = "");
    },
    patientDetails(index, row) {
      localStorage.setItem("pid", row.API_pid);
      this.$router.push("/operationmanage/applydetails");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    searchRuleChange() {
      this.searchRule.value = "";
      this.formInline = {
        API_name: "",
        API_number: "",
        API_expert: ""
      };
    }
  },
  computed: {
    showTable: function() {
      let result = [];
      this.tableData.forEach(data => {
        if (
          (!this.formInline.API_name ||
            data.API_name.includes(this.formInline.API_name)) &&
          (!this.formInline.API_number ||
            data.API_toHospitalID.includes(this.formInline.API_number)) &&
          (!this.formInline.API_expert ||
            data.API_expert.includes(this.formInline.API_expert))
        ) {
          result.push(data);
        }
      });
      result = result.sort((a, b) => {
        //按照时间排序
        var time1 = Date.parse(a.API_date);
        var time2 = Date.parse(b.API_date);
        return time2 - time1;
      });
      return result;
    }
  },
  mounted() {
    getApplyList().then(res => {
      this.tableData = res;
    });
  }
};
</script>

<style scoped lang="scss">
.eltable {
  width: 90%;
  margin: 10px 5%;
}

.filter {
  margin: 20px 0px 0px 5%;
}
.page {
  float: right;
  margin: 10px 5% 10px 0px;
}
.formLabel {
  font-size: 16px;
  // font-weight: bold;
  color: #1c7e7c;
  margin-left: 5px;
}
.btn {
  background-color: #1c7e7c;
  margin-left: 30px;
}
</style>

<style lang="scss">
.searchRule {
  .el-input__inner {
    border: 0px;
    color: #1c7e7c;
    font-size: 16px;
  }
  :hover {
    background-color: #eff3f4;
  }
}
</style>
