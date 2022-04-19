<template>
  <el-dialog
    width="40%"
    title="密码修改"
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
            <el-form-item label="原密码：" prop="password" class="form_item">
              <el-input
                v-model="ruleForm.password"
                type="text"
                clearable
                placeholder="请输入原密码"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" class="col">
            <el-form-item label="新密码：" prop="password1" class="form_item">
              <el-input
                v-model="ruleForm.password1"
                show-password
                clearable
                placeholder="请输入新密码"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" class="col">
            <el-form-item label="新密码：" prop="password2" class="form_item">
              <el-input
                v-model="ruleForm.password2"
                show-password
                clearable
                placeholder="请确定新密码"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <div
          v-show="
            this.ruleForm.password1 != '' &&
            this.ruleForm.password1 != this.ruleForm.password2
          "
          style="color: red; font-size: 10px; text-align: center"
        >
          两次密码不一致
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok('ruleForm')" type="primary">提 交</el-button>
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
      ruleForm: {
        password: "",
        password1: "",
        password2: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        password1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请确定新密码", trigger: "blur" },
        ],
      },

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
    Ok(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.ruleForm.password != this.datadetail.password) {
            this.$message({
              type: "error",
              message: "原密码错误",
              offset: 150,
            });
          } else {
            this.$api
              .updateSocialPassword({
                b_id: this.datadetail.b_id,
                password: this.ruleForm.password1,
              })
              .then((res) => {
                // console.log(res);
                if (res.status == 200) {
                  this.$message({
                    type: "success",
                    message: "修改成功",
                    offset: 150,
                  });
                  this.visible = false;
                } else {
                  this.$message({
                    type: "error",
                    message: "修改失败，请稍候再试",
                    offset: 150,
                  });
                }
              });
          }
        }
      });
    },
  },
  watch: {
    visible(newval, val) {},
  },
};
</script>

<style  lang="less" scoped>
</style>