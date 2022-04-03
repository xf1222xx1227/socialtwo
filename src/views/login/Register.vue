<template>
  <div id="register">
    <div id="total">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane label="社科成员" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="left"
            class="form"
          >
            <el-form-item label="姓名：" prop="username">
              <el-input
                v-model="ruleForm.username"
                type="text"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password1">
              <el-input
                v-model="ruleForm.password1"
                clearable
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="确定密码：" prop="password2">
              <el-input
                v-model="ruleForm.password2"
                clearable
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="家庭地址：" prop="address3">
              <el-select
                v-model="ruleForm.address1"
                @change="addressCh1()"
                style="width: 33.3%"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="ruleForm.address2"
                @change="addressCh2()"
                style="width: 33.3%"
              >
                <el-option
                  v-for="item1 in options2"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="ruleForm.address3"
                @change="addressCh3()"
                style="width: 33.3%"
              >
                <el-option
                  v-for="item2 in options3"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                >
                </el-option>
              </el-select>
              <el-input
                v-model="ruleForm.address4"
                type="text"
                clearable
                placeholder="请输入详细地址"
                class="input"
              ></el-input>
            </el-form-item>

            <el-form-item label="电话：" prop="phone">
              <el-input
                v-model="ruleForm.phone"
                type="text"
                clearable
                class="input"
                placeholder="请输入11位电话号码"
              ></el-input>
            </el-form-item>

            <el-form-item label="所属社科：" prop="phone">
              <el-select
                v-model="ruleForm.bidding"
                class="input"
                style="width: 100%"
              >
                <el-option
                  v-for="item3 in bidoptions"
                  :key="item3.value"
                  :label="item3.label"
                  :value="item3.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
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
        <el-tab-pane label="社科专家" name="second">
          <RegisterExpert />
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="mybt">
        <el-button type="primary" @click="backLogin" round class="bt"
          >返回登录</el-button
        >
        <el-button type="success" @click="register('ruleForm')" round class="bt"
          >注册</el-button
        >
      </div> -->
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
      // tab
      activeName: "first",

      // 表格
      ruleForm: {
        password2: "",
        password1: "",
        username: "",
        address1: "浙江省",
        address1id: "330000",
        address2: "杭州市",
        address2id: "330100",
        address3: "市辖区",
        address3id: "330101",
        address4: "",
        phone: "",
        bidding: "",
      },
      user: "",
      userid: "",
      address: "",
      options1: [],
      options2: [],
      options3: [],
      bidoptions: [],
      userdata: [],
      labelPosition: "left",
      rules: {
        username: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
        ],
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        bidding: [
          { required: true, message: "请选择所属社科联", trigger: "change" },
        ],
        address3: [
          { required: true, message: "请选择家庭地址", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    backLogin() {
      this.$router.push({ path: "/" });
    },
    register(formName) {
      if (this.ruleForm.password2 != this.ruleForm.password1) {
        this.$message.error("密码不一致,请重新输入");
      } else {
        if (
          this.ruleForm.phone.length == 11 &&
          /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|)+\d{8})$/.test(
            this.ruleForm.phone
          )
        ) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$api.biddingUserApply({}).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                  let userdata = res.data.result;
                  let isorno = 0;
                  for (let i = 0; i < userdata.length; i++) {
                    if (
                      userdata[i].username == this.ruleForm.username &&
                      userdata[i].b_id == this.ruleForm.bidding &&
                      userdata[i].phone == this.ruleForm.phone
                    ) {
                      this.$alert("账号已在审核，请勿重复申请", "提示", {
                        confirmButtonText: "确定",
                      });
                      isorno = 1;
                      break;
                    }
                  }
                  if (isorno == 0) {
                    let data1 =
                      res.data.result[res.data.result.length - 1].userid;
                    this.userid = myFunctions.getNewId(data1);

                    this.$api
                      .addBiddingUserApply({
                        userid: this.userid,
                        username: this.ruleForm.username,
                        password: this.ruleForm.password1,
                        address:
                          this.ruleForm.address1 +
                          this.ruleForm.address2 +
                          this.ruleForm.address3 +
                          this.ruleForm.address4,
                        phone: this.ruleForm.phone,
                        b_id: this.ruleForm.bidding,
                      })
                      .then((res) => {
                        this.$alert("申请已提交，请等待审核同通过", "提示", {
                          confirmButtonText: "确定",
                        });
                      });
                  }
                } else if (res.data.status == 500) {
                  this.$api.getbiduserList({}).then((res1) => {
                    // this.user = res1.data.result[
                    //   res1.data.result.length - 1
                    // ].userid.replace(/[^0-9]/gi, "");

                    // this.user = parseInt(this.user) + 1;
                    // this.user = this.user + "";
                    // let len = 6 - this.user.length - 1;
                    // let user1 = "u";
                    // if (len > 0) {
                    //   for (let i = 0; i < len; i++) {
                    //     user1 += "0";
                    //   }
                    // }
                    // user1 += this.user;
                    // this.userid = user1;
                    this.userid = myFunctions.getNewId(
                      res1.data.result[res1.data.result.length - 1].userid
                    );

                    this.$api
                      .addBiddingUserApply({
                        userid: this.userid,
                        username: this.ruleForm.username,
                        password: this.ruleForm.password1,
                        address:
                          this.ruleForm.address1 +
                          this.ruleForm.address2 +
                          this.ruleForm.address3 +
                          this.ruleForm.address4,
                        phone: this.ruleForm.phone,
                        b_id: this.ruleForm.bidding,
                      })
                      .then((res) => {
                        this.$alert("申请已提交，请等待审核同通过", "提示", {
                          confirmButtonText: "确定",
                        });
                      });
                  });
                }
              });
            } else {
              this.$message.error("输入有错误");
              return false;
            }
          });
        } else {
          this.$message.error("电话格式不正确");
        }
      }
    },
    addressCh1() {
      // this.registerBtDisabled = false;
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].value == this.ruleForm.address1) {
          this.ruleForm.address1id = this.options1[i].id;
          break;
        }
      }
      this.options2 = [];
      this.ruleForm.address2 = "";
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.$api
        .getcityList({
          pid: this.ruleForm.address1id,
        })
        .then((res) => {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            let data1 = {};
            data1.value = data[i].name;
            data1.label = data[i].name;
            data1.id = data[i].id;
            this.options2.push(data1);
          }
        });
    },
    addressCh2() {
      // this.registerBtDisabled = false;
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].value == this.ruleForm.address2) {
          this.ruleForm.address2id = this.options2[i].id;
          break;
        }
      }
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.$api
        .getcityList({
          pid: this.ruleForm.address2id,
        })
        .then((res) => {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            let data1 = {};
            data1.value = data[i].name;
            data1.label = data[i].name;
            data1.id = data[i].id;
            this.options3.push(data1);
          }
        });
    },
    addressCh3() {
      this.registerBtDisabled = false;
    },
    tabHandleClick(tab, event) {
      // console.log(tab, event);
    },
  },
  created() {
    this.$api.getprovinceList({}).then((res) => {
      let data = res.data.result;
      for (let i = 0; i < data.length; i++) {
        let data1 = {};
        data1.value = data[i].name;
        data1.label = data[i].name;
        data1.id = data[i].id;
        this.options1.push(data1);
      }
    });
    this.$api
      .getcityList({
        pid: this.ruleForm.address1id,
      })
      .then((res) => {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          let data1 = {};
          data1.value = data[i].name;
          data1.label = data[i].name;
          data1.id = data[i].id;
          this.options2.push(data1);
        }
      });
    this.$api
      .getcountyList({
        pid: this.ruleForm.address2id,
      })
      .then((res) => {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          let data1 = {};
          data1.value = data[i].name;
          data1.label = data[i].name;
          data1.id = data[i].id;
          this.options3.push(data1);
        }
      });

    this.$api.getbidList({}).then((res) => {
      let data = res.data.result;
      for (let i = 0; i < data.length; i++) {
        let data1 = {};
        data1.value = data[i].name;
        data1.label = data[i].name;
        data1.id = data[i].id;
        this.bidoptions.push(data1);
      }
    });
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