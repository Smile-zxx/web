<template>
  <div>
    <div v-for="(item, index) in pinggu" :key="item.id" class="pinggu">
      <div>
        <span style="margin-right:40px"
          >{{ item.name }}{{ "(" + item.state + ")" }}</span
        >
        <el-link
          @click="jinxingpinggu(item, index)"
          :type="item.state == '已完成' ? 'primary' : 'success'"
          >{{ item.state == "已完成" ? "查看" : "进行评估" }}</el-link
        >
      </div>
      <div v-show="item.isOpen" class="pinggubiao">
        <div style="margin:20px 0;">
          <components
            @cancel="pingguCancel(item, index)"
            :preData="item.data"
            :readonly="true"
            :is="item.type"
          ></components>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pinggu: []
    };
  }
};
</script>

<style>
</style>