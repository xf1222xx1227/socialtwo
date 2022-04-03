<template>
  <div id="register">
    <div id="total">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
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
            type="text"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <div class="textbox">
          <div class="pinput">
            <p class="p">密码：</p>
            <el-input
              v-model="ruleForm.password1"
              type="text"
              clearable
              class="input"
            ></el-input>
          </div>
        </div> -->
        <!-- <div class="textbox">
          <div class="pinput">
            <p class="p">确定密码：</p>
            <el-input
              v-model="ruleForm.password2"
              type="text"
              clearable
              class="input"
            ></el-input>
          </div>
        </div> -->
        <el-form-item label="确定密码：" prop="password2">
          <el-input
            v-model="ruleForm.password2"
            type="text"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="家庭地址：" prop="address">
          <el-select v-model="ruleForm.address1">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="select"
            >
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.address2">
            <el-option
              v-for="item1 in options2"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
              class="select"
            >
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.address3">
            <el-option
              v-for="item2 in options3"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value"
              class="select"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="textbox">
          <div class="pinput">
            <p class="p">家庭地址：</p>
            <div class="input">
              <el-select v-model="ruleForm.address1">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="select"
                >
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.address2">
                <el-option
                  v-for="item1 in options2"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                  class="select"
                >
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.address3">
                <el-option
                  v-for="item2 in options3"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                  class="select"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <el-form-item label="电话：" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            type="text"
            clearable
            class="input"
          ></el-input>
        </el-form-item>
        <!-- <div class="textbox">
          <div class="pinput">
            <p class="p">电话：</p>
            <el-input
              v-model="ruleForm.phone"
              type="text"
              clearable
              class="input"
            ></el-input>
          </div>
        </div> -->
        <el-form-item label="所属社科：" prop="phone">
          <el-select v-model="ruleForm.bidding" class="input">
            <el-option
              v-for="item3 in bidoptions"
              :key="item3.value"
              :label="item3.label"
              :value="item3.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <div class="textbox">
          <div class="pinput">
            <p class="p">所属社科：</p>
            <el-select v-model="ruleForm.bidding" class="input">
              <el-option
                v-for="item3 in bidoptions"
                :key="item3.value"
                :label="item3.label"
                :value="item3.value"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->

        <div class="textbox mybt">
          <el-button type="primary" @click="backLogin" round class="bt"
            >返回登录</el-button
          >
          <el-button
            type="success"
            @click="register"
            round
            class="bt"
            :disabled="registerBtDisabled"
            >注册</el-button
          >
        </div>
        <!-- <div id="test"></div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      registerBtDisabled: false,
      rules: {
        username: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
    };
  },
  methods: {
    backLogin() {
      this.$router.push({ path: "/" });
    },
    register() {
      if (this.ruleForm.username == "") {
        // this.$message("姓名不能为空");
        console.log("姓名不能为空");
      } else {
        if (this.ruleForm.password1 == "" || this.ruleForm.password2 == "") {
          console.log("密码不能为空");
        } else {
          if (this.ruleForm.phone == "") {
            console.log("电话不能为空");
          } else {
            if (this.ruleForm.bidding == "") {
              console.log("所属社科不能为空");
            } else {
              this.$api.biddingUserApply({}).then((res) => {
                console.log(res.data);
                if (res.data.status == 200) {
                  let userdata = res.data.result;
                  let isorno = 0;
                  let address =
                    this.ruleForm.address1 +
                    this.ruleForm.address2 +
                    this.ruleForm.address3;
                  // console.log(111, userdata[0]);
                  // console.log(this.ruleForm.username, address, this.ruleForm.bidding, this.ruleForm.phone);
                  for (let i = 0; i < userdata.length; i++) {
                    if (
                      userdata[i].username == this.ruleForm.username &&
                      userdata[i].address == address &&
                      userdata[i].b_id == this.ruleForm.bidding &&
                      userdata[i].phone == this.ruleForm.phone
                    ) {
                      console.log("账号已在审核，请勿重复申请");
                      isorno = 1;
                      break;
                    }
                  }
                  if (isorno == 0) {
                    this.user = res.data.result[
                      res.data.result.length - 1
                    ].userid.replace(/[^0-9]/gi, "");
                    this.user = parseInt(this.user) + 1;
                    this.user = this.user + "";
                    let len = 6 - this.user.length - 1;
                    let user1 = "u";
                    if (len > 0) {
                      for (let i = 0; i < len; i++) {
                        user1 += "0";
                      }
                    }
                    user1 += this.user;
                    this.userid = user1;
                    this.$api
                      .addBiddingUserApply({
                        userid: this.userid,
                        username: this.ruleForm.username,
                        password: this.ruleForm.password1,
                        address:
                          this.ruleForm.address1 +
                          this.ruleForm.address2 +
                          this.ruleForm.address3,
                        phone: this.ruleForm.phone,
                        b_id: this.ruleForm.bidding,
                      })
                      .then((res) => {
                        this.registerBtDisabled = true;
                        console.log("账号已在审核，请等待审核同通过");
                      });
                  }
                } else if (res.data.status == 500) {
                  this.$api.getbiduserList({}).then((res1) => {
                    this.user = res1.data.result[
                      res1.data.result.length - 1
                    ].userid.replace(/[^0-9]/gi, "");
                    this.user = parseInt(this.user) + 1;
                    this.user = this.user + "";
                    let len = 6 - this.user.length - 1;
                    let user1 = "u";
                    if (len > 0) {
                      for (let i = 0; i < len; i++) {
                        user1 += "0";
                      }
                    }
                    user1 += this.user;
                    this.userid = user1;
                    this.$api
                      .addBiddingUserApply({
                        userid: this.userid,
                        username: this.ruleForm.username,
                        password: this.ruleForm.password1,
                        address:
                          this.ruleForm.address1 +
                          this.ruleForm.address2 +
                          this.ruleForm.address3,
                        phone: this.ruleForm.phone,
                        b_id: this.ruleForm.bidding,
                      })
                      .then((res) => {
                        this.registerBtDisabled = true;
                        console.log("账号已在审核，请等待审核同通过");
                      });
                  });
                }
              });
            }
          }
        }
      }

      // 查看编辑前数据;
      // this.$api.getbiduserList({}).then((res) => {
      //   console.log(222, res.data);
      // });
      // 删除测试
      // this.$api
      //   .deleteTest({
      //     userid: "u00003",
      //   })
      //   .then((res) => {});
      // 添加测试;
      // this.$api
      //   .addTest({
      //     userid: "u00004",
      //     username: "擦擦",
      //     password: "1",
      //     address: "浙江省杭州市余杭区",
      //     phone: "12343245345",
      //     b_id: "b12345678",
      //   })
      //   .then((res) => {});
      // 修改测试
      // this.$api
      //   .updateTest({
      //     userid: "u00003",
      //     username: "打发打发",
      //     password: "0",
      //     address: "浙江省杭州市余杭区",
      //     phone: "12343245345",
      //     b_id: "b12345678",
      //   })
      //   .then((res) => {});
      // 查看编辑后数据;
      // this.$api.getbiduserList({}).then((res) => {
      //   console.log(111, res.data);
      // });
    },
  },
  created() {
    this.$api.getprovinceList({}).then((res) => {
      let data = res.data.result;
      for (let i = 0; i < data.length; i++) {
        let data1 = {};
        data1.value = data[i].Name;
        data1.label = data[i].Name;
        data1.id = data[i].Id;
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
          data1.value = data[i].Name;
          data1.label = data[i].Name;
          data1.id = data[i].Id;
          this.options2.push(data1);
          // console.log("zrf", this.options2);
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
          data1.value = data[i].Name;
          data1.label = data[i].Name;
          data1.id = data[i].Id;
          this.options3.push(data1);
        }
      });
    this.$api.getbidList({}).then((res) => {
      let data = res.data.result;
      //   console.log(1212, data);
      for (let i = 0; i < data.length; i++) {
        let data1 = {};
        data1.value = data[i].name;
        data1.label = data[i].name;
        data1.id = data[i].Id;
        this.bidoptions.push(data1);
      }
    });
  },
  watch: {
    address1(newval, val) {
      this.registerBtDisabled = false;
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].value == newval) {
          this.address1id = this.options1[i].id;
          break;
        }
      }
      this.options2 = [];
      this.address2 = "";
      this.$api
        .getcityList({
          pid: this.address1id,
        })
        .then((res) => {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            let data1 = {};
            data1.value = data[i].Name;
            data1.label = data[i].Name;
            data1.id = data[i].Id;
            this.options2.push(data1);
          }
        });
    },
    address2(newval, val) {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].value == newval) {
          this.address2id = this.options2[i].id;
          break;
        }
      }
      // console.log(2, newval, val, this.address2id);
      this.options3 = [];
      this.address3 = "";
      this.$api
        .getcityList({
          pid: this.address2id,
        })
        .then((res) => {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            let data1 = {};
            data1.value = data[i].Name;
            data1.label = data[i].Name;
            data1.id = data[i].Id;
            this.options3.push(data1);
          }
        });
    },
    username(newval, old) {
      this.registerBtDisabled = false;
    },
    password1(newval, old) {
      this.registerBtDisabled = false;
    },
    password2(newval, old) {
      this.registerBtDisabled = false;
    },
    phone(newval, old) {
      this.registerBtDisabled = false;
    },
    bidding(newval, old) {
      this.registerBtDisabled = false;
    },
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
  #total {
    width: 60%;
    max-width: 600px;
    min-width: 350px;
    height: 440px;
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
      width: 70%;
    }

    .mybt {
      display: flex;
      justify-content: space-around;
    }
    .pinput {
      display: flex;
      flex-flow: row;
      align-items: center;
      .p {
        flex: 1;
      }
      .input {
        flex: 3;
        display: flex;
        flex-flow: row;
        .select {
          flex: 1;
        }
      }
    }
  }
}
</style>