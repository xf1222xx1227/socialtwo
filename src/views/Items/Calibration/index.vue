<template>
  <div id="totalDetailedExamination">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="3">定标中</el-menu-item>
      <el-menu-item index="2">等待开标</el-menu-item>
      <el-menu-item index="1">审核中</el-menu-item>
    </el-menu>
    <div class="content">
      <First ref="first" />
      <Calibrationed ref="calibrationed" />
      <Calibration ref="calibration" />
    </div>
  </div>
</template>

<script>
import First from "./first/index.vue";
import Calibrationed from "./calibrationed/index.vue";
import Calibration from "./calibration/index.vue";
export default {
  components: {
    First,
    Calibrationed,
    Calibration,
  },
  data() {
    return {
      activeIndex: "3",
    };
  },
  created() {},
  methods: {
    // 选中菜单栏
    handleSelect(key, keyPath) {
      if (key == "1") {
        this.$refs.calibrationed.visible = false;
        this.$refs.calibration.visible = false;
        this.$refs.first.visible = true;
      } else if (key == "2") {
        this.$refs.first.visible = false;
        this.$refs.calibration.visible = false;
        this.$refs.calibrationed.visible = true;
      } else if (key == "3") {
        this.$refs.first.visible = false;
        this.$refs.calibrationed.visible = false;
        this.$refs.calibration.visible = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#totalDetailedExamination {
  height: 92vh;
  display: flex;
  flex-flow: column;
  .el-menu-demo {
    height: 8vh;
  }
  .content {
    height: 84vh;
    // flex: 1;
  }
}
</style>