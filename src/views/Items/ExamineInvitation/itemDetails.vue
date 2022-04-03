<template>
  <el-dialog
    width="80%"
    title="项目详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingDetail">
      <!-- 数据分析与管理之间的关系 -->
      <!-- 从事大数据：素养（有层次的概念）/行业要求 -->
      <!-- 下降、遗传算法、回归、时间序列、神经网络、聚类 用自己的话表述这些算法 -->

      <el-descriptions title="基本信息" border>
        <el-descriptions-item label="项目名称">{{
          formData.name
        }}</el-descriptions-item>

        <el-descriptions-item label="发布日期">{{
          formData.time_release
        }}</el-descriptions-item>
        <el-descriptions-item label="截至报名日期">
          {{ formData.time_end }}</el-descriptions-item
        >
        <el-descriptions-item label="初步预算">
          {{ formData.funds }}</el-descriptions-item
        >
        <el-descriptions-item label="项目分类">
          {{ formData.categoryname }}</el-descriptions-item
        >
        <el-descriptions-item label="研究方向">
          {{ formData.typename }}</el-descriptions-item
        >
        <el-descriptions-item label="具体内容">
          {{ formData.content }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions title="招标方式" border>
        <el-descriptions-item label="公开招标">{{
          formData.public == 0 ? "否" : "是"
        }}</el-descriptions-item>
        <el-descriptions-item label="邀请招标">{{
          formData.invitation == 0 ? "否" : "是"
        }}</el-descriptions-item>
        <el-descriptions-item label="推荐招标">
          {{ formData.recommend == 0 ? "否" : "是" }}</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions title="评审占比" border>
        <el-descriptions-item label="经济评审占比"
          >{{
            (formData.rate_economics / formData.rate).toFixed(4) * 100
          }}%</el-descriptions-item
        >
        <el-descriptions-item label="技术评审占比"
          >{{
            (formData.rate_technology / formData.rate).toFixed(4) * 100
          }}%</el-descriptions-item
        >
        <el-descriptions-item label="综合评审占比">
          {{
            (formData.rate_comprehensive / formData.rate).toFixed(4) * 100
          }}%</el-descriptions-item
        >
      </el-descriptions>
      <el-descriptions title="文件" border>
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
    <DetailsFiles ref="dialogDetailFils" :datafiles="dataFiles" />

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "../../../myFunctions";
import DetailsFiles from "../Bidding/detailsFiles.vue";
export default {
  props: ["datadetail"],
  components: {
    DetailsFiles,
  },

  data() {
    return {
      visible: false,
      labelPosition: "left",
      formData: {},
      files: "",
      dataFiles: [],
    };
  },
  created() {
    // let i = 12;
    // console.log(i.toFixed(2));
    // console.log(111);
    // console.log(123, this.datadetail);
  },
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
  },
  watch: {
    visible(newval, val) {
      this.files = "";
      if (newval == true) {
        // console.log(111, this.datadetail);
        this.formData = this.datadetail;
        this.formData.content = myFunctions.chooseHave(
          this.formData.content,
          "无"
        );
        this.formData.rate =
          this.formData.rate_economics +
          this.formData.rate_technology +
          this.formData.rate_comprehensive;

        //   this.formData.content =
        //     "dfsdgvsvsfvfsfhgfdhbgdnbfnfhjrjhnkjgmgjm,ryymrhjfhdnfdghjjrnrhn";
        // 加载文件数据
        this.$api
          .getBiddingFiles({
            it_id: this.formData.it_id,
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
#biddingDetail {
  height: 55vh;
}
</style>