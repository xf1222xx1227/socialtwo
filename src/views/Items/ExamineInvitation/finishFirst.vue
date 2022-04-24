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
      addoruqdate: "add",
      successorerror: "0",
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
    Ok() {
      let finishtime = "";
      finishtime =
        this.finishdate == "" ? "" : myFunctions.newDateToDate(this.finishdate);
      let nowdate = myFunctions.newDateToDate(new Date());
      let detailfinishtime = "";
      if (this.detailfinishtime != "") {
        detailfinishtime = myFunctions.newDateToDate(this.detailfinishtime);
      }
      let it_id = this.datadetail.it_id;
      if (this.addoruqdate == "add") {
        this.$api
          .addFinishFirst({
            it_id: it_id,
            finishtime: finishtime,
            updatetime: nowdate,
            detailfinishtime: detailfinishtime,
          })
          .then((res) => {
            if (res.status == 200) {
              this.successorerror = "1";
            } else {
              this.successorerror = "2";
            }
          });
      } else {
        this.$api
          .updateFinishFirst({
            it_id: it_id,
            finishtime: finishtime,
            updatetime: nowdate,
            detailfinishtime: detailfinishtime,
          })
          .then((res) => {
            if (res.status == 200) {
              this.successorerror = "1";
              this.detailToCalibration();
            } else {
              this.successorerror = "2";
            }
          });
      }
    },
    // 评标 分数-评语，需要一个标准（管理员定）
    // 加一个撤回评标
    // 预估
    // 分类评价

    // 下属联系方式，负责的业务，部门

    // 管理员一键下载全部文件（便于管理）

    detailToCalibration() {
      // 细审结束变成定标项目
      // myFunctions.detailToCalibration();
      let date = myFunctions.newDateToDatetime(new Date());
      this.$api.getFinishFirstTrial({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            console.log(111, data);
            for (let i = 0; i < data.length; i++) {
              if (
                data[i].detailfinishtime != "" &&
                data[i].detailfinishtime < date
              ) {
                this.$api
                  .updateDetailToCalibration({
                    it_id: data[i].it_id,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                      if (res.data.status == 200) {
                      }
                    }
                  });
              }
            }
          }
        }
      });
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
                this.addoruqdate = "update";
              } else {
                this.finishdate = myFunctions.newDateToDate(new Date());
                let date = myFunctions.newDateToDate(
                  myFunctions.dateAddAndReduce(new Date(), "day", 10)
                );
                this.detailfinishtime = date;
                this.addoruqdate = "add";
              }
            }
          });
      } else {
        this.finishdate = "";
        this.detailfinishtime = "";
      }
    },
    successorerror(newval, val) {
      if (newval == "1") {
        this.$message({
          message: "提交成功",
          type: "success",
        });
        // this.$emit("getState", "success");
        this.successorerror = "0";
        this.visible = false;
      } else if (newval == "2") {
        this.$message({
          message: "提交失败，请稍后再试",
          type: "error",
        });
        // this.$emit("getState", "error");
        this.successorerror = "0";
        this.visible = false;
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