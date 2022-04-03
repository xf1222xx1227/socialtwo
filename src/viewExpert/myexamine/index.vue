<template>
  <div id="totalDetailedExamination">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">细审邀请</el-menu-item>
      <el-menu-item index="2">待审核</el-menu-item>
      <el-menu-item index="3">已审核</el-menu-item>
    </el-menu>
    <div class="content">
      <Invitation ref="invitation" />
      <Examineing ref="examineing" />
      <Examined ref="examined" />
    </div>
  </div>
</template>

<script>
import Invitation from "./invitation/index.vue";
import Examineing from "./examineing/index.vue";
import Examined from "./examined/index.vue";
export default {
  components: {
    Invitation,
    Examineing,
    Examined,
  },
  data() {
    return {
      activeIndex: "1",
    };
  },
  created() {
    // this.$refs.invitation.visible = true;
  },
  methods: {
    // 选中菜单栏
    handleSelect(key, keyPath) {
      if (key == "1") {
        this.$refs.examineing.visible = false;
        this.$refs.examined.visible = false;
        this.$refs.invitation.visible = true;
      } else if (key == "2") {
        this.$refs.invitation.visible = false;
        this.$refs.examined.visible = false;
        this.$refs.examineing.visible = true;
      } else if (key == "3") {
        this.$refs.invitation.visible = false;
        this.$refs.examineing.visible = false;
        this.$refs.examined.visible = true;
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
    height: 83vh;
    // flex: 1;
  }
}
</style>