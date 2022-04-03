<template>
  <div id="totalDetailedExamination">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- <el-menu-item index="1">项目详情</el-menu-item> -->
      <el-menu-item index="2">待审核</el-menu-item>
      <el-menu-item index="3">已审核</el-menu-item>
    </el-menu>
    <div class="content">
      <!-- <ItemDetail ref="itemDetail" /> -->
      <Examineing ref="examineing" />
      <Examined ref="examined" />
    </div>
  </div>
</template>

<script>
import ItemDetail from "./itemDeatil.vue";
import Examineing from "./examineing.vue";
import Examined from "./examined.vue";
export default {
  components: {
    ItemDetail,
    Examineing,
    Examined,
  },
  data() {
    return {
      activeIndex: "2",
    };
  },
  created() {
    // this.$refs.itemDetail.visible = true;
  },
  methods: {
    // 选中菜单栏
    handleSelect(key, keyPath) {
      // if (key == "1") {
      //   this.$refs.examineing.visible = false;
      //   this.$refs.examined.visible = false;
      //   this.$refs.itemDetail.visible = true;
      // } else
      if (key == "2") {
        // this.$refs.itemDetail.visible = false;
        this.$refs.examined.visible = false;
        this.$refs.examineing.visible = true;
      } else if (key == "3") {
        // this.$refs.itemDetail.visible = false;
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
    // flex: 1;
    height: 83vh;
    // border: 1px solid red;
  }
  // border: 1px solid red;
}
</style>