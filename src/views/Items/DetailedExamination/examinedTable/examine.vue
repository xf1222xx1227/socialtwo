<template>
  <el-dialog
    width="50%"
    title="项目细审"
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
        <div class="block">
          <p class="blockmsg">经济评审</p>
        </div>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="得分："
              prop="score_economics"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.score_economics"
                show-input
                :disabled="showdis"
              >
              </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="原因："
              prop="reason_economics"
              class="form_item slider"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.reason_economics"
                placeholder="请输入审核结果理由"
                autosize
                :disabled="showdis"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="block">
          <p class="blockmsg">技术评审</p>
        </div>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="得分："
              prop="score_technology"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.score_technology"
                show-input
                :disabled="showdis"
              >
              </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="原因："
              prop="reason_technology"
              class="form_item slider"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.reason_technology"
                placeholder="请输入审核结果理由"
                autosize
                :disabled="showdis"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="block">
          <p class="blockmsg">综合评审</p>
        </div>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="得分："
              prop="score_comprehensive"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.score_comprehensive"
                show-input
                :disabled="showdis"
              >
              </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="22" :offset="2" class="col">
            <el-form-item
              label="原因："
              prop="reason_comprehensive"
              class="form_item slider"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.reason_comprehensive"
                placeholder="请输入审核结果理由"
                autosize
                :disabled="showdis"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="block">
          <p class="blockmsg">其他</p>
        </div>
        <el-row class="row">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="备注：" prop="other" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.other"
                placeholder=""
                autosize
                :disabled="showdis"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok('ruleForm')" v-show="!show" type="primary"
        >提 交</el-button
      >
      <el-button
        @click="
          show = !show;
          showdis = false;
        "
        v-show="show"
        type="primary"
        >修 改</el-button
      >
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";

export default {
  props: ["datadetail", "wherefrom"],
  data() {
    return {
      visible: false,
      files: "",
      ruleForm: {
        it_id: "",
        ex_id: "",
        reason: "",
        score_economics: 0,
        score_technology: 0,
        score_comprehensive: 0,
        reason_economics: "",
        reason_technology: "",
        reason_comprehensive: "",
        other: "",
      },
      show: true,
      showdis: false,
      rules: {
        reason_economics: [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
        reason_technology: [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
        reason_comprehensive: [
          { required: true, message: "请输入原因", trigger: "blur" },
        ],
      },
      labelPosition: "left",
      refresh: "0",
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
          this.$confirm("是否确定提交当前修改?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }).then(() => {
            this.ruleForm.examinetime = myFunctions.newDateToDatetime(
              new Date()
            );
            this.$api
              .updateDeatilExamineResult({
                ex_id: this.ruleForm.ex_id,
                it_id: this.ruleForm.it_id,
                examineid: this.ruleForm.examineid,
                examinetype: this.ruleForm.examinetype,
                score_technology: this.ruleForm.score_technology,
                reason_technology: this.ruleForm.reason_technology,
                score_economics: this.ruleForm.score_economics,
                reason_economics: this.ruleForm.reason_economics,
                score_comprehensive: this.ruleForm.score_comprehensive,
                reason_comprehensive: this.ruleForm.reason_comprehensive,
                score_system: this.ruleForm.score_system,
                examinetime: this.ruleForm.examinetime,
                other: this.ruleForm.other,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                    offset: 200,
                  });
                  this.refresh = "1";
                  this.$emit("Fresh", this.refresh);
                  this.$emit("getData", this.ruleForm);
                  this.visible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "修改失败，请稍后再试",
                    offset: 100,
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
    getDeatil(datas) {
      this.$api
        .getOneExpertOneItemDetailed({
          ex_id: datas.ex_id,
          it_id: datas.it_id,
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.ruleForm = data[0];
              this.showdis = true;
            }
          }
        });
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.show = true;
        this.showdis = false;
        this.refresh = "0";
        this.getDeatil(this.datadetail);
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