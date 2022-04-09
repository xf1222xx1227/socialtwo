<template>
  <el-dialog
    width="50%"
    title="评审详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingDetail">
      <!-- 数据分析与管理之间的关系 -->
      <!-- 从事大数据：素养（有层次的概念）/行业要求 -->
      <!-- 下降、遗传算法、回归、时间序列、神经网络、聚类 用自己的话表述这些算法 -->

      <el-descriptions title="审核人信息" border :column="2">
        <el-descriptions-item label="审核人">{{
          formData.exaname
        }}</el-descriptions-item>

        <el-descriptions-item label="审核日期">{{
          formData.examinedate
        }}</el-descriptions-item>
        <br />
      </el-descriptions>
      <el-descriptions
        title="审核详情"
        border
        :column="2"
        style="margin-top: 15px"
      >
        <el-descriptions-item label="经济评审得分">
          {{ formData.score_economics }}</el-descriptions-item
        >
        <el-descriptions-item label="经济评审理由">
          {{ formData.reason_economics }}</el-descriptions-item
        >
        <el-descriptions-item label="技术评审得分">
          {{ formData.score_technology }}</el-descriptions-item
        >
        <el-descriptions-item label="技术评审理由">
          {{ formData.reason_technology }}</el-descriptions-item
        >
        <el-descriptions-item label="综合评审得分">
          {{ formData.score_comprehensive }}</el-descriptions-item
        >
        <el-descriptions-item label="综合评审理由">
          {{ formData.reason_comprehensive }}</el-descriptions-item
        >
        <el-descriptions-item label="其他">
          {{ formData.other }}</el-descriptions-item
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
  props: ["datadetail"],
  data() {
    return {
      visible: false,
      labelPosition: "left",
      formData: {},
    };
  },
  created() {},
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      // if (this.visible == true) {
      //   return false;
      // }
    },
  },
  watch: {
    visible(newval, val) {
      this.files = "";
      if (newval == true) {
        this.formData = this.datadetail;
      }
    },
  },
};
</script>

<style lang="less" scoped>
// #biddingDetail {
//   //   height: 55vh;
// }
</style>