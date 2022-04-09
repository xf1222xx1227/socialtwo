<template>
  <div class="total">
    <el-descriptions title="项目信息" :column="1" class="descriptions">
      <el-descriptions-item label="项目名称">{{
        datadetail.name
      }}</el-descriptions-item>
      <el-descriptions-item label="发布日期">{{
        datadetail.time_release
      }}</el-descriptions-item>
      <el-descriptions-item label="项目分类">{{
        datadetail.categoryname
      }}</el-descriptions-item>
      <el-descriptions-item label="研究方向">
        {{ datadetail.typename }}
      </el-descriptions-item>
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
    <el-descriptions title="社科信息" :column="1" class="descriptions">
      <el-descriptions-item label="发布社科">{{
        datadetail.bidname
      }}</el-descriptions-item>
      <el-descriptions-item label="社科地址">{{
        datadetail.bidaddress
      }}</el-descriptions-item>
      <el-descriptions-item label="社科电话">{{
        datadetail.bidphone
      }}</el-descriptions-item>
      <el-descriptions-item label="发布人">
        {{ datadetail.username }}
      </el-descriptions-item>
      <el-descriptions-item label="发布人电话">
        {{ datadetail.userphone }}
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
        .getOneItemInfo({
          it_id: it_id,
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
    // 文件详情
    detailsFiles() {
      this.$refs.dialogDetailFils.whereFrom = "detail";
      this.$refs.dialogDetailFils.visible = true;
    },
    getFiles(itid) {
      this.$api
        .getBiddingFiles({
          it_id: itid,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            if (res.data.status == 200) {
              this.dataFiles = data;
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