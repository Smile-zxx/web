<template>
  <div>
    <div class="filter">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item >
          <template slot="label">
            <span class="formLabel">姓名：</span>
          </template>
          <el-input v-model="formInline.name" placeholder="请输入姓名" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item >
          <template slot="label">
            <span class="formLabel">性别：</span>
          </template>
          <el-select v-model="formInline.gender" placeholder="请选择" style="width:100px">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <template slot="label">
            <span class="formLabel">活动时间：</span>
          </template>
          <el-date-picker
            v-model="formInline.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
        :fit="true"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{background:'#EFF3F4',color:'#1c7e7c','text-align':'center',  'font-size': '18px','font-weight': 'bold',}"
      >
        <el-table-column label="序号" width="80" type="index"></el-table-column>
        <el-table-column  v-for="item in this.tableTitle" :key="item.id" :label="item.title" >
          <template slot-scope="scope">
            <span >{{ scope.row[item.attribute] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
export default {
  data() {
    return {
      formInline: {
        name: "",
        gender: "",
        dateRange: ""
      },
      tableTitle:[
            {title:"姓名",attribute:"name"},
            {title:"性别",attribute:"gender"},
            {title:"年龄",attribute:"age"},
            {title:"症状",attribute:"symptom"},
            {title:"就诊时间",attribute:"date"},
        ],
      tableData: [
        {
        
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕感冒发烧流鼻涕感冒发烧流鼻涕感冒发烧流鼻涕感冒发烧流鼻涕"
        },
        {
          date: "2020-06-22",
          name: "张小虎",
          age: "14",
          gender: "女",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "刘小虎",
          age: "25",
          gender: "女",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "26",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          age: "14",
          gender: "男",
          symptom: "感冒发烧流鼻涕"
        }
      ],
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    reSet() {
      this.formInline.name='',
      this.formInline.gender='',
      this.formInline.dateRange=''
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
      let result = [];
      let time = 0;

      this.tableData.forEach(data => { 
        time = Date.parse(data.date);
        if (
          (!this.formInline.name || data.name == this.formInline.name) &&
          (!this.formInline.gender || data.gender == this.formInline.gender)){
            if(!this.formInline.dateRange ||(time>this.formInline.dateRange[0].getTime()&&time<this.formInline.dateRange[1].getTime())){
          result.push(data);
            }
        }
      });
      return result;
    }
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
  margin-left:5px ;
}
.btn {
  background-color: #1c7e7c;
  margin-left:30px
}
</style>
