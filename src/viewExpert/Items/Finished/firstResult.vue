<template>
  <el-dialog
    width="50%"
    title="初审详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="total">
      <el-descriptions title="" :column="1">
        <el-descriptions-item label="项目名称">{{
          datadetail.itemname
        }}</el-descriptions-item>
        <el-descriptions-item label="申报时间">{{
          datadetail.bid_time
        }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{
          datadetail.time_examine
        }}</el-descriptions-item>

        <el-descriptions-item label="审核结果">
          <el-tag type="success">{{
            datadetail.tag
          }}</el-tag></el-descriptions-item
        >
        <el-descriptions-item label="审核原因">
          {{ datadetail.reason }}
        </el-descriptions-item>
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
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.dataitid = this.datadetail.it_id;
        this.datadetail.time_examine = myFunctions.newDateToDate(
          this.datadetail.time_examine
        );
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