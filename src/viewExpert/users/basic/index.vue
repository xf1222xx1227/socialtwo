<template>
  <div class="total">
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="130px"
      :label-position="labelPosition"
      class="form"
    >
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="账号：" prop="ex_id" class="form_item">
            <el-input v-model="ruleForm.ex_id" clearable disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="姓名：" prop="name" class="form_item">
            <el-input
              v-model="ruleForm.name"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="出生日期：" prop="birthdate" class="form_item">
            <el-date-picker
              v-model="ruleForm.birthdate"
              clearable
              :disabled="disabled"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="性别：" prop="gender">
            <el-radio v-model="ruleForm.gender" :label="0" :disabled="disabled"
              >男</el-radio
            >
            <el-radio v-model="ruleForm.gender" :label="1" :disabled="disabled"
              >女</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="民族：" prop="nation" class="form_item">
            <el-select
              v-model="ruleForm.nation"
              style="width: 100%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionsNation"
                :key="item.id"
                :label="item.nation"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="身份证号：" prop="card">
            <el-input
              v-model="ruleForm.card"
              clearable
              placeholder=""
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="电话：" prop="phone" class="form_item">
            <el-input
              v-model="ruleForm.phone"
              clearable
              placeholder="请输入11位数号码"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="邮箱：" prop="email" class="form_item">
            <el-input
              v-model="ruleForm.email"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="办公电话：" prop="workphone" class="form_item">
            <el-input
              v-model="ruleForm.workphone"
              clearable
              placeholder=""
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="工作单位：" prop="workcompany" class="form_item">
            <el-input
              v-model="ruleForm.workcompany"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="研究专长：" prop="research" class="form_item">
            <el-select
              v-model="ruleForm.research"
              style="width: 100%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionsResearch"
                :key="item.re_id"
                :label="item.name"
                :value="item.re_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="荣誉称号：" prop="honor" class="form_item">
            <el-cascader
              v-model="ruleForm.honor"
              :options="optionsHonor"
              :props="{ expandTrigger: 'hover' }"
              clearable
              :disabled="disabled"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="最高学历：" prop="education" class="form_item">
            <el-select
              v-model="education"
              style="width: 100%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionsEducation"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="最高学位：" prop="degree" class="form_item">
            <el-select
              v-model="ruleForm.degree"
              style="width: 100%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionsDegree"
                :key="item.de_id"
                :label="item.name"
                :value="item.de_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="所属单位类别：" prop="companytype">
            <el-select
              v-model="ruleForm.companytype"
              class="input"
              style="width: 100%"
              @change="changetype(ruleForm.companytype)"
              clearable
              filterable
              :disabled="disabled"
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
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="所属单位：" prop="company">
            <el-select
              v-model="ruleForm.company"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
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
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="10" class="col">
          <el-form-item label="通讯地址：" prop="address">
            <el-input
              v-model="ruleForm.address"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="10" :offset="2" class="col">
          <el-form-item label="所属单位：" prop="company">
            <el-select
              v-model="ruleForm.company"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
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
        </el-col> -->
        <el-col :span="1"></el-col>
      </el-row>

      <div class="mybt">
        <!-- <el-button type="danger" @click="destory" round class="bt"
          >注销账户</el-button
        > -->
        <el-button type="primary" @click="changePd" round class="bt"
          >修改密码</el-button
        >
        <el-button
          type="primary"
          @click="changeInfo"
          round
          class="bt"
          v-show="disabled"
          >修改信息</el-button
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
    <Password :datadetail="datadetail" ref="password" @refresh="reFresh" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Password from "../password.vue";
export default {
  components: { Password },
  data() {
    return {
      disabled: true,
      labelPosition: "right",
      ruleForm: {
        ex_id: "",
        name: "",
        phone: "",
        gender: "",
        research: "",
        honor: "",
        birthdate: "",
        email: "",
        address: "",
        nation: 0,
        card: "",
        workphone: "",
        workcompany: "",
        companytype: "",
        company: "",
      },
      optionsResearch: [], // 研究专长
      dataHonor: [],
      optionsHonor: [], // 荣誉称号
      optionsEducation: [],
      education: "",
      dataDegree: [],
      optionsDegree: [],
      optionsNation: [],
      companytypeoption: [],
      companyoption: [],

      datadetail: {},

      fresh: "0",
    };
  },
  created() {
    this.getResearch();
    this.gethonor();
    this.geteducation();
    this.getdegree();
    this.getnation();
    this.getcompanytype();
    setTimeout(() => {
      this.getuserinfo();
    }, 0);
  },
  methods: {
    destory() {
      let h = this.$createElement;
      this.$msgbox({
        title: "警告",
        message: h("p", null, [
          h("span", { style: "color: red" }, `是否确定注销此账户`),
          // h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((action) => {
        this.$api
          .updateExpertCancellation({
            ex_id: sessionStorage.getItem("userid"),
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
              // location.reload();
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
            .updateuserInfo({
              ex_id: sessionStorage.getItem("userid"),
              name: this.ruleForm.name,
              gender: this.ruleForm.gender,
              phone: this.ruleForm.phone,
              research_specialty: this.ruleForm.research,
              honor: this.ruleForm.honor,
              education: this.education,
              degree: this.ruleForm.degree,
              birthdate: myFunctions.newDateToDate(this.ruleForm.birthdate),
              major: this.ruleForm.major,
              email: this.ruleForm.email,
              address: this.ruleForm.address,
              nation: this.ruleForm.nation,
              card: this.ruleForm.card,
              workphone: this.ruleForm.workphone,
              workcompany: this.workcompany,
              companytype: this.ruleForm.companytype,
              company: this.ruleForm.company,
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
    // 获取研究专长分类 getResearchSpecialty
    getResearch() {
      this.$api.getResearchSpecialty({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.optionsResearch = data;
          }
        }
      });
    },
    // 获取荣誉称号
    gethonor() {
      this.$api.getHonor({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            for (let i = 0; i < data.length; i++) {
              data[i].label = data[i].name;
              data[i].id = data[i].h_id;
              data[i].value = data[i].h_id;
              data[i].type = "honor";
              this.dataHonor.push(data[i]);
            }
            // 一层称号
            let datap = [];
            for (let i = 0; i < this.dataHonor.length; i++) {
              if (this.dataHonor[i].pid == "0") {
                this.dataHonor[i].type = "honor1";
                this.optionsHonor.push(this.dataHonor[i]);
              }
            }
            // 二层称号
            for (let i = 0; i < this.optionsHonor.length; i++) {
              let datac = [];
              for (let j = 0; j < this.dataHonor.length; j++) {
                if (this.dataHonor[j].pid == this.optionsHonor[i].id) {
                  this.dataHonor[j].type = "honor2";
                  datac.push(this.dataHonor[j]);
                }
              }
              if (datac.length > 0) {
                this.optionsHonor[i].children = datac;
              }
            }
          }
        }
      });
    },
    // 获取学历
    geteducation() {
      this.optionsEducation = [];
      this.$api.getEducation({}).then((res) => {
        if (res.status == 200) {
          // console.log(res);
          if (res.data.status == 200) {
            let data = res.data.result;
            // console.log(111, data);
            this.optionsEducation = data;
          }
        }
      });
    },
    // 获取学位
    getdegree() {
      this.$api.getDegree({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.dataDegree = data;
            // console.log(data);
          }
        }
      });
    },
    // 获取民族
    getnation() {
      this.$api.getNations({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.optionsNation = data;
          }
        }
      });
    },
    getcompanytype() {
      this.$api.getCompanyType({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          // console.log(data);
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
    changetype(val) {
      this.ruleForm.company = "";
      this.getcompany(val);
    },

    getuserinfo() {
      this.$api
        .getOneUser({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result[0];
              this.datadetail = data;
              this.ruleForm.ex_id = data.ex_id;
              this.ruleForm.name = data.name;
              this.ruleForm.gender = data.gender;
              this.ruleForm.phone = data.phone;
              this.ruleForm.research = data.research_specialty;
              this.ruleForm.honor = data.honor;
              this.education = data.education;
              this.ruleForm.degree = data.degree;
              this.ruleForm.birthdate = data.birthdate;
              this.ruleForm.major = data.major;
              this.ruleForm.email = data.email;
              this.ruleForm.address = data.address;
              this.ruleForm.nation = data.nation;
              this.ruleForm.card = data.card;
              this.ruleForm.workphone = data.workphone;
              this.ruleForm.workcompany = data.workcompany;
              this.ruleForm.companytype = data.companytype;
              this.getcompany(this.ruleForm.companytype);
              this.ruleForm.company = data.company;
            }
          }
        });
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    education(newval, val) {
      // console.log(newval);
      this.optionsDegree = [];
      let data = [];
      if (newval == 1) {
        newval = "博士";
        for (let i = 0; i < this.dataDegree.length; i++) {
          if (this.dataDegree[i].name.indexOf(newval) != -1) {
            data.push(this.dataDegree[i]);
          }
        }
      } else if (newval == 2) {
        newval = "硕士";
        for (let i = 0; i < this.dataDegree.length; i++) {
          if (this.dataDegree[i].name.indexOf(newval) != -1) {
            data.push(this.dataDegree[i]);
          }
        }
      } else if (newval == 3) {
        newval = "学士";
        for (let i = 0; i < this.dataDegree.length; i++) {
          if (this.dataDegree[i].name.indexOf(newval) != -1) {
            data.push(this.dataDegree[i]);
          }
        }
      }
      data.push(this.dataDegree[this.dataDegree.length - 1]);
      this.optionsDegree = data;
    },
    fresh(newval, val) {
      if (newval != "0") {
        this.getuserinfo();
        this.fresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  display: flex;
  justify-content: center;
  // flex-flow: column;
  .form {
    padding-top: 40px;
    width: 75%;
    // border: 1px solid red;
    .mybt {
      display: flex;
      justify-content: space-around;
    }
  }

  // border: 1px solid red;
}
</style>