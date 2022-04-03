<template>
  <el-dialog
    width="50%"
    title="项目初审"
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
        <!-- <div class="block">
          <p class="blockmsg">审核结果</p>
        </div> -->
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="是否通过：" prop="pass" class="form_item">
              <el-radio v-model="ruleForm.pass" label="1">通过</el-radio>
              <el-radio v-model="ruleForm.pass" label="2">淘汰</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="原因：" prop="reason" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.reason"
                placeholder="请输入审核结果理由"
                autosize
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 
        <div class="block">
          <p class="blockmsg">确定细审各项评审占比</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="7" class="col">
            <el-form-item
              label="经济评审："
              prop="rate_economics"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rate_economics"> </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="技术评审："
              prop="rate_technology"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rate_technology"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="综合评审："
              prop="rate_comprehensive"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rate_comprehensive"> </el-slider>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok('ruleForm')" type="primary">确 定</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
// import myFunctions from "../../../../myFunctions";
// import Invitation from "../../launch/invitation.vue";
// import DetailsFiles from "./detailsFiles.vue";
// import base from "../../../api/base";
export default {
  props: ["datadetail"],
  //   components: { Invitation, DetailsFiles },

  data() {
    return {
      visible: false,
      files: "",
      ruleForm: {
        it_id: "",
        ex_id: "",
        reason: "",
        pass: "1",
        // rate_economics: "30",
        // rate_technology: "60",
        // rate_comprehensive: "10",
      },
      rules: {
        reason: [{ required: true, message: "请输入原因", trigger: "blur" }],
        pass: [{ required: true, message: "请选择审核结果", trigger: "blur" }],
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
          this.$confirm("是否确定当前审核结果?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }).then(() => {
            this.ruleForm.time_examine = myFunctions.newDateToDatetime(
              new Date()
            );
            this.ruleForm.userid = sessionStorage.getItem("userid");
            // console.log(111, this.ruleForm);
            let data = this.ruleForm;
            this.$api
              .addFirstTrial({
                ex_id: data.ex_id,
                it_id: data.it_id,
                adopt: parseInt(data.pass),
                reason: data.reason,
                userid: data.userid,
                time_examine: data.time_examine,
              })
              .then((res) => {
                if (res.status == 200) {
                  this.$message({
                    type: "success",
                    message: "审核成功",
                    offset: 100,
                  });
                  this.refresh = "1";
                  this.$emit("Fresh", this.refresh);
                  // this.$emit("refresh", this.refresh);
                  this.visible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "提交失败，请稍后再试",
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
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        // console.log(this.datadetail);
        let data = this.datadetail;
        this.ruleForm.it_id = data.it_id;
        this.ruleForm.ex_id = data.ex_id;
        this.ruleForm.reason = "";
        // this.ruleForm.name = data.name;
        // this.ruleForm.rate_comprehensive = data.rate_comprehensive;
        // this.ruleForm.rate_economics = data.rate_economics;
        // this.ruleForm.rate_technology = data.rate_technology;
        // console.log(111, this.ruleForm);
      }
    },
  },
};
</script>

<style  lang="less" scoped>
#biddingEdit {
  //   height: 55vh;
  padding: 0px 20px;
  .block {
    width: 100%;
    border-bottom: 1px dashed #dcdcdc;
    .blockmsg {
      font-size: 18px;
      color: #9c8888;
    }
  }
}
</style>