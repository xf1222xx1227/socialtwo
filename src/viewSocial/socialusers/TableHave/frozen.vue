<template>
  <el-dialog
    width="40%"
    title="账号冻结"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="total">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="form"
      >
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" class="col">
            <el-form-item label="冻结原因：" prop="reason" class="form_item">
              <el-input
                type="textarea"
                autosize
                placeholder="请输入冻结原因"
                v-model="reason"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok" type="primary">提 交</el-button>
      <el-button @click="visible = false">关 闭</el-button>
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
      ruleForm: {},
      reason: "",
      rules: {},
      dataExpert: {},

      labelPosition: "right",
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
    Ok() {
      this.$confirm(
        `是否确定对《${this.datadetail.name}》的账号进行冻结?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }
      ).then(() => {
        this.$api
          .updateSocialUserfrozen({
            userid: this.datadetail.userid,
            frozen: myFunctions.newDateToDatetime(new Date()),
            frozen_reason: this.reason,
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "冻结成功",
                offset: 150,
              });
              this.visible = false;
              this.$emit("refresh", "1");
            } else {
              this.$message({
                type: "error",
                message: "冻结失败，请稍候再试",
                offset: 150,
              });
            }
          });
      });
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        console.log(111, this.datadetail);
      }
    },
  },
};
</script>

<style  lang="less" scoped>
</style>