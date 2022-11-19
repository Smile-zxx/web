<template>
  <div>
    <div class="filter">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <template slot="label">
            <span class="formLabel">姓名：</span>
          </template>
          <el-input v-model="formInline.API_name" placeholder="请输入姓名" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="formLabel">时间：</span>
          </template>
          <el-select v-model="formInline.API_recentRange" placeholder="请选择" style="width:300px">
            <el-option label="近一个月" value="2592000000"></el-option>
            <el-option label="近三个月" value="7776000000"></el-option>
            <el-option label="近六个月" value="15552000000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reSet" class="btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="eltable">
      <el-table
        :data="showTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        border
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{background:'#EFF3F4',color:'#1c7e7c','text-align':'center',  'font-size': '18px','font-weight': 'bold',}"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.API_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="症状">
          <template slot-scope="scope">
            <span>{{ scope.row.API_symptom||"无" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="就诊时间" width="180">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.API_date).toLocaleDateString() }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="就诊状态" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.API_state }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="patientDetails(scope.$index, scope.row)">查看</el-button>
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
import { getHistoryPatients } from "../../api/patientdiag/patientdiag.js";
export default {
  data() {
    return {
      formInline: {
        API_name: "",
        API_state: "",
        API_recentRange: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    reSet() {
      (this.formInline.API_name = ""), (this.formInline.API_state = "");
      this.formInline.API_recentRange = "";
    },
    patientDetails(index, row) {
      console.log(index, row);
      localStorage.setItem("pid", row.API_pid);
      this.$router.push("/patientdiag/historydetails");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  computed: {
    showTable: function() {
      let time = new Date().getTime();
      let result = [];
      this.tableData.forEach(data => {
        if (
          (!this.formInline.API_name ||
            data.API_name.includes(this.formInline.API_name)) &&
          data.API_state == "已完成" &&
          (!this.formInline.API_recentRange ||
            new Date(data.API_date).getTime() >
              time - this.formInline.API_recentRange)
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
    getHistoryPatients().then(res => {
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
  font-size: 18px;
  font-weight: bold;
  color: #1c7e7c;
  margin-left: 5px;
}
.btn {
  background-color: #1c7e7c;
  margin-left: 30px;
}
</style>
