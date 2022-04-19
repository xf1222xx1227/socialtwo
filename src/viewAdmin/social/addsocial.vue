<template>
  <el-dialog
    width="70%"
    title="社科联添加"
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
        label-width="110px"
        :label-position="labelPosition"
        class="form"
      >
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="账号：" prop="b_id" class="form_item">
              <el-input
                v-model="ruleForm.b_id"
                type="text"
                clearable
                class="input"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="col">
            <el-form-item label="账户名：" prop="name" class="form_item">
              <el-input
                v-model="ruleForm.name"
                type="text"
                clearable
                placeholder="请输入账户名称"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="密码：" prop="password1" class="form_item">
              <el-input
                v-model="ruleForm.password1"
                type="text"
                clearable
                placeholder="请输入密码"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="col">
            <!-- <el-form-item label="确认密码：" prop="password2" class="form_item">
              <el-input
                v-model="ruleForm.password2"
                type="text"
                clearable
                class="input"
                placeholder="请确定密码"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="社科电话：" prop="phone" class="form_item">
              <el-input
                v-model="ruleForm.phone"
                type="text"
                clearable
                class="input"
                placeholder="请确定社科联系电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <!-- <div
          v-show="
            this.ruleForm.password1 != '' &&
            this.ruleForm.password2 != '' &&
            this.ruleForm.password1 != this.ruleForm.password2
          "
          style="color: red; font-size: 10px; text-align: center"
        >
          两次密码不一致
        </div> -->
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item
              label="使用人："
              prop="representative"
              class="form_item"
            >
              <el-input
                v-model="ruleForm.representative"
                type="text"
                clearable
                placeholder="请输入使用账号人姓名"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="col">
            <el-form-item
              label="使用人电话："
              prop="representative_phone"
              class="form_item"
            >
              <el-input
                v-model="ruleForm.representative_phone"
                type="text"
                clearable
                placeholder="请输入使用账号人电话"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item
              label="使用人住址："
              prop="representative_address"
              class="form_item"
            >
              <el-input
                v-model="ruleForm.representative_address"
                type="text"
                clearable
                placeholder="请输入使用人住址"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1" class="col">
            <el-form-item label="社科地址：" prop="address" class="form_item">
              <el-input
                v-model="ruleForm.address"
                type="text"
                clearable
                placeholder="请输入社科联地址"
                class="input"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok('ruleForm')" type="primary">添 加</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";

export default {
  props: ["dataitid"],
  data() {
    return {
      visible: false,
      files: "",
      ruleForm: {
        b_id: "",
        name: "",
        password1: "",
        // password2: "",
        phone: "",
        address: "",
        representative: "",
        representative_phone: "",
        representative_address: "",
      },
      rules: {
        name: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // password2: [{ required: true, message: "请确定密码", trigger: "blur" }],
        phone: [
          { required: true, message: "请确定社科联系电话", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入社科联地址", trigger: "blur" },
        ],
        representative: [
          { required: true, message: "请输入使用账号人姓名", trigger: "blur" },
        ],
        representative_phone: [
          { required: true, message: "请输入使用账号人电话", trigger: "blur" },
        ],
        representative_address: [
          { required: true, message: "请输入使用账号人地址", trigger: "blur" },
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
          if (
            this.ruleForm.phone.length == 11 &&
            /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|)+\d{8})$/.test(
              this.ruleForm.phone
            )
          ) {
            if (
              this.ruleForm.representative_phone.length == 11 &&
              /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|)+\d{8})$/.test(
                this.ruleForm.representative_phone
              )
            ) {
              //   console.log(11111);
              this.$api
                .addSocial({
                  b_id: this.ruleForm.b_id,
                  name: this.ruleForm.name,
                  password: this.ruleForm.password1,
                  address: this.ruleForm.address,
                  phone: this.ruleForm.phone,
                  representative: this.ruleForm.representative,
                  representative_phone: this.ruleForm.representative_phone,
                  representative_address: this.ruleForm.representative_address,
                  register_time: myFunctions.newDateToDatetime(new Date()),
                })
                .then((res) => {
                  //   console.log(111, res);
                  if (res.status == 200) {
                    this.$message({
                      type: "success",
                      message: "添加成功",
                      offset: 150,
                    });
                    this.$emit("refresh", "1");
                    this.visible = false;
                  } else {
                    this.$message({
                      type: "error",
                      message: "添加失败，请稍候再试",
                      offset: 150,
                    });
                  }
                });
            } else {
              this.$message({
                type: "error",
                message: "社科联账号使用人电话格式有误，请修改",
                offset: 150,
              });
            }
          } else {
            this.$message({
              type: "error",
              message: "社科联电话格式有误，请修改",
              offset: 150,
            });
          }
        }
      });
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.ruleForm.b_id = this.dataitid;
      }
    },
  },
};
</script>

<style  lang="less" scoped>
</style>