<template>
  <div class="total">
    <el-descriptions title="定标信息" :column="1">
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

    <!-- <div class="mybt">
      <el-button type="success" @click="accept" round class="bt"
        >参与项目</el-button
      >
      <el-button type="warning" @click="refuse" round class="bt"
        >拒绝项目</el-button
      >
    </div> -->
    <div class="result">
      <el-tag
        type="success"
        v-show="datadetail.state == 1 && datadetail.states != 6"
        class="tags"
        >已经接受该项目，请等待项目开标</el-tag
      >
      <el-tag
        type="success"
        v-show="datadetail.state == 1 && datadetail.states == 6"
        class="tags"
        >项目已开标，请上传进度并尽快完成</el-tag
      >
      <el-tag type="danger" v-show="datadetail.state == 2" class="tags"
        >已经拒绝该项目</el-tag
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataitid"],
  data() {
    return {
      datadetail: {},
    };
  },
  created() {
    if (this.dataitid != "") {
      this.getData(this.dataitid);
    }
  },
  methods: {
    accept() {
      this.$confirm(`是否确定参与该项目?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        this.$api
          .updateCalibrationAccept({
            it_id: this.dataitid,
            ex_id: sessionStorage.getItem("userid"),
            state: 1,
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "已参与该项目，请把握时间，完成项目，并及时上传进度",
                offset: 150,
              });
              this.$emit("refresh", "1");
            } else {
              this.$message({
                type: "error",
                message: "参与失败，请稍后再试",
                offset: 150,
              });
            }
          });
      });
    },
    refuse() {
      this.$confirm(`是否确定 拒绝 参与该项目?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(() => {
        this.$api
          .updateCalibrationAccept({
            it_id: this.dataitid,
            ex_id: sessionStorage.getItem("userid"),
            state: 2,
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "已拒绝参与该项目",
                offset: 150,
              });
              this.$emit("refresh", "1");
            } else {
              this.$message({
                type: "error",
                message: "上传失败，请稍后再试",
                offset: 150,
              });
            }
          });
      });
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
    dataitid(newval, val) {
      this.datadetail = {};
      if (newval != "") {
        this.getData(newval);
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
  .mybt {
    margin-top: 50px;
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
  }
  .result {
    height: 50px;
    margin-top: 50px;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    .tags {
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  }
}
</style>