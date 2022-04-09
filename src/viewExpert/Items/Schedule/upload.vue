<template>
  <el-dialog
    :model="ruleForm"
    width="50%"
    title="进度上传"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="declare">
      <el-form
        :model="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="form"
        :rules="rules"
        ref="ruleForm"
      >
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="20" :offset="2" class="col">
            <el-form-item label="标题：" prop="title" class="form_item">
              <el-input v-model="ruleForm.title" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"> </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="20" :offset="2" class="col">
            <el-form-item label="预估进度：" prop="schedules" class="form_item">
              <el-slider v-model="ruleForm.schedules"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="2"> </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="20" :offset="2" class="col">
            <el-form-item label="备注：" prop="other" class="form_item">
              <el-input v-model="ruleForm.other" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"> </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="22" :offset="2" class="col">
            <el-form-item label="附件上传：" class="form_item">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :file-list="fileList"
                :auto-upload="true"
                :on-success="successUpload"
                :on-remove="handleRemove"
                multiple
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="submit('ruleForm')" type="primary">提 交</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
import base from "@/api/base";
export default {
  props: ["dataitid"],
  data() {
    return {
      visible: false,

      labelPosition: "right",
      ruleForm: { title: "", schedules: 0, other: "" },
      rules: {
        title: [{ required: true, message: "输入标题", trigger: "blur" }],
        schedules: [{ required: true, message: "输入进度", trigger: "blur" }],
      },

      fileList: [],
      successFlieList: [],
      url: base.upload, // 文件地址服务器
      imgurl: "",
      files: "",
    };
  },
  methods: {
    submit(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 上传进度接口
          let it_id = this.dataitid;
          let time_schedule = myFunctions.newDateToDatetime(new Date());
          let ex_id = sessionStorage.getItem("userid");
          let schedules = parseInt(this.ruleForm.schedules);
          this.$api
            .addSchedules({
              ex_id: ex_id,
              it_id: it_id,
              time_schedule: time_schedule,
              title: this.ruleForm.title,
              schedules: schedules,
              other: this.ruleForm.other,
            })
            .then((res) => {
              if (res.status == 200) {
                if (!myFunctions.isEmpty(this.successFlieList)) {
                  let data = this.successFlieList;
                  for (let i = 0; i < data.length; i++) {
                    this.$api
                      .addSchedulesFiles({
                        ex_id: ex_id,
                        it_id: it_id,
                        name: this.successFlieList[i].name,
                        upurl: this.successFlieList[i].upurl,
                        uid: this.successFlieList[i].uid,
                        url: this.successFlieList[i].url,
                        size: this.successFlieList[i].size,
                        uploadtime: time_schedule,
                      })
                      .then((res) => {
                        if (i == data.length - 1) {
                          this.$message({
                            type: "success",
                            message: "上传成功",
                            offset: 150,
                          });
                          this.$emit("refresh", "1");
                          this.visible = false;
                        }
                      });
                  }
                } else {
                  this.$message({
                    type: "success",
                    message: "上传成功",
                    offset: 150,
                  });
                  this.$emit("refresh", "1");
                  this.visible = false;
                }
              } else {
                this.$message({
                  type: "error",
                  message: "上传失败，请稍后再试",
                  offset: 150,
                });
              }
            });
        }
      });
    },

    // 上传文件成功后的函数
    successUpload(response, file, fileList) {
      // console.log("上传成功");
      // console.log(111, file);
      this.imgurl = base.host + "/" + response.url.slice(7);
      let fileInfo = {};
      fileInfo.name = file.name;
      fileInfo.upurl = file.response.url;
      fileInfo.uid = file.uid;
      fileInfo.url = this.imgurl;
      fileInfo.size = file.size;
      fileInfo.uploadtime = myFunctions.newDateToDatetime(
        file.raw.lastModifiedDate
      );
      this.successFlieList.push(fileInfo);
      this.fileList = fileList;
      // console.log(12345, this.successFlieList);
    },
    // 删除当前上传文件
    handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // console.log(222, file);
      for (let i = 0; i < this.successFlieList.length; i++) {
        if (this.successFlieList[i].uid == file.uid) {
          this.successFlieList.splice(i, 1);
          break;
        }
      }
    },
    // 编辑文件
    editFiles() {
      this.$refs.dialogEditFils.whereFrom = "edit";
      this.$refs.dialogEditFils.visible = true;
    },
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
  },
  watch: {
    dataitid(newval, val) {
      // console.log(newval);
    },
  },
};
</script>

<style>
</style>