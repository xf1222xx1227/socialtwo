<template>
  <div id="totalDetailedExamination">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" class="menuitem">已定标</el-menu-item>

      <el-menu-item index="3">定标中</el-menu-item>
      <el-badge :value="badgeValue" class="badge" :hidden="visible"> </el-badge>
    </el-menu>
    <div class="content">
      <!-- <First ref="first" /> -->
      <Calibrationed ref="calibrationed" />
      <Calibrationing ref="calibrationing" @getbadge="getBadge" />
    </div>
  </div>
</template>

<script>
// import First from "./first/index.vue";
import Calibrationed from "./calibrationed/index.vue";
import Calibrationing from "./calibrationing/index.vue";
export default {
  components: {
    // First,
    Calibrationed,
    Calibrationing,
  },
  data() {
    return {
      activeIndex: "1",
      badgeValue: 0,
      visible: true,
    };
  },
  created() {},
  methods: {
    // 选中菜单栏
    handleSelect(key, keyPath) {
      if (key == "1") {
        this.$refs.calibrationed.visible = true;
        this.$refs.calibrationing.visible = false;
        // this.$refs.first.visible = true;
      } else if (key == "2") {
        // this.$refs.first.visible = false;
        this.$refs.calibrationing.visible = false;
        this.$refs.calibrationed.visible = true;
      } else if (key == "3") {
        // this.$refs.first.visible = false;
        this.$refs.calibrationed.visible = false;
        this.$refs.calibrationing.visible = true;
      }
    },
    getBadge(val) {
      this.badgeValue = val;
    },
  },
  watch: {
    badgeValue(newval, val) {
      if (newval < 1) {
        this.visible = true;
      } else {
        this.visible = false;
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
    .badge {
      margin-top: 10px;
    }
  }
  .content {
    height: 84vh;
    // flex: 1;
  }
}
</style>