<template>
  <el-dialog
    width="50%"
    title="申请回执详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingEdit">
      <el-descriptions title="" :column="1">
        <el-descriptions-item label="审核结果">{{
          datadetail.pass
        }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{
          datadetail.date
        }}</el-descriptions-item>
        <el-descriptions-item label="改进详情">{{
          datadetail.reason
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok" type="primary">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";

export default {
  props: ["datadetail"],
  data() {
    return {
      visible: false,
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
    // 确定按钮
    Ok() {
      this.visible = false;
    },
    // 取消键
    Cancel() {
      //   this.$emit("closeDialog", "关闭");
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        console.log(111, this.datadetail);
        this.datadetail.pass = this.datadetail.state == 2 ? "不通过" : "通过";
        this.datadetail.date = myFunctions.newDateToDate(
          this.datadetail.answertime
        );
      }
    },
  },
};
</script>

<style  lang="less" scoped>
#biddingEdit {
  padding: 0px 20px;
  .block {
    width: 100%;
    border-bottom: 1px dashed #dcdcdc;
    .blockmsg {
      font-size: 18px;
      color: #9c8888;
    }
  }
  .row {
    margin-top: 20px;
    .col {
      margin-top: -20px;
    }
  }
}
</style>