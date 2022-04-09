<template>
  <div id="login">
    <div id="total">
      <div class="textbox p">社科项目揭榜挂帅系统</div>
      <el-input
        placeholder="账号"
        prefix-icon="el-icon-user"
        v-model="userid"
        clearable
        class="textbox"
        @keyup.enter.native="login"
      >
      </el-input>
      <el-input
        placeholder="密码"
        prefix-icon="el-icon-place"
        v-model="password"
        show-password
        class="textbox"
        @keyup.enter.native="login"
      ></el-input>
      <div class="textbox mybt">
        <el-radio v-model="radio" label="1">社科成员</el-radio>
        <!-- <el-radio v-model="radio" label="2">社科账户</el-radio> -->
        <el-radio v-model="radio" label="3">社科专家</el-radio>
        <el-radio v-model="radio" label="4">管理员</el-radio>
      </div>
      <div class="textbox mybt">
        <el-button
          type="success"
          @click="login"
          round
          class="bt"
          userid="userid"
          >登录</el-button
        >
        <el-button type="primary" @click="register" round class="bt"
          >注册</el-button
        >
      </div>
      <el-link type="warning" class="textbox forget">忘记密码?点我</el-link>
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      userid: "u00000",
      password: "1",
      userdata: [],
      isorno: 1,
      radio: "1",
      dataExpert: [],
    };
  },
  created() {
    this.$api.getAllExpertPersonal({}).then((res) => {
      if (res.status == 200) {
        if (res.data.status == 200) {
          this.dataExpert = res.data.result;
        }
      }
    });
    // 项目投标结束后转成初审状态
    // myFunctions.bidToFirst();
    let date = myFunctions.newDateToDatetime(new Date());
    this.$api.getAllBiddingItems({}).then((res) => {
      if (res.status == 200) {
        if (res.data.status == 200) {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            if (data[i].time_end < date) {
              this.$api
                .updateBiddindToPre({
                  it_id: data[i].it_id,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.status == 200) {
                    }
                  }
                });
            }
          }
        }
      }
    });
    // 初审结束进入细审
    // myFunctions.firstToDetail();
    this.$api.getFinishFirstTrial({}).then((res) => {
      if (res.status == 200) {
        if (res.data.status == 200) {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            if (data[i].finishtime != "" && data[i].finishtime < date) {
              this.$api
                .updateBiddindPreToDetail({
                  it_id: data[i].it_id,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.status == 200) {
                    }
                  }
                });
            }
          }
        }
      }
    });
    // 细审结束变成定标项目
    // myFunctions.detailToCalibration();
    this.$api.getFinishFirstTrial({}).then((res) => {
      if (res.status == 200) {
        if (res.data.status == 200) {
          let data = res.data.result;
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].detailfinishtime != "" &&
              data[i].detailfinishtime < date
            ) {
              this.$api
                .updateDetailToCalibration({
                  it_id: data[i].it_id,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.status == 200) {
                    }
                  }
                });
            }
          }
        }
      }
    });
  },
  methods: {
    login() {
      if (this.radio == "1") {
        this.$api.getbiduserList({}).then((res) => {
          if (res.status == 200) {
            this.userdata = [];
            this.isorno = 1;
            for (let i = 0; i < res.data.result.length; i++) {
              this.userdata.push(res.data.result[i]);
            }
            for (let i = 0; i < this.userdata.length; i++) {
              if (this.userdata[i].userid == this.userid) {
                let datauser = {};
                datauser.userid = this.userid;
                datauser.usertype = this.radio;
                datauser.usertypename = "社科下属";

                if (this.userdata[i].password != this.password) {
                  this.$message.error("密码出错了！");
                  this.isorno = 2;
                  break;
                } else {
                  // vuex传值；
                  // this.$store.commit("getUserid", this.userid);
                  // this.$store.commit("getUserType", "社科下属");
                  this.isorno = 2;
                  sessionStorage.setItem("userdata", datauser);
                  sessionStorage.setItem("userid", datauser.userid);
                  sessionStorage.setItem("usertype", datauser.usertype);
                  sessionStorage.setItem("usertypename", datauser.usertypename);
                  this.$router.push({ path: "/home" });
                }
              }
            }
            if (this.isorno == 1) {
              this.$message.error("账号有误！");
            }
          } else {
            this.$message.error("服务器出错！");
          }
        });
      } else if (this.radio == "2") {
        this.$api.getbidList({}).then((res) => {
          if (res.status == 200) {
            this.userdata = [];
            this.isorno = 1;
            for (let i = 0; i < res.data.result.length; i++) {
              this.userdata.push(res.data.result[i]);
            }
            for (let i = 0; i < this.userdata.length; i++) {
              if (this.userdata[i].userid == this.userid) {
                let datauser = {};
                datauser.userid = this.userid;
                datauser.usertype = this.radio;
                datauser.usertypename = "社科下属";
                if (this.userdata[i].password != this.password) {
                  this.$message.error("密码出错了！");
                  this.isorno = 2;
                  break;
                } else {
                  this.isorno = 2;
                  sessionStorage.setItem("userdata", datauser);
                  sessionStorage.setItem("userid", datauser.userid);
                  sessionStorage.setItem("usertype", datauser.usertype);
                  sessionStorage.setItem("usertypename", datauser.usertypename);
                  this.$router.push({ path: "/home" });
                }
              }
            }
            if (this.isorno == 1) {
              this.$message.error("账号有误！");
            }
          } else {
            this.$message.error("服务器出错！");
          }
        });
      } else if (this.radio == "3") {
        this.userdata = [];
        this.isorno = 1;
        this.userdata = this.dataExpert;
        for (let i = 0; i < this.userdata.length; i++) {
          if (this.userdata[i].ex_id == this.userid) {
            let datauser = {};
            datauser.userid = this.userid;
            datauser.usertype = this.radio;
            datauser.usertypename = "社科专家";
            if (this.userdata[i].password != this.password) {
              this.$message.error("密码出错了！");
              this.isorno = 2;
              break;
            } else {
              this.isorno = 3;
              sessionStorage.setItem("userdata", datauser);
              sessionStorage.setItem("userid", datauser.userid);
              sessionStorage.setItem("usertype", datauser.usertype);
              sessionStorage.setItem("usertypename", datauser.usertypename);
              this.$router.push({ path: "/homeex" });
            }
            break;
          }
        }
        if (this.isorno == 1) {
          this.$message.error("账号有误！");
        }
      }
    },
    register() {
      this.$router.push({ path: "/register" });
    },
  },

  watch: {
    userid(newval, val) {
      if (newval[0] == "u") {
        this.radio = "1";
      } else if (newval[0] == "b") {
        this.radio = "2";
      } else if (newval[0] == "S") {
        this.radio = "3";
      }
    },
  },
};
</script>

<style lang='less' scoped>
#login {
  width: 100%;
  background: #f5fffa;
  height: 100vh;
  display: flex;
  align-items: center; // 垂直居中
  #total {
    width: 60%;
    max-width: 600px;
    min-width: 350px;
    height: 330px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #dcdcdc;
    display: flex;
    flex-flow: column;
    .p {
      text-align: center;
      font-size: 18px;
      font-family: "Helvetica";
      color: #6495ed;
    }
    .textbox {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      width: 60%;
    }

    .mybt {
      display: flex;
      justify-content: space-around;
    }
    .forget {
      text-align: center;
    }
    .el-link.el-link--warning.is-underline:hover:after,
    .el-link.el-link--warning:after {
      border-color: #f5fffa;
      // 去除下划线
    }
  }
}
</style>