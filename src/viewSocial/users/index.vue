<template>
  <div class="total">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      :label-position="labelPosition"
      class="form"
    >
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="10" class="col">
          <el-form-item label="账号：" prop="b_id" class="form_item">
            <el-input v-model="ruleForm.b_id" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="名称：" prop="name" class="form_item">
            <el-input
              v-model="ruleForm.name"
              clearable
              placeholder=""
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="10" class="col">
          <el-form-item label="电话：" prop="phone" class="form_item">
            <el-input
              v-model="ruleForm.phone"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="地址：" prop="address" class="form_item">
            <el-input
              v-model="ruleForm.address"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>

      <el-row class="row" style="margin-top: 10px">
        <el-col :span="10" class="col">
          <el-form-item label="法人：" prop="representative" class="form_item">
            <el-input
              v-model="ruleForm.representative"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item
            label="法人电话："
            prop="representative_phone"
            class="form_item"
          >
            <el-input
              v-model="ruleForm.representative_phone"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>

      <!-- <el-row class="row" style="margin-top: 10px">
        <el-col :span="22" class="col">
          <el-form-item label="详细地址：" prop="address4" class="form_item">
            <el-input
              v-model="ruleForm.address4"
              type="text"
              clearable
              placeholder="请输入详细地址"
              class="input"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row> -->

      <div class="mybt">
        <el-button type="danger" @click="destory" round class="bt"
          >注销账户</el-button
        >
        <el-button type="primary" @click="changePd" round class="bt"
          >修改密码</el-button
        >
        <el-button
          type="primary"
          @click="changeInfo"
          round
          class="bt"
          v-show="disabled"
          >编辑</el-button
        >
        <el-button
          type="primary"
          @click="submit('ruleForm')"
          round
          class="bt"
          v-show="!disabled"
          >提交</el-button
        >
      </div>
    </el-form>
    <Password :datadetail="datadetail" ref="password" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Password from "./password.vue";
export default {
  components: { Password },
  data() {
    return {
      disabled: true,
      labelPosition: "right",
      ruleForm: {
        b_id: "",
        name: "",
        address: "",
        phone: "",
        representative: "",
        representative_phone: "",
        representative_address: "",
      },
      datadetail: {},
    };
  },
  created() {
    this.getuserinfo();
  },
  methods: {
    destory() {
      let h = this.$createElement;
      this.$msgbox({
        title: "警告",
        message: h("p", null, [
          h("span", { style: "color: red" }, `是否确定注销此账户`),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((action) => {
        this.$api
          .updateSocialCancellation({
            b_id: this.ruleForm.b_id,
            time: myFunctions.newDateToDatetime(new Date()),
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "注销成功",
                offset: 150,
              });
              this.$router.push({ path: "/" });
            } else {
              this.$message({
                type: "error",
                message: "注销失败，请稍候再试",
                offset: 150,
              });
            }
          });
      });
    },
    changeInfo() {
      this.disabled = false;
    },
    changePd() {
      this.$refs.password.visible = true;
    },
    submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.$api
            .updateSocialInfo({
              name: this.ruleForm.name,
              b_id: this.ruleForm.b_id,
              address: this.ruleForm.address,
              phone: this.ruleForm.phone,
              representative: this.ruleForm.representative,
              representative_phone: this.ruleForm.representative_phone,
              representative_address: this.ruleForm.representative_address,
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "修改成功",
                  offset: 150,
                });
                this.disabled = true;
              } else {
                this.$message({
                  type: "error",
                  message: "修改失败，请稍候再试",
                  offset: 150,
                });
              }
            });
        }
      });
    },
    getuserinfo() {
      this.$api
        .getOneBiddingInfo({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result[0];
              this.ruleForm = data;
              this.datadetail = data;
            }
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  display: flex;
  justify-content: center;
  // flex-flow: column;
  .form {
    width: 60%;
    // border: 1px solid red;
    height: auto;
    padding-top: 100px;
    .mybt {
      margin-top: 100px;
      display: flex;
      justify-content: space-around;
    }
  }

  // border: 1px solid red;
}
</style>