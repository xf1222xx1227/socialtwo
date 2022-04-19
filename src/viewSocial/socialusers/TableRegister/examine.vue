<template>
  <el-dialog
    width="40%"
    title="账号审核"
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
                label="2"
                :disabled="datadetail.badgeValue == ''"
                >不通过</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" v-show="ruleForm.pass == '2'">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="原因：" prop="reason" class="form_item slider">
              <el-input
                type="textarea"
                v-model="ruleForm.reason"
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
        pass: "1",
        reason: "",
      },
      rules: {
        pass: [{ required: true, message: "请选择审核结果", trigger: "blur" }],
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
          this.$api
            .updateSocialUserApply({
              userid: this.datadetail.userid,
              result: this.ruleForm.pass,
              reason: this.ruleForm.reason,
            })
            .then((res) => {
              if (res.status == 200) {
                if (this.ruleForm.pass == "1") {
                  //   加入社科成员表
                  this.$api
                    .addBiddingUsers({
                      userid: this.datadetail.userid,
                      username: this.datadetail.username,
                      password: this.datadetail.password,
                      address: this.datadetail.address,
                      phone: this.datadetail.phone,
                      b_id: sessionStorage.getItem("userid"),
                      register_time: myFunctions.newDateToDate(new Date()),
                      cancellation_time: "",
                      frozen: "",
                      frozen_reason: "",
                    })
                    .then((res) => {
                      if (res.status == 200) {
                        this.$message({
                          type: "success",
                          message: "审核成功",
                          offset: 150,
                        });
                        this.$emit("refresh", "1");
                        this.visible = false;
                      } else {
                        this.$message({
                          type: "error",
                          message: "审核失败，请稍候再试",
                          offset: 150,
                        });
                      }
                    });
                } else {
                  this.$message({
                    type: "success",
                    message: "审核成功",
                    offset: 150,
                  });
                  this.$emit("refresh", "1");
                  this.visible = false;
                }
              } else {
                this.$message({
                  type: "error",
                  message: "审核失败，请稍候再试",
                  offset: 150,
                });
              }
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