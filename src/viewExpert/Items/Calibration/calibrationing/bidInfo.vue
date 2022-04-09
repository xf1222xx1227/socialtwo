<template>
  <div class="total">
    <el-descriptions title="申报信息" :column="1">
      <el-descriptions-item label="预算">{{
        datadetail.budget
      }}</el-descriptions-item>
      <el-descriptions-item label="备注">
        {{ datadetail.other }}</el-descriptions-item
      >
      <el-descriptions-item label="申报时间">{{
        datadetail.bid_time
      }}</el-descriptions-item>

      <el-descriptions-item label="完成时间">{{
        datadetail.finilly_time
      }}</el-descriptions-item>
      <el-descriptions-item label="文件信息">
        <el-button
          type="primary"
          @click="detailsFiles"
          size="small"
          round
          icon="el-icon-search"
          style="height: 70%; display: flex; align-items: center"
          >查看</el-button
        >
      </el-descriptions-item>
    </el-descriptions>
    <DetailsFiles ref="dialogDetailFils" :datafiles="dataFiles" />
  </div>
</template>

<script>
import DetailsFiles from "../../../../views/Items/Bidding/detailsFiles.vue";
export default {
  props: ["dataitid"],
  components: { DetailsFiles },
  data() {
    return {
      datadetail: {},
      dataFiles: [],
      files: "",
    };
  },
  created() {
    if (this.dataitid != "") {
      this.getData(this.dataitid);
    }
  },
  methods: {
    getData(it_id) {
      this.$api
        .getOneExpertOneBidInfo({
          it_id: it_id,
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(111, res);
            // console.log(111, it_id, sessionStorage.getItem("userid"));
            if (res.data.status == 200) {
              let data = res.data.result;
              this.datadetail = data[0];
            }
          }
        });
    },
    // 文件详情
    detailsFiles() {
      this.$refs.dialogDetailFils.whereFrom = "detail";
      this.$refs.dialogDetailFils.visible = true;
    },
    getFiles(itid) {
      this.$api
        .getBidFiles({
          it_id: itid,
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            if (res.data.status == 200) {
              this.dataFiles = data;
              if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                  if (i > 0) {
                    this.files += "  ;  ";
                  }
                  this.files += data[i].name;
                }
              }
            } else {
              this.files = "无";
            }
          }
        });
    },
  },
  watch: {
    dataitid(newval, val) {
      this.datadetail = {};
      this.dataFiles = [];
      if (newval != "") {
        this.getData(newval);
        this.getFiles(newval);
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