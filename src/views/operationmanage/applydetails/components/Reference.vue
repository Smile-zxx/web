<template>
  <!-- 
参考信息
  -->
  <div class="reference">
    <el-tabs tab-position="left" v-model="editableTabsValue">
      <el-tab-pane
        v-for="item in tabComponents"
        :key="item.name"
        :name="item.name"
      >
        <template slot="label">
          <span class="title">{{ item.title }}</span>
        </template>
        <div class="content">
          <component :is="item.type"></component>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DiagResult from "./DiagResult.vue";
export default {
  components: {
    DiagResult
  },
  data() {
    return {
      editableTabsValue: "1",
      tabComponents: [
        {
          title: "就诊记录",
          name: "1",
          type: "DiagResult"
        }
      ],
      tabIndex: 1
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.reference {
  margin-top: 20px;
  .content {
    max-height: 500px;
    overflow: auto;
  }
  .title {
    font-size: 20px;
    color: #1c7e7c;
    font-weight: bold;
  }
}
</style>

<style lang="scss">
.reference {
  .el-tabs__item .el-icon-close {
    font-size: 18px;
    margin-left: 10px;
  }
  .el-collapse {
    border-bottom: 0px solid white;
  }
  .el-tabs__item {
    padding: 0px 20px 0 0;
  }
  .el-tabs__active-bar {
    background-color: #1c7e7c;
  }
}
</style>