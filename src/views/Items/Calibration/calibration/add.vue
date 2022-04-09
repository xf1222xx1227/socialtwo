<template>
  <el-dialog
    width="50%"
    title="项目定标邀请"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingEdit">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="form"
      >
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="预算：" prop="budget" class="form_item slider">
              <el-input v-model="ruleForm.budget" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="完成时间："
              prop="time_finilly"
              class="form_item slider"
            >
              <el-date-picker
                type="date"
                v-model="ruleForm.time_finilly"
                placeholder="选择日期"
                autosize
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="其他：" prop="other" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.other"
                placeholder=""
                autosize
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok('ruleForm')" type="primary">确 定</el-button>
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
      files: "",
      ruleForm: {
        it_id: "",
        ex_id: "",
        time_finilly: "",
        time_calibration: "",
        budget: 0,
        userid: "",
        other: "",
      },
      rules: {
        budget: [{ required: true, message: "请输入预算", trigger: "blur" }],
        time_finilly: [
          { required: true, message: "请输入完成时间", trigger: "blur" },
        ],
      },
      labelPosition: "left",
      // refresh: "0",
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
    Ok(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$confirm(
            `是否确定对专家《${this.datadetail.name}》的邀请信息?`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "info",
            }
          ).then(() => {
            this.ruleForm.time_calibration = myFunctions.newDateToDate(
              new Date()
            );
            this.ruleForm.userid = sessionStorage.getItem("userid");
            this.ruleForm.time_finilly = myFunctions.newDateToDate(
              this.ruleForm.time_finilly
            );
            // console.log(222, this.ruleForm);
            this.$api
              .addCalibration({
                ex_id: this.ruleForm.ex_id,
                it_id: this.ruleForm.it_id,
                time_calibration: this.ruleForm.time_calibration,
                time_finilly: this.ruleForm.time_finilly,
                budget: this.ruleForm.budget,
                userid: this.ruleForm.userid,
                state: 0,
                other: this.ruleForm.other,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.$message({
                    type: "success",
                    message: "发送成功",
                    offset: 150,
                  });
                  // this.refresh = "1";
                  this.$emit("Fresh", "1");
                  this.visible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "发送失败，请稍后再试",
                    offset: 150,
                  });
                }
              });
          });
        }
      });
    },
    // 取消键
    Cancel() {
      //   this.$emit("closeDialog", "关闭");
    },
  },
  watch: {
    visible(newval, val) {
      //   console.log(newval);
      if (newval == true) {
        this.refresh = "0";
        let data = this.datadetail;
        this.ruleForm.it_id = data.it_id;
        this.ruleForm.ex_id = data.ex_id;
        this.ruleForm.time_finilly = myFunctions.newDateToDate(
          myFunctions.dateAddAndReduce(new Date(), "month", 3)
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