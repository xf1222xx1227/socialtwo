<template>
  <el-dialog
    width="40%"
    title="初审截至"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="total">
      <div class="form">
        <div class="info">
          <div class="text">初审截至日期:</div>
          <div class="textbox">
            <el-date-picker
              v-model="finishdate"
              type="date"
              placeholder="选择初审截至日期"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="info">
          <div class="text">细审截至日期:</div>
          <div class="textbox">
            <el-date-picker
              v-model="detailfinishtime"
              type="date"
              placeholder="选择细审截至日期"
              style="width: 100%"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="Ok(2)">现在结束</el-button>
      <el-button type="primary" @click="Ok(1)">确 定</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "../../../myFunctions";
export default {
  props: ["datadetail"],
  components: {},

  data() {
    return {
      visible: false,
      finishdate: "",
      detailfinishtime: "",
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
    Ok(type) {
      let finishtime = "";
      if (type == 2) {
        finishtime = myFunctions.newDateToDate(new Date());
      } else {
        finishtime = myFunctions.newDateToDate(this.finishdate);
      }
      let nowdate = myFunctions.newDateToDate(new Date());
      let detailfinishtime = "";
      if (this.detailfinishtime != "") {
        detailfinishtime = myFunctions.newDateToDate(this.detailfinishtime);
      }
      let it_id = this.datadetail.it_id;
      this.$api
        .addFinishFirst({
          it_id: it_id,
          finishtime: finishtime,
          updatetime: nowdate,
          detailfinishtime: detailfinishtime,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: "提交成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "提交失败，请稍后再试",
              type: "error",
            });
          }
        });
      this.visible = false;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        let it_id = this.datadetail.it_id;
        this.$api
          .getOneItemFinishFirst({
            it_id: it_id,
          })
          .then((res) => {
            if (res.status == 200) {
              let data = res.data.result;
              if (res.data.status == 200) {
                this.finishdate = myFunctions.newDateToDate(data[0].finishtime);
                if (data[0].detailfinishtime != "") {
                  this.detailfinishtime = myFunctions.newDateToDate(
                    data[0].detailfinishtime
                  );
                }
              } else {
                this.finishdate = myFunctions.newDateToDate(new Date());
                let date = myFunctions.newDateToDate(
                  myFunctions.dateAddAndReduce(new Date(), "day", 10)
                );
                this.detailfinishtime = date;
              }
            }
          });
      } else {
        this.finishdate = "";
        this.detailfinishtime = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
#total {
  //   height: 55vh;

  .form {
    text-align: center;
    width: 95%;
    padding: 10px;
    // border: 1px solid red;
    .info {
      // border: 1px solid red;
      width: 100%;
      height: 50px;
      display: flex;
      flex-flow: row;
      align-items: center;
      .text {
        flex: 2;
        // border: 1px solid red;
      }
      .textbox {
        flex: 3;
        // border: 1px solid red;
      }
    }
  }
}
</style>