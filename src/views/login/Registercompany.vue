<template>
  <div id="register">
    <div id="total">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="个人注册" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="130px"
            label-position="right"
            class="form"
          >
            <el-form-item label="所属单位分类：" prop="companytype">
              <el-select
                v-model="ruleForm.companytype"
                class="input"
                style="width: 100%"
                @change="changetype(ruleForm.companytype)"
                clearable
                filterable
              >
                <el-option
                  v-for="item in companytypeoption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属单位：" prop="company">
              <el-select
                v-model="ruleForm.company"
                class="input"
                style="width: 100%"
                clearable
                filterable
              >
                <el-option
                  v-for="item in companyoption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名：" prop="username">
                  <el-input
                    v-model="ruleForm.username"
                    type="text"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：" prop="gender">
                  <el-radio v-model="ruleForm.gender" :label="0">男</el-radio>
                  <el-radio v-model="ruleForm.gender" :label="1">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="出生日期：" prop="birthdate">
                  <el-date-picker
                    v-model="ruleForm.birthdate"
                    type="date"
                    placeholder="选择日期"
                    clearable
                    style="width: 100%"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电话：" prop="phone">
                  <el-input
                    v-model="ruleForm.phone"
                    type="text"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证号：" prop="card">
                  <el-input
                    v-model="ruleForm.card"
                    type="text"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱：" prop="email">
                  <el-input
                    v-model="ruleForm.email"
                    type="text"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="密码：" prop="password1">
                  <el-input
                    v-model="ruleForm.password1"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="确定密码：" prop="password2">
                  <el-input
                    v-model="ruleForm.password2"
                    clearable
                    show-password
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div
              v-show="
                this.ruleForm.password1 != '' &&
                this.ruleForm.password2 != '' &&
                this.ruleForm.password1 != this.ruleForm.password2
              "
              style="color: red; font-size: 10px; text-align: center"
            >
              两次密码不一致
            </div>
          </el-form>
          <div class="mybt">
            <el-button type="primary" @click="backLogin" round class="bt"
              >返回登录</el-button
            >
            <el-button
              type="success"
              @click="register('ruleForm')"
              round
              class="bt"
              >注册</el-button
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="单位注册" name="second">
          <!-- <Registercompany /> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import myFunctions from "../../myFunctions";
import RegisterExpert from "./RegisterExpert.vue";
export default {
  components: {
    RegisterExpert,
  },
  data() {
    return {
      activeName: "first",

      // 表格
      ruleForm: {
        companytype: "",
        company: "",
        username: "",
        gender: 0,

        birthdate: "",
        phone: "17367102513",
        card: "",
        email: "",
        password2: "",
        password1: "",
      },
      companytypeoption: [],
      companyoption: [],

      userid: "",

      userdata: [],
      rules: {
        companytype: [
          { required: true, message: "请选择所属单位类别", trigger: "change" },
        ],
        company: [
          { required: true, message: "请选择所属单位", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
        ],
        birthdate: [
          { required: true, message: "请选择出生日期", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        card: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    backLogin() {
      this.$router.push({ path: "/" });
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.ruleForm.phone.length == 11 &&
            /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|)+\d{8})$/.test(
              this.ruleForm.phone
            )
          ) {
            this.$api.getUserRegister({}).then((res) => {
              let isorno = 0;
              if (res.data.status == 200) {
                let data = res.data.result;
                for (let i = 0; i < data.length; i++) {
                  if (
                    data[i].username == this.ruleForm.username &&
                    data[i].company == this.ruleForm.company &&
                    data[i].password == this.ruleForm.password &&
                    data[i].phone == this.ruleForm.phone
                  ) {
                    this.$alert("账号已在审核，请勿重复申请", "提示", {
                      confirmButtonText: "确定",
                    });
                    isorno = 1;
                    break;
                  }
                }
                if (isorno == 0) {
                  let data1 = data[data.length - 1].ex_id;
                  this.userid = myFunctions.getNewId(data1);
                  this.addregister(this.userid);
                }
              } else {
                this.$api.getUsers({}).then((res) => {
                  if (res.status == 200) {
                    let data = res.data.result;
                    let data1 = data[data.length - 1].ex_id;
                    this.userid = myFunctions.getNewId(data1);
                    this.addregister(this.userid);
                  }
                });
              }
            });
          } else {
            this.$message.error("电话格式不正确");
          }
        }
      });
    },
    tabHandleClick(tab, event) {
      // console.log(tab, event);
    },
    getcompanytype() {
      this.$api.getCompanyType({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.companytypeoption = data;
        }
      });
    },
    getcompany(val) {
      this.companyoption = [];
      this.$api
        .getCompany({
          pid: val,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            this.companyoption = data;
          }
        });
    },
    addregister(val) {
      let birthdate = myFunctions.newDateToDate(this.ruleForm.birthdate);
      let register_time = myFunctions.newDateToDate();
      this.$api
        .addUserRegister({
          ex_id: val,
          company: this.ruleForm.company,
          name: this.ruleForm.username,
          gender: this.ruleForm.gender,
          birthdate: birthdate,
          phone: this.ruleForm.phone,
          card: this.ruleForm.card,
          email: this.ruleForm.email,
          password: this.ruleForm.password1,
          register_time: register_time,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "info",
              message: "提交成功，请等待单位管理员审核",
              offset: 150,
            });
          } else {
            this.$message({
              type: "error",
              message: "提交失败，请稍后再试",
              offset: 150,
            });
          }
        });
    },
    changetype(val) {
      this.ruleForm.company = "";
      this.getcompany(val);
    },
  },
  created() {
    this.getcompanytype();
  },
  watch: {
    // username(newval, old) {
    //   this.registerBtDisabled = false;
    // },
    // password1(newval, old) {
    //   this.registerBtDisabled = false;
    // },
    // password2(newval, old) {
    //   this.registerBtDisabled = false;
    // },
    // phone(newval, old) {
    //   this.registerBtDisabled = false;
    // },
    // bidding(newval, old) {
    //   this.registerBtDisabled = false;
    // },
  },
};
</script>

<style lang='less' scoped>
#register {
  width: 100%;
  background: #f5fffa;
  height: 100vh;
  display: flex;
  align-items: center; // 垂直居中
  // justify-content: center;

  #total {
    width: 60%;
    max-width: 600px;
    min-width: 350px;
    height: 550px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    border: 1px solid #dcdcdc;
    .textbox {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
    }
    .mybt {
      display: flex;
      justify-content: space-around;
    }
    .form {
      margin-top: 20px;
    }
  }
}
</style>