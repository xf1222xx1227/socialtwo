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
        <el-radio v-model="radio" label="1">浙江省账户</el-radio>
        <el-radio v-model="radio" label="2">单位</el-radio>
        <el-radio v-model="radio" label="3">用户</el-radio>
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
      // userid: "u00000",
      // radio: "1",

      // userid: "b00000000",
      // radio: "2",

      userid: "S00000",
      radio: "3",

      // userid: "C00000",
      // radio: "1",

      // userid: "A00",
      // radio: "4",

      password: "1",
      userdata: [],
      isorno: 1,
      dataUsers: [],
    };
  },
  created() {
    this.$api.getUsers({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        this.dataUsers = data;
      }
    });
  },
  methods: {
    login() {
      // 社科
      if (this.radio == "1") {
        this.$api.getProvinceSocial({}).then((res) => {
          if (res.status == 200) {
            this.userdata = [];
            this.isorno = 1;
            // console.log(res);
            for (let i = 0; i < res.data.result.length; i++) {
              this.userdata.push(res.data.result[i]);
            }
            for (let i = 0; i < this.userdata.length; i++) {
              if (this.userdata[i].id == this.userid) {
                let datauser = {};
                datauser.userid = this.userid;
                datauser.usertype = this.radio;
                datauser.usertypename = "省社科";

                if (this.userdata[i].password != this.password) {
                  this.$message.error("密码出错了！");
                  this.isorno = 2;
                  break;
                } else {
                  this.isorno = 3;
                  sessionStorage.setItem("userdata", datauser);
                  sessionStorage.setItem("userid", datauser.userid);
                  // console.log(2222, datauser.userid);
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
      }
      // 社科
      else if (this.radio == "2") {
        this.$api.getbidList({}).then((res) => {
          if (res.status == 200) {
            this.userdata = [];
            this.isorno = 1;
            this.userdata = res.data.result;
            for (let i = 0; i < this.userdata.length; i++) {
              if (this.userdata[i].b_id == this.userid) {
                let datauser = {};
                datauser.userid = this.userid;
                datauser.usertype = this.radio;
                datauser.usertypename = "社科";
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
                  this.$router.push({ path: "/socialuserso" });
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
      }
      // 用户
      else if (this.radio == "3") {
        this.userdata = [];
        this.isorno = 1;
        this.userdata = this.dataUsers;
        for (let i = 0; i < this.userdata.length; i++) {
          if (this.userdata[i].ex_id == this.userid) {
            let datauser = {};
            datauser.userid = this.userid;
            datauser.usertype = this.radio;
            datauser.usertypename = "用户";
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
      // 管理员
      else if (this.radio == "4") {
        this.$api.geAdmins({}).then((res) => {
          if (res.status == 200) {
            this.userdata = [];
            this.isorno = 1;
            this.userdata = res.data.result;
            for (let i = 0; i < this.userdata.length; i++) {
              if (this.userdata[i].id == this.userid) {
                let datauser = {};
                datauser.userid = this.userid;
                datauser.usertype = this.radio;
                datauser.usertypename = "管理员";
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
                  this.$router.push({ path: "/expertad" });
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
      }
    },
    register() {
      // this.$router.push({ path: "/register" });
      this.$router.push({ path: "/registerco" });
    },
  },

  watch: {
    userid(newval, val) {
      // if (newval[0] == "u") {
      //   this.radio = "1";
      // } else if (newval[0] == "b") {
      //   this.radio = "2";
      // } else if (newval[0] == "S") {
      //   this.radio = "3";
      // } else if (newval[0] == "A") {
      //   this.radio = "4";
      // }
      if (newval == "C00000") {
        this.radio = "1";
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