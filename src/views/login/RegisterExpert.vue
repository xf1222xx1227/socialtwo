<template>
  <div id="registerexpert">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :label-position="labelPosition"
      class="form"
    >
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="11" class="col">
          <el-form-item label="姓名：" prop="name" class="form_item">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="电话：" prop="phone" class="form_item">
            <el-input
              v-model="ruleForm.phone"
              clearable
              placeholder="请输入11位数号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="密码：" prop="password1" class="form_item">
            <el-input v-model="ruleForm.password1" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="确定密码：" prop="password2" class="form_item">
            <el-input v-model="ruleForm.password2" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="研究专长：" prop="research" class="form_item">
            <el-select v-model="ruleForm.research" style="width: 100%">
              <el-option
                v-for="item in optionsResearch"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="荣誉称号：" prop="honor" class="form_item">
            <el-cascader
              v-model="ruleForm.honor"
              :options="optionsHonor"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChangeHonor"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="最高学历：" prop="education" class="form_item">
            <el-select v-model="education" style="width: 100%">
              <el-option
                v-for="item in optionsEducation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="handleChangeEducation"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="最高学位：" prop="degree" class="form_item">
            <el-select v-model="ruleForm.degree" style="width: 100%">
              <el-option
                v-for="item in optionsDegree"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row" style="margin-top: 10px">
        <el-col :span="11" class="col">
          <el-form-item label="出生日期：" prop="birthdate" class="form_item">
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
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="邮箱：" prop="email" class="form_item">
            <el-input v-model="ruleForm.email" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="家庭住址：" prop="address" class="form_item">
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
    </el-form>
    <div class="mybt">
      <el-button type="primary" @click="backLogin" round class="bt"
        >返回登录</el-button
      >
      <el-button type="success" @click="register('ruleForm')" round class="bt"
        >注册</el-button
      >
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      // 表格
      ruleForm: {
        name: "",
        phone: "",
        password1: "",
        password2: "",
        research: "",
        honor: "",
        // education: "",
        degree: "无",
        birthdate: "",
        email: "",
        address1: "",
        address2: "",
        address3: "",
        address1id: "",
        address2id: "",
        address3id: "",
      },
      address: "",
      optionsResearch: [], // 研究专长
      optionsHonor: [], // 荣誉称号
      dataHonor: [],
      optionsEducation: [],
      education: "无",
      dataDegree: [],
      optionsDegree: [],
      //  地区
      options1: [],
      options2: [],
      options3: [],
      dataAddress: [],

      labelPosition: "right",
      rules: {
        name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          //   { min: 11, message: "最少11位数", trigger: "blur" },
          //   { max: 11, message: "最多11位数", trigger: "blur" },
        ],
        research: [
          { required: true, message: "请选择研究专长", trigger: "blur" },
        ],
        address3: [
          { required: true, message: "请选择家庭地址", trigger: "blur" },
        ],
      },

      dataExpert: [],
      dataExpertRegister: [],
    };
  },
  created() {
    // 研究专长分类 getResearchSpecialty
    this.$api.getResearchSpecialty({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = data[i].re_id;
            data[i].type = "research1";
            data[i].id = data[i].re_id;
            this.optionsResearch.push(data[i]);
          }
        }
      }
    });
    // 荣誉称号分类 getHonor
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
    // 学历
    this.$api.getEducation({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = data[i].name;
            this.optionsEducation.push(data[i]);
          }
        }
      }
    });
    // 学位分类 degree
    this.$api.getDegree({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = data[i].name;
            data[i].type = "degree1";
            data[i].id = data[i].de_id;
            this.dataDegree.push(data[i]);
          }
        }
      }
    });
    // 获取地区信息
    // 省
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
    this.getExpert();
    // let q = {"name":"11","id":"id","pd":"000"};
    // let ["name","pd"] = q;
  },
  methods: {
    addressCh1() {
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].value == this.ruleForm.address1) {
          this.ruleForm.address1id = this.options1[i].id;
          break;
        }
      }
      this.options2 = [];
      this.ruleForm.address2 = "";
      this.ruleForm.address2id = "";
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.ruleForm.address3id = "";
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
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].value == this.ruleForm.address2) {
          this.ruleForm.address2id = this.options2[i].id;
          break;
        }
      }
      this.options3 = [];
      this.ruleForm.address3 = "";
      this.ruleForm.address3id = "";
      this.$api
        .getcityList({
          pid: this.ruleForm.address2id,
        })
        .then((res) => {
          if (res.data.status == 200) {
            let data = res.data.result;
            for (let i = 0; i < data.length; i++) {
              let data1 = {};
              data1.value = data[i].name;
              data1.label = data[i].name;
              data1.id = data[i].id;
              this.options3.push(data1);
            }
          }
        });
    },
    addressCh3() {
      for (let i = 0; i < this.options3.length; i++) {
        if (this.options3[i].value == this.ruleForm.address3) {
          this.ruleForm.address3id = this.options3[i].id;
          break;
        }
      }
    },
    // 荣誉称号改变
    handleChangeHonor(value) {
      //   console.log(111, value);
    },
    // 学历改变
    handleChangeEducation(val) {
      // console.log(111, val);
    },
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
              if (this.dataExpertRegister.length > 0) {
                let ex_id =
                  this.dataExpertRegister[this.dataExpertRegister.length - 1]
                    .ex_id;
                let newexid = myFunctions.getNewId(ex_id);
                this.ruleForm.ex_id = newexid;
              } else if (this.dataExpert.length > 0) {
                let ex_id = this.dataExpert[this.dataExpert.length - 1].ex_id;
                let newexid = myFunctions.getNewId(ex_id);
                this.ruleForm.ex_id = newexid;
              }

              if (this.ruleForm.honor.length > 0) {
                this.ruleForm.honorid =
                  this.ruleForm.honor[this.ruleForm.honor.length - 1];
              }
              this.ruleForm.birthdate = myFunctions.newDateToDate(
                this.ruleForm.birthdate
              );
              this.ruleForm.research_specialty = this.ruleForm.research;
              this.ruleForm.education = this.education;
              for (let i = 0; i < this.optionsDegree.length; i++) {
                if (this.optionsDegree[i].name == this.ruleForm.degree) {
                  this.ruleForm.degreeid = this.optionsDegree[i].de_id;
                  break;
                }
              }
              this.ruleForm.register_time = myFunctions.newDateToDatetime(
                new Date()
              );
              let ishave = 0;
              if (this.dataExpertRegister.length > 0) {
                for (let i = 0; i < this.dataExpertRegister.length; i++) {
                  if (
                    this.dataExpertRegister[i].name == this.ruleForm.name &&
                    this.dataExpertRegister[i].phone == this.ruleForm.phone
                  ) {
                    ishave = 1;
                    this.$alert("账号已在审核，请勿重复申请", "提示", {
                      confirmButtonText: "确定",
                    });
                    break;
                  }
                }
              }
              if (ishave == 0) {
                if (this.dataExpert.length > 0) {
                  for (let i = 0; i < this.dataExpert.length; i++) {
                    if (
                      this.dataExpert[i].name == this.ruleForm.name &&
                      this.dataExpert[i].phone == this.ruleForm.phone
                    ) {
                      ishave = 2;
                      this.$alert("账号已存在，请前往登录页登录", "提示", {
                        confirmButtonText: "确定",
                      });
                      break;
                    }
                  }
                }
              }
              if (ishave == 0) {
                this.$api
                  .addExpertRegister({
                    ex_id: this.ruleForm.ex_id,
                    name: this.ruleForm.name,
                    password: this.ruleForm.password2,
                    honor: this.ruleForm.honorid,
                    birthdate: this.ruleForm.birthdate,
                    research_specialty: this.ruleForm.research_specialty,
                    education: this.ruleForm.education,
                    degree: this.ruleForm.degreeid,
                    phone: this.ruleForm.phone,
                    email: this.ruleForm.email,
                    address_province: this.ruleForm.address1id,
                    address_city: this.ruleForm.address2id,
                    address_county: this.ruleForm.address3id,
                    address_detail: this.ruleForm.address4,
                    register_time: this.ruleForm.register_time,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                      this.$alert("申请已提交，请等待审核同通过", "提示", {
                        confirmButtonText: "确定",
                      });
                      this.getExpert();
                    } else {
                      this.$message.error("上传出错");
                    }
                  });
              }
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
    getExpert() {
      this.$api.getAllExpertPersonal({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            this.dataExpert = res.data.result;
          }
        }
      });
      this.$api.getAllExpertPersonalRegister({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            this.dataExpertRegister = res.data.result;
          }
        }
      });
    },
  },
  watch: {
    education(newval, val) {
      this.ruleForm.degree = "无";
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
  },
};
</script>

<style lang="less" scoped>
#registerexpert {
  width: 100%;
  .form {
    .row {
      width: 100%;
    }
    .form_item {
      width: 100%;
    }
  }
  .mybt {
    display: flex;
    justify-content: space-around;
  }
}
</style>