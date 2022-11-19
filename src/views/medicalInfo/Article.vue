<template>
  <div>
    <div class="search">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <template slot="label">
            <span class="searchLabel">用品名称：</span>
          </template>
          <el-input v-model="search.name" placeholder="请输入用品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="searchLabel">用品等级：</span>
          </template>
          <el-select v-model="search.type" placeholder="请选择用品等级">
            <el-option :label="item" :value="item" v-for="item in showList.typeList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div v-for="item in showList.list" :key="item.key">
        <el-divider type="primary" class="underline"></el-divider>
        <div class="card leftLine">
          <div class="pic">
            <img :src="item.pic" alt />
          </div>
          <div class="info">
            <span @click="details(item.orgId)">
              <p class="name">{{item.name}}</p>
              <p>类型：{{item.type}}</p>
              <p>简介：{{item.introduction}}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <el-pagination
        :hide-on-single-page="false"
        :total="showList.list.length"
        layout="prev, pager, next"
      ></el-pagination>
      <div class="clear"></div>
    </div>

    <!-- 医疗用品详情对话框 -->
    <el-dialog title="药品详情" :visible.sync="dialogVisible" width="700px">
      <div class="dialog">
        <div class="basicInfo">
          <div class="pic">
            <img src="../../assets/img/medicalInfo/xiehe.png" alt />
          </div>
          <div class="info">
            <span>
              <p>
                <span class="lable">产品名称：</span>
                {{articleDetail.name}}
              </p>
              <p>
                <span class="lable">产品类型：</span>
                {{articleDetail.type}}
              </p>
              <p>
                <span class="lable">批准文号：</span>
                {{articleDetail.permission}}
              </p>
              <p>
                <span class="lable">主要规格：</span>
                {{articleDetail.specification}}
              </p>
            </span>
          </div>
        </div>
        <div class="introduction">
          <span>
            <p>
              <span class="lable">产品用途：</span>
              {{articleDetail.use}}
            </p>
            <p>
              <span class="lable">产品说明：</span>
              {{articleDetail.introduction}}
            </p>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    showList: function() {
      let list = [];
      let typeList = [];
      this.listInfo.forEach(element => {
        if (typeList.indexOf(element.type) == -1) {
          typeList.push(element.type);
        }
        if (
          (!this.search.name || element.name == this.search.name) &&
          (!this.search.type || element.type == this.search.type)
        ) {
          list.push(element);
        }
      });
      return { list: list, typeList: typeList };
    }
  },
  data() {
    return {
      dialogVisible: false,
      search: {
        name: "",
        type: ""
      },
      listInfo: [
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "银黄胶囊",
          type: "医疗药品",
          introduction:
            "适用于各种手术及外伤造成的创面，皮肤溃疡和褥疮以及浅|度烧伤的愈合。适用于外科、妇科、皮形科等。",
          articleId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "银黄胶囊",
          type: "医疗器械",
          introduction:
            "适用于各种手术及外伤造成的创面，皮肤溃疡和褥疮以及浅|度烧伤的愈合。适用于外科、妇科、皮形科等。",
          articleId: "1"
        },
        {
          pic: require("../../assets/img/medicalInfo/xiehe.png"),
          name: "银黄胶囊",
          type: "保健品",
          introduction:
            "适用于各种手术及外伤造成的创面，皮肤溃疡和褥疮以及浅|度烧伤的愈合。适用于外科、妇科、皮形科等。",
          articleId: "1"
        }
      ],
      articleDetail: {
        name: "银黄胶囊",
        type: "医疗器械/医用敷料及卫生材料",
        permission:
          "鄂食药监械(准)字2013第2641767号 (湖北华中医用材料有限公司生产)",
        specification: "盒装",
        use:
          "适用于各种手术及外伤造成的创面，皮肤溃疡和褥疮以及浅|度烧伤的愈合。适用于外科、妇科、皮形科等。",
        introduction:
          "产品与伤口渗液相接触时，其中具有生物活性的生活活性玻璃(BG) 即可与组织发生一系列反应， 形成一个羟基磷灰HAP网络又作为新生组织的支架，使新生组织得以顺利爬移。而透明质酸钠(HA) 具有促进创面愈合组织中表皮生长因子含量增加，调控胶原合成、调节纤维活性和抗炎等作用; HA还能抑制胶原纤维组织挛缩，直至组织得到再生性修复。石"
      }
    };
  },

  methods: {
    reset() {
      this.search.name="";
      this.search.type="";
    },
    details(orgId) {
      this.dialogVisible = true;
      console.log(orgId);
    }
  }
};
</script>
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
  width: 90%;
  height: 150px;
  overflow: hidden;
  display: flex;
  margin: auto;
  .pic {
    width: 150px;
    height: 150px;
    margin-left: 10px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
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

