<template>
  <div class="total">
    <!-- <div class="table">
      <div class="title">项目经历</div>
      <div class="row" style="border: none">
        <div class="column">
          <div class="name">代表性成果</div>
          <div class="content">
            <el-input
              type="textarea"
              placeholder=""
              v-model="experience"
              autosize
            >
            </el-input>
          </div>
        </div>
        <div class="column">
          <div class="name">负责项目</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="name">获奖情况</div>
          <div class="content"></div>
        </div>
        <div class="column">
          <div class="name">成果采纳应用情况</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="name">完成专项性发展规划，重要报告，法律法规规章情况</div>
          <div class="content"></div>
        </div>
        <div class="column">
          <div class="name">规划、出版社科类出版物情况</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="name">在社科类期刊作为策划、责任编辑情况</div>
          <div class="content"></div>
        </div>
        <div class="column">
          <div class="name">在媒体上策划栏目或活动情况</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="name">留学情况</div>
          <div class="content"></div>
        </div>
        <div class="column">
          <div class="name">主要学术简历</div>
          <div class="content"></div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="name">学术兼职情况</div>
          <div class="content"></div>
        </div>
        <div class="column">
          <div class="name">获得各类人才荣誉称号</div>
          <div class="content">
            获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号获得各类人才荣誉称号
          </div>
        </div>
      </div>
    </div> -->
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="150px"
      :label-position="labelPosition"
      class="form"
    >
      <el-row>
        <div class="title">研究经历</div>
      </el-row>
      <el-row class="row" style="border: none">
        <!-- <el-col :span="1"></el-col> -->
        <el-col :span="11" class="col">
          <el-form-item label="代表性成果:" prop="experience" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.experience"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="负责项目:" prop="item" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.item"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
      <el-row class="row">
        <!-- <el-col :span="1"></el-col> -->
        <el-col :span="11" class="col">
          <el-form-item label="获奖情况:" prop="prize" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.prize"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item
            label="成果采纳应用情况:"
            prop="apply"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.apply"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item
            label="完成专项性发展规划，重要报告，法律法规规章情况:"
            prop="plan"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.plan"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item
            label="规划、出版社科类出版物情况:"
            prop="publish"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.publish"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item
            label="在社科类期刊作为策划、责任编辑情况:"
            prop="responsibility"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.responsibility"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item
            label="在媒体上策划栏目或活动情况:"
            prop="media"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.media"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="留学情况:" prop="overseas" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.overseas"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="主要学术简历:" prop="resume" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.resume"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="学术兼职情况:" prop="parttime" class="form_item">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.parttime"
              :disabled="disabled"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item
            label="获得各类人才荣誉称号:"
            prop="honor"
            class="form_item"
          >
            <el-input
              type="textarea"
              autosize
              placeholder=""
              v-model="ruleForm.honor"
              :disabled="disabled"
              :clearable="true"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>

      <div class="mybt">
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

      <el-row>
        <div class="title">记录信息</div>
      </el-row>
      <el-row class="row" style="border: none; margin-top: 10px">
        <el-col :span="11" class="col">
          <el-form-item label="创建人:" prop="establish" class="form_item">
            <el-input
              placeholder="请输入内容"
              v-model="ruleForm.establish"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item
            label="创建时间:"
            prop="establishtime"
            class="form_item"
          >
            <el-input placeholder="" v-model="ruleForm.establishtime" disabled>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="11" class="col">
          <el-form-item label="最后修改人:" prop="edit" class="form_item">
            <el-input
              autosize
              placeholder="请输入内容"
              v-model="ruleForm.edit"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2" class="col">
          <el-form-item label="最后修改时间:" prop="edittime" class="form_item">
            <el-input
              autosize
              placeholder=""
              v-model="ruleForm.edittime"
              disabled
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="1"></el-col> -->
      </el-row>
    </el-form>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      labelPosition: "left",
      disabled: true,

      addoredit: "add",

      ruleForm: {
        experience: "",
        item: "",
        prize: "",
        apply: "",
        plan: "",
        publish: "",
        responsibility: "",
        media: "",
        overseas: "",
        resume: "",
        parttime: "",
        honor: "",

        establish: "",
        establishtime: "",
        edit: "",
        edittime: "",
      },
    };
  },
  created() {
    this.getexperience();
    this.getuser();
  },
  methods: {
    getuser() {
      this.$api
        .getOneUser({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.ruleForm.name = data[0].name;
              this.ruleForm.ex_id = data[0].ex_id;
            }
          }
        });
    },
    changeInfo() {
      this.disabled = false;
    },
    submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.addoredit == "add") {
            this.addexperience();
          } else {
            this.updateexperience();
          }
        }
      });
    },
    addexperience() {
      this.$api
        .addExperience({
          ex_id: this.ruleForm.ex_id,
          experience: this.ruleForm.experience,
          item: this.ruleForm.item,
          prize: this.ruleForm.prize,
          apply: this.ruleForm.apply,
          plan: this.ruleForm.plan,
          publish: this.ruleForm.publish,
          responsibility: this.ruleForm.responsibility,
          media: this.ruleForm.media,
          overseas: this.ruleForm.overseas,
          resume: this.ruleForm.resume,
          parttime: this.ruleForm.parttime,
          honor: this.ruleForm.honor,
          establish: this.ruleForm.name,
          establishtime: myFunctions.newDateToDatetime(),
          edit: this.ruleForm.name,
          edittime: myFunctions.newDateToDatetime(),
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "提交成功",
              offset: 150,
            });
            this.disabled = true;
            this.getexperience();
          } else {
            this.$message({
              type: "error",
              message: "提交失败，请稍后再试",
              offset: 150,
            });
          }
        });
    },
    updateexperience() {
      this.$api
        .updateExperience({
          ex_id: this.ruleForm.ex_id,
          experience: this.ruleForm.experience,
          item: this.ruleForm.item,
          prize: this.ruleForm.prize,
          apply: this.ruleForm.apply,
          plan: this.ruleForm.plan,
          publish: this.ruleForm.publish,
          responsibility: this.ruleForm.responsibility,
          media: this.ruleForm.media,
          overseas: this.ruleForm.overseas,
          resume: this.ruleForm.resume,
          parttime: this.ruleForm.parttime,
          honor: this.ruleForm.honor,
          edit: this.ruleForm.name,
          edittime: myFunctions.newDateToDatetime(),
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功",
              offset: 150,
            });
            this.disabled = true;
            this.getexperience();
          } else {
            this.$message({
              type: "error",
              message: "提交失败，请稍后再试",
              offset: 150,
            });
          }
        });
    },
    getexperience() {
      this.$api
        .getExperience({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.addoredit = "edit";
              let data = res.data.result[0];
              this.datadetail = data;
              this.ruleForm.ex_id = data.ex_id;
              this.ruleForm.experience = data.experience;
              this.ruleForm.item = data.item;
              this.ruleForm.prize = data.prize;
              this.ruleForm.apply = data.apply;
              this.ruleForm.plan = data.plan;
              this.ruleForm.publish = data.publish;
              this.ruleForm.responsibility = data.responsibility;
              this.ruleForm.media = data.media;
              this.ruleForm.overseas = data.overseas;
              this.ruleForm.resume = data.resume;
              this.ruleForm.parttime = data.parttime;
              this.ruleForm.honor = data.honor;
              this.ruleForm.establish = data.establish;
              this.ruleForm.establishtime = data.establishtime;
              this.ruleForm.edit = data.edit;
              this.ruleForm.edittime = data.edittime;
              this.ruleForm.name = data.name;
            } else {
              this.addoredit = "add";
            }
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  .form {
    padding-top: 40px;
    width: 90%;
    .title {
      height: 30px;
      font-size: 17px;
      border-bottom: 1px solid rgb(125, 134, 122);
    }
    .mybt {
      display: flex;
      justify-content: space-around;
    }
    .el-form-item__label {
      line-height: 20px;
    }
    .row {
      border-top: 1px solid white;
      display: flex;
      align-items: center;
    }
  }
}
</style>