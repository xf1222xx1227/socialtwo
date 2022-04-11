<template>
  <el-dialog
    width="50%"
    title="定标详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="total">
      <el-descriptions title="" :column="1">
        <el-descriptions-item label="预算">{{
          datadetail.budget
        }}</el-descriptions-item>
        <el-descriptions-item label="邀请时间">{{
          datadetail.time_calibration
        }}</el-descriptions-item>
        <el-descriptions-item label="完成时间">{{
          datadetail.time_finilly
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ datadetail.other }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  props: ["dataitid"],
  data() {
    return {
      visible: false,
      datadetail: {},
    };
  },
  created() {},
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    getData(it_id) {
      this.$api
        .getOneItemOneExpertCalibrationed({
          it_id: it_id,
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.datadetail = data[0];
            }
          }
        });
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        if (this.dataitid != "") {
          this.getData(this.dataitid);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  //   height: 75vh;
  overflow: auto;
  padding: 0 10px;
  .descriptions {
    // padding-left: 10px;
    // border: 1px solid red;
    margin-top: 10px;
  }
}
</style>