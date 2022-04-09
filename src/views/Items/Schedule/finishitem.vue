<template>
  <el-dialog
    width="50%"
    title="项目验收"
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
            <el-form-item
              label="是否通过："
              prop="pass"
              class="form_item slider"
            >
              <el-radio
                v-model="ruleForm.pass"
                label="1"
                :disabled="datadetail.badgeValue == ''"
                >通过</el-radio
              >
              <el-radio
                v-model="ruleForm.pass"
                label="0"
                :disabled="datadetail.badgeValue == ''"
                >不通过</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" v-show="ruleForm.pass == '0'">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="修改建议："
              prop="reason"
              class="form_item slider"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.reason"
                autosize
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" v-show="ruleForm.pass == '1'">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="评分：" prop="score" class="form_item">
              <el-rate
                v-model="ruleForm.score"
                show-text
                :texts="['极差', '较差', '一般', '较好', '很好']"
                style="margin-top: 10px"
              >
              </el-rate>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" v-show="ruleForm.pass == '1'">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="评论：" prop="reasonscore" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.reasonscore"
                autosize
                style="width: 100%"
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
        pass: "1",
        reason: "",
        score: 5,
        reasonscore: "",
        userid: "",
        other: "",
      },
      rules: {
        pass: [{ required: true, message: "请选择验收结果", trigger: "blur" }],
        score: [{ required: true, message: "请为项目评分", trigger: "blur" }],
        // reason: [
        //   { required: true, message: "请输入需要更改的地方", trigger: "blur" },
        // ],
      },
      labelPosition: "left",
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
          // 通过
          if (this.ruleForm.pass == "1") {
            //  完成申请
            if (this.datadetail.badgeValue != "") {
              this.$api
                .updateApplyFinishItemPass({
                  it_id: this.datadetail.it_id,
                  ex_id: this.datadetail.ex_id,
                  answertime: myFunctions.newDateToDate(new Date()),
                })
                .then((res) => {
                  if (res.status == 200) {
                  }
                });
            }
            // 状态;
            this.$api
              .updateOpenToDinish({
                it_id: this.datadetail.it_id,
              })
              .then((res) => {
                if (res.status == 200) {
                }
              });
            //   加入完成表
            this.$api
              .addFinishItem({
                it_id: this.datadetail.it_id,
                ex_id: this.datadetail.ex_id,
                finilly_time: myFunctions.newDateToDate(new Date()),
                userid: sessionStorage.getItem("userid"),
                score: this.ruleForm.score,
                reasonscore: this.ruleForm.reasonscore,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.$message({
                    type: "success",
                    message: "提交成功，项目正式完成",
                    offset: 150,
                  });
                  this.$emit("refresh", "1");
                  this.visible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "提交失败，项请稍候再试",
                    offset: 150,
                  });
                }
              });
          }
          // 不通过
          else {
            if (this.ruleForm.reason == "") {
              this.$message({
                type: "error",
                message: "请输入需要更改的地方",
                offset: 150,
              });
            } else {
              this.$api
                .updateApplyFinishItemNoPass({
                  it_id: this.datadetail.it_id,
                  ex_id: this.datadetail.ex_id,
                  answertime: myFunctions.newDateToDate(new Date()),
                  reason: this.ruleForm.reason,
                })
                .then((res) => {
                  if (res.status == 200) {
                    this.$message({
                      type: "success",
                      message: "提交成功，专家将收到更改提醒",
                      offset: 150,
                    });
                    this.$emit("refresh", "2");
                    this.visible = false;
                  } else {
                    this.$message({
                      type: "error",
                      message: "提交失败，项请稍候再试",
                      offset: 150,
                    });
                  }
                });
            }
          }
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
        // this.refresh = "0";
        // let data = this.datadetail;
        // this.ruleForm.it_id = data.it_id;
        // this.ruleForm.ex_id = data.ex_id;
        // this.ruleForm.time_finilly = myFunctions.newDateToDate(
        //   myFunctions.dateAddAndReduce(new Date(), "month", 3)
        // );
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