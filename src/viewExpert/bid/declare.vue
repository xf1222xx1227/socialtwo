<template>
  <el-dialog
    :model="ruleForm"
    width="60%"
    title="项目申报"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="declare">
      <el-form label-width="100px" :label-position="labelPosition" class="form">
        <!-- 
        :rules="rules"
        ref="ruleForm" -->
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="申请预算：" prop="money" class="form_item">
              <el-input
                type="number"
                v-model="ruleForm.money"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item
              label="完成时间："
              prop="finishtime"
              class="form_item"
            >
              <el-date-picker
                v-model="ruleForm.finishtime"
                type="date"
                placeholder="选择日期"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="备注：" prop="other" class="form_item">
              <el-input v-model="ruleForm.other" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
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
        <el-row class="row" style="margin-top: 10px" v-show="show">
          <el-col :span="11" class="col">
            <el-form-item label="文件：" prop="files" class="form_item">
              <el-input v-model="files" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-button
              size="small"
              type="primary"
              style="margin-left: 100px"
              @click="editFiles"
              >文件详情</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <DetailsFiles
        ref="dialogEditFils"
        :datafiles="dataFiles"
        @getdeletedata="getDeleteData"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok" type="primary" v-show="!show">申 报</el-button>
      <el-button @click="submit" type="primary" v-show="show">提 交</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import base from "../../api/base";
import myFunctions from "../../myFunctions";
import DetailsFiles from "../../views/Items/Bidding/detailsFiles.vue";
export default {
  props: ["datadetail", "wherefrom"],
  components: { DetailsFiles },
  data() {
    return {
      visible: false,
      labelPosition: "right",
      ruleForm: { money: 0, finishtime: "", other: "" },
      formData: {},
      fileList: [],
      successFlieList: [],
      url: base.upload, // 文件地址服务器
      imgurl: "",
      refresh: "0",
      files: "",
      show: false,
      dataFiles: [],
      deleteFiles: [],
    };
  },
  created() {},
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    Ok() {
      let data = this.ruleForm;
      data.finishtime = myFunctions.newDateToDate(data.finishtime);
      data.it_id = this.datadetail.it_id;
      data.ex_id = sessionStorage.getItem("userid");
      data.bid_time = myFunctions.newDateToDate(new Date());
      this.$confirm("确定申报?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // 申报添加
          this.$api
            .addBidItems({
              ex_id: data.ex_id,
              it_id: data.it_id,
              bid_time: data.bid_time,
              budget: parseInt(data.money),
              finilly_time: data.finishtime,
              other: data.other,
            })
            .then((res) => {
              if (res.status == 200) {
                if (res.data.status == 200) {
                }
              }
            });
          // 申报文件添加
          if (this.successFlieList.length > 0) {
            for (let i = 0; i < this.successFlieList.length; i++) {
              this.$api
                .addBidItemFiles({
                  ex_id: data.ex_id,
                  it_id: data.it_id,
                  name: this.successFlieList[i].name,
                  upurl: this.successFlieList[i].upurl,
                  uid: this.successFlieList[i].uid,
                  url: this.successFlieList[i].url,
                  size: this.successFlieList[i].size,
                  uploadtime: myFunctions.newDateToDatetime(new Date()),
                })
                .then((res) => {});
            }
          }
          // 检测是否添加成功
          let havefile = this.successFlieList.length;
          this.$api
            .successAddBidItemAndFiles({
              ex_id: data.ex_id,
              it_id: data.it_id,
              havefile: havefile,
            })
            .then((res) => {
              if (res.status == 200) {
                if (res.data.status == 200) {
                  this.$message({
                    type: "success",
                    message: "申报成功!可前往<我的项目>查看",
                    offset: 100,
                  });
                  // 申报后刷新表格
                  this.refresh = "1";
                  this.$emit("refresh", this.refresh);
                  this.visible = false;
                }
                // 失败就删除成功的部分数据
                else {
                  this.$api
                    .deleteBidItemAndFiles({
                      ex_id: data.ex_id,
                      it_id: data.it_id,
                      table: "bid_items",
                    })
                    .then((res) => {});
                  this.$api
                    .deleteBidItemAndFiles({
                      ex_id: data.ex_id,
                      it_id: data.it_id,
                      table: "bid_item_files",
                    })
                    .then((res) => {});
                  this.$message({
                    type: "error",
                    message: "申报失败!请重新提交",
                    offset: 100,
                  });
                }
              }
            });
        })
        .catch(() => {});
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
      // console.log(222, file);
      for (let i = 0; i < this.successFlieList.length; i++) {
        if (this.successFlieList[i].id == file.uid) {
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
    // 提交修改
    submit() {
      // 修改信息
      this.$api
        .updateBidItem({
          budget: this.ruleForm.money,
          finilly_time: myFunctions.newDateToDate(this.ruleForm.finishtime),
          other: this.ruleForm.other,
          ex_id: this.datadetail.ex_id,
          it_id: this.datadetail.it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功",
              offset: 100,
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败!请重新尝试",
              offset: 100,
            });
          }
        });
      // 上传新文件
      if (this.successFlieList.length > 0) {
        for (let i = 0; i < this.successFlieList.length; i++) {
          this.$api
            .addBidItemFiles({
              ex_id: this.datadetail.ex_id,
              it_id: this.datadetail.it_id,
              name: this.successFlieList[i].name,
              upurl: this.successFlieList[i].upurl,
              uid: this.successFlieList[i].uid,
              url: this.successFlieList[i].url,
              size: this.successFlieList[i].size,
              uploadtime: myFunctions.newDateToDatetime(new Date()),
            })
            .then((res) => {});
        }
      }
      // 删除文件
      if (this.deleteFiles.length > 0) {
        for (let i = 0; i < this.deleteFiles.length; i++) {
          this.$api
            .deleteDeclareOneFile({
              ex_id: this.datadetail.ex_id,
              it_id: this.datadetail.it_id,
              url: this.deleteFiles[i].url,
            })
            .then((res) => {
              if (res.status == 200) {
              }
            });
        }
      }
      // 修改后刷新表格
      this.refresh = "1";
      this.$emit("refresh", this.refresh);
      this.visible = false;
    },
    // 获取删除的文件
    getDeleteData(val) {
      // console.log("delete", val);
      this.deleteFiles = val;
    },
  },
  watch: {
    visible(newval, val) {
      this.files = "";
      if (newval == true) {
        if (this.wherefrom == "bidedit") {
          this.show = true;
          // console.log(111111111, this.datadetail);
          this.ruleForm.money = this.datadetail.budget;
          this.ruleForm.finishtime = this.datadetail.finilly_time;
          this.ruleForm.other = this.datadetail.other;
          this.ruleForm.ex_id = this.datadetail.ex_id;
          this.ruleForm.it_id = this.datadetail.it_id;
          this.$api
            .getBidFiles({
              ex_id: this.datadetail.ex_id,
              it_id: this.datadetail.it_id,
            })
            .then((res) => {
              if (res.status == 200) {
                let data = res.data.result;
                if (res.data.status == 200) {
                  this.dataFiles = data;
                  if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                      if (i > 0) {
                        this.files += "  ;  ";
                      }
                      this.files += data[i].name;
                    }
                  }
                } else {
                  this.files = "无";
                }
              }
            });
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#declare {
  padding: 0px 20px;
  // .form {
  //   width: 100%;
  // }
}
</style>