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
            <span class="formLabel">就诊状态：</span>
          </template>
          <el-select v-model="formInline.API_state" placeholder="请选择就诊状态">
            <el-option label="未完成" value="未完成"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已过期" value="已过期"></el-option>
            <el-option label="申请中" value="申请中"></el-option>
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
        <el-table-column fixed label="序号" width="80" type="index"></el-table-column>
        <el-table-column label="姓名" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.API_name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="症状">
          <template slot-scope="scope">
            <span>{{ scope.row.API_symptom ||"问卷/语音/视频"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="就诊时间" width="100">
          <template slot-scope="scope">
            <span>{{ new Date(scope.row.API_date).toLocaleTimeString('zh-CN',{hour12:false}) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="就诊状态" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.API_state }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.API_state=='申请中'"
              size="mini"
              @click="acceptApply ( scope.row)"
            >接受</el-button>
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
import { getTodayPatients } from "../../api/patientdiag/patientdiag.js";

export default {
  data() {
    return {
      formInline: {
        API_name: "",
        API_state: ""
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
      console.log(index, row);
      localStorage.setItem("pid", row.API_pid);
      this.$router.push("/patientdiag/details");
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    acceptApply(patient) {
      this.$socket.client.emit("seekmedicalreply", {
        doctorID: localStorage.getItem("UserID"),
        pid: patient.API_pid
      });
    }
  },
  computed: {
    showTable: function() {
      let result = [];
      this.$store.state.patientDiag.todayPatientsList.forEach(data => {
        if (
          (!this.formInline.API_name ||
            data.API_name.includes(this.formInline.API_name)) &&
          (!this.formInline.API_state ||
            data.API_state == this.formInline.API_state)
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
    getTodayPatients();
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
