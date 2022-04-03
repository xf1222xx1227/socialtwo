<template>
  <el-dialog
    width="70%"
    title="投标详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingDetail">
      <el-descriptions title="申报人信息" :column="3" border>
        <el-descriptions-item label="姓名">{{
          formData.name
        }}</el-descriptions-item>
        <el-descriptions-item label="荣誉称号">
          {{ formData.honorname }}</el-descriptions-item
        >
        <el-descriptions-item label="研究专长">{{
          formData.research_specialty
        }}</el-descriptions-item>
        <el-descriptions-item label="学位">{{
          formData.degreename
        }}</el-descriptions-item>
        <el-descriptions-item label="已做项目数">{{
          formData.count
        }}</el-descriptions-item>
        <el-descriptions-item label="项目总资金">{{
          formData.money
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="申报信息" :column="2" border>
        <el-descriptions-item label="申报预算">{{
          formData.budget
        }}</el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ formData.other }}</el-descriptions-item
        >
        <el-descriptions-item label="申报时间">{{
          formData.bid_time
        }}</el-descriptions-item>

        <el-descriptions-item label="完成时间">{{
          formData.finilly_time
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="申报文件" border>
        <template slot="extra">
          <el-button type="primary" @click="detailsFiles" size="small"
            >文件详情</el-button
          >
        </template>
        <el-descriptions-item label="文件列表">
          {{ files }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <DetailsFiles
      ref="dialogDetailFils"
      :datafiles="dataFiles"
      @getdeletedata="getDeleteData"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import myFunctions from "../../../myFunctions";
import DetailsFiles from "../../../views/Items/Bidding/detailsFiles.vue";
export default {
  props: ["datadetail"],
  components: {
    DetailsFiles,
  },

  data() {
    return {
      visible: false,
      formData: {},
      files: "",
      dataFiles: [],
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
    // 文件详情
    detailsFiles() {
      this.$refs.dialogDetailFils.whereFrom = "detail";
      this.$refs.dialogDetailFils.visible = true;
    },
    getDeleteData(val) {},
  },
  watch: {
    visible(newval, val) {
      this.files = "";
      if (newval == true) {
        console.log(111, this.datadetail);
        this.formData = this.datadetail;

        this.$api
          .getBidFiles({
            it_id: this.formData.it_id,
            ex_id: this.formData.ex_id,
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
      }
    },
  },
};
</script>

<style lang="less" scoped>
// #biddingDetail {
//   //   height: ;
// }
</style>