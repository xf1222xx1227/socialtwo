<template>
  <div id="totalDetailedExamination">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">已有成员</el-menu-item>
      <el-menu-item index="3">未通过</el-menu-item>
      <el-menu-item index="2">新申请</el-menu-item>
      <el-badge :value="badgeValue" class="item"></el-badge>
    </el-menu>
    <div class="content">
      <TableHave ref="tableHave" :freshed="fresh" />
      <Eliminate ref="eliminate" />
      <TableRegister ref="tableRegister" @refresh="reFresh" />
    </div>
  </div>
</template>

<script>
import TableHave from "./TableHave/tablehave.vue";
import TableRegister from "./TableRegister/tableregister.vue";
import Eliminate from "./Eliminate/eliminate.vue";
export default {
  components: {
    TableHave,
    Eliminate,
    TableRegister,
  },
  data() {
    return {
      activeIndex: "1",
      badgeValue: 0,

      dataregister: [],
      fresh: "0",
    };
  },
  created() {
    this.getRegister();

    /*
      一。手写（匿名/可以钉钉上交） 1500字
      1. 目标（缺乏哪些知识）
      2. 学校提供平台，希望有什么内容
      3. 怎么完成自己的目标
      中心-计划-怎么实施计划，
      制定计划的依据；
      怎么保证初心；

      这些课程怎么理解，怎么看待这个专业，自己还差什么

      5. 

      5月15号之前上交
    */
  },
  methods: {
    // 选中菜单栏
    handleSelect(key, keyPath) {
      if (key == "1") {
        this.$refs.tableRegister.visible = false;
        this.$refs.eliminate.visible = false;
        this.$refs.tableHave.visible = true;
      } else if (key == "2") {
        this.$refs.tableHave.visible = false;
        this.$refs.eliminate.visible = false;
        this.$refs.tableRegister.visible = true;
      } else if (key == "3") {
        this.$refs.tableHave.visible = false;
        this.$refs.tableRegister.visible = false;
        this.$refs.eliminate.visible = true;
      }
    },
    // 获取账号申请信息
    getRegister() {
      this.dataregister = [];
      this.badgeValue = 0;
      this.$api
        .getOneBiddingUsersRegister({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.dataregister = res.data.result;
              this.badgeValue = res.data.result.length;
            }
          }
        });
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval != "0") {
        this.getRegister();
        this.fresh = "0";
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