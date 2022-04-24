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
          <el-form-item label="姓名：" prop="name" class="form_item">
            <el-input
              v-model="ruleForm.name"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item label="电话：" prop="phone" class="form_item">
            <el-input
              v-model="ruleForm.phone"
              clearable
              placeholder="请输入11位数号码"
              :disabled="disabled"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
      <el-row class="row" style="margin-top: 10px">
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
      <el-row class="row" style="margin-top: 10px">
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
      <el-row class="row" style="margin-top: 10px">
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
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="22" class="col">
          <el-form-item label="家庭住址：" prop="address" class="form_item">
            <el-select
              v-model="ruleForm.address1"
              @change="addressCh1()"
              style="width: 33.3%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="ruleForm.address2"
              @change="addressCh2()"
              style="width: 33.3%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="ruleForm.address3"
              style="width: 33.3%"
              :disabled="disabled"
            >
              <el-option
                v-for="item in options3"
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
      <el-row class="row" style="margin-top: 10px">
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
      </el-row>
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="10" class="col">
          <el-form-item
            label="社科邀请："
            prop="accept_invitation"
            class="form_item"
          >
            <el-radio
              v-model="ruleForm.accept_invitation"
              :label="1"
              :disabled="disabled"
              >接受</el-radio
            >
            <el-radio
              v-model="ruleForm.accept_invitation"
              :label="0"
              :disabled="disabled"
              >拒绝</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="2" class="col">
          <el-form-item
            label="系统推荐："
            prop="accept_recommend"
            class="form_item"
          >
            <el-radio
              v-model="ruleForm.accept_recommend"
              :label="1"
              :disabled="disabled"
              >接受</el-radio
            >
            <el-radio
              v-model="ruleForm.accept_recommend"
              :label="0"
              :disabled="disabled"
              >拒绝</el-radio
            >
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
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
import Password from "./password.vue";
export default {
  components: { Password },
  data() {
    return {
      disabled: true,
      labelPosition: "right",
      ruleForm: {
        name: "",
        phone: "",
        research: "",
        honor: "",
        // degree: "无",
        birthdate: "",
        email: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        accept_invitation: 1,
        accept_recommend: 1,
      },
      optionsResearch: [], // 研究专长
      dataHonor: [],
      optionsHonor: [], // 荣誉称号
      optionsEducation: [],
      education: "",
      dataDegree: [],
      optionsDegree: [],
      //  地区
      options1: [],
      options2: [],
      options3: [],
      dataAddress: [],

      datadetail: {},

      fresh: "0",
    };
  },
  created() {
    this.getResearch();
    this.gethonor();
    this.geteducation();
    this.getdegree();
    this.getaddress();
    // setTimeout(() => {
    this.getuserinfo();
    // }, 0);
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
          // console.log(this.ruleForm);
          // console.log(this.education);
          this.$api
            .updateExpertInfo({
              ex_id: sessionStorage.getItem("userid"),
              name: this.ruleForm.name,
              honor: this.ruleForm.honor,
              birthdate: this.ruleForm.birthdate,
              research_specialty: this.ruleForm.research,
              education: this.education,
              degree: this.ruleForm.degree,
              major: this.ruleForm.major,
              phone: this.ruleForm.phone,
              email: this.ruleForm.email,
              address_province: this.ruleForm.address1,
              address_city: this.ruleForm.address2,
              address_county: this.ruleForm.address3,
              address_detail: this.ruleForm.address4,
              accept_invitation: this.ruleForm.accept_invitation,
              accept_recommend: this.ruleForm.accept_recommend,
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
            // for (let i = 0; i < data.length; i++) {
            //   data[i].label = data[i].name;
            //   data[i].value = data[i].name;
            //   data[i].type = "degree1";
            //   data[i].id = data[i].de_id;
            // }
            this.dataDegree = data;
          }
        }
      });
    },
    // 获取地区信息
    getaddress() {
      // 省
      this.$api.getprovinceList({}).then((res) => {
        let data = res.data.result;
        this.options1 = data;
      });
      // 地区全部信息
      this.$api.getAddress({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            for (let i = 0; i < data.length; i++) {
              this.dataAddress.push(data[i]);
            }
          }
        }
      });
    },
    addressCh1(...type) {
      // console.log(11111111, type);
      this.options2 = [];
      this.ruleForm.address2 = "";
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.$api
        .getcityList({
          pid: this.ruleForm.address1,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.options2 = data;
            }
            if (type.length == 3) {
              this.ruleForm.address2 = type[1];
              this.addressCh2(type[2]);
            }
          }
        });
    },
    addressCh2(...type) {
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.$api
        .getcityList({
          pid: this.ruleForm.address2,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.options3 = data;
              // console.log(data);
            }
            if (type.length == 1 && type[0] != 999999) {
              this.ruleForm.address3 = type[0];
            }
          }
        });
    },
    getuserinfo() {
      this.$api
        .getOneExpertInfo({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result[0];
              this.datadetail = data;
              this.ruleForm.name = data.name;
              this.ruleForm.phone = data.phone;
              this.ruleForm.research = data.research_specialty;
              this.ruleForm.honor = data.honor;
              this.education = data.education;
              this.ruleForm.degree = data.degree;
              this.ruleForm.birthdate = data.birthdate;
              this.ruleForm.major = data.major;
              this.ruleForm.email = data.email;
              this.ruleForm.address4 = data.address_detail;
              this.ruleForm.accept_invitation = data.accept_invitation;
              this.ruleForm.accept_recommend = data.accept_recommend;
              this.ruleForm.address1 = data.address_province;
              this.ruleForm.address2 = data.address_city;
              this.ruleForm.address3 = data.address_county;
              this.addressCh1(
                data.address_province,
                data.address_city,
                data.address_county
              );
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
      this.optionsDegree = [];
      if (newval == "博士研究生" || newval == "硕士研究生") {
        newval = newval.substring(0, 2);
        for (let i = 0; i < this.dataDegree.length; i++) {
          if (this.dataDegree[i].name.indexOf(newval) != -1) {
            this.optionsDegree.push(this.dataDegree[i]);
          }
        }
      } else if (newval == "本科") {
        newval = "学士";
        for (let i = 0; i < this.dataDegree.length; i++) {
          if (this.dataDegree[i].name.indexOf(newval) != -1) {
            this.optionsDegree.push(this.dataDegree[i]);
          }
        }
      }
      this.optionsDegree.push(this.dataDegree[this.dataDegree.length - 1]);
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
    width: 60%;
    // border: 1px solid red;
    .mybt {
      display: flex;
      justify-content: space-around;
    }
  }

  // border: 1px solid red;
}
</style>