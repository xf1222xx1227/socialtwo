<template>
  <el-dialog
    width="80%"
    :title="title"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="total">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="form"
      >
        <div class="block">
          <p class="blockmsg">课题基本信息</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="课题标题：" prop="name" class="form_item">
              <el-input
                v-model="ruleForm.name"
                clearable
                :disabled="this.type == 'detail'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="研究内容：" prop="content" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.content"
                placeholder="请输入课题具体内容"
                autosize
                :disabled="this.type == 'detail'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item label="课题性质：" prop="nature" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.nature"
                placeholder=""
                autosize
                :disabled="this.type == 'detail'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="参考选题：" prop="direction" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.direction"
                placeholder=""
                autosize
                :disabled="this.type == 'detail'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item
              label="课题类别："
              prop="topic_type"
              class="form_item"
            >
              <el-select
                v-model="ruleForm.topic_type"
                style="width: 100%"
                :disabled="this.type == 'detail'"
              >
                <el-option
                  v-for="item in datatopictype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item
              label="截至时间："
              prop="time_declare"
              class="form_item"
            >
              <el-date-picker
                v-model="ruleForm.time_declare"
                type="datetime"
                placeholder="申报截至时间"
                style="width: 100%"
                :disabled="this.type == 'detail'"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item
              label="成果形式："
              prop="achievementstype"
              class="form_item"
            >
              <el-select
                v-model="ruleForm.achievementstype"
                style="width: 100%"
                multiple
                :disabled="this.type == 'detail'"
              >
                <el-option
                  v-for="item in dataachievementstype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="申报人数：" prop="count" class="form_item">
              <el-input
                placeholder=""
                v-model="ruleForm.count"
                class="input-with-select"
                type="number"
                :disabled="this.type == 'detail'"
              >
                <el-select
                  v-model="ruleForm.type"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 80px"
                  :disabled="this.type == 'detail'"
                >
                  <el-option label="大于" value="1"></el-option>
                  <el-option label="小于" value="2"></el-option>
                  <el-option label="等于" value="3"></el-option>
                </el-select>
                <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="block">
          <p class="blockmsg">各项评审占比</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="7" class="col">
            <el-form-item
              label="经济评审："
              prop="rateEconomics"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.rateEconomics"
                :disabled="this.type == 'detail'"
              >
              </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="技术评审："
              prop="rateTechnology"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.rateTechnology"
                :disabled="this.type == 'detail'"
              ></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="综合评审："
              prop="rateComprehensive"
              class="form_item slider"
            >
              <el-slider
                v-model="ruleForm.rateComprehensive"
                :disabled="this.type == 'detail'"
              >
              </el-slider>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="block">
          <p class="blockmsg">其他信息</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="20" class="col">
            <el-form-item label="文件信息：" prop="other" class="form_item">
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
                <el-button
                  slot="trigger"
                  size="small"
                  type="primary"
                  :disabled="this.type == 'detail'"
                  >上传文件</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="3" :offset="1" class="col"
            ><el-button type="primary" @click="detailsFiles" size="small"
              >已上传文件</el-button
            >
          </el-col> -->
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="24" class="col">
            <el-form-item label="已上传文件：" class="form_item">
              <el-table
                :data="datafiles"
                style="width: 100%; overflow: auto"
                height="230"
                stripe
                border
                class="table"
              >
                <el-table-column
                  prop="name"
                  label="文件名"
                  header-align="center"
                  align="right"
                >
                </el-table-column>
                <el-table-column
                  prop="sizes"
                  label="文件大小"
                  sortable
                  header-align="center"
                  align="right"
                >
                </el-table-column>
                <el-table-column
                  prop="uploadtime"
                  label="上传时间"
                  sortable
                  header-align="center"
                  align="center"
                  min-width="180"
                >
                </el-table-column>

                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, datafiles)"
                      type="text"
                      size="small"
                      v-show="show"
                    >
                      <i class="el-icon-delete"></i>
                      删除&nbsp;
                    </el-button>
                    <el-button
                      @click.native.prevent="download(scope.$index, datafiles)"
                      type="text"
                      size="small"
                    >
                      <i class="el-icon-download"></i>
                      下载
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="Ok('ruleForm')"
        v-show="this.type != 'detail'"
        >确 定</el-button
      >
      <el-button
        type="primary"
        @click="edit"
        v-show="this.type == 'detail' && this.power != 'detail'"
        >编 辑</el-button
      >
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import base from "../../../api/base";
import myFunctions from "@/myFunctions";
export default {
  props: ["datadetail", "data"],
  data() {
    return {
      visible: false,
      type: "",
      power: "edit",
      title: "课题新增",
      ruleForm: {
        name: "",
        content: "",
        nature: "",
        direction: "",
        topic_type: 1,
        time_declare: "",
        achievementstype: "",
        // count: "",
        // type: "",
        rateEconomics: 30,
        rateTechnology: 60,
        rateComprehensive: 10,

        count: "",
        type: "1",
      },
      rules: {
        name: [
          { required: true, message: "请输入课题标题", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入课题研究内容", trigger: "blur" },
        ],
        time_declare: [
          { required: true, message: "请选择截至申报时间", trigger: "blur" },
        ],
        topic_type: [
          { required: true, message: "请选择课题类别", trigger: "blur" },
        ],
        achievementstype: [
          { required: true, message: "请选择成果形式", trigger: "blur" },
        ],
      },
      labelPosition: "left",
      dataachievementstype: [],
      datatopictype: [],
      // 文件信息
      datafiles: [], // 已上传文件
      dataFiles: [], // 原始文件
      show: false,
      files: "",
      dataDelete: [],
      deleteFiles: [],
      // 上传文件
      fileList: [],
      successFlieList: [],
      url: base.upload, // 图片地址服务器
      imgurl: "",
    };
  },
  created() {
    this.getachievementstype();
    this.gettopictype();
  },
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    // 编辑
    edit() {
      this.type = "edit";
    },
    gettopicfiles(id) {
      this.datafiles = [];
      this.$api
        .getOneTopicFiles({
          id: id,
        })
        .then((res) => {
          //   console.log(res);
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].sizes = myFunctions.filterfilesize(data[i].size);
              }
              this.datafiles = data;
              this.dataFiles = data;
            }
          }
        });
    },
    updatetopic(id) {
      let achievementstype = this.ruleForm.achievementstype.join();
      let time_release = myFunctions.newDateToDatetime();
      let time_declare = myFunctions.newDateToDatetime(
        this.ruleForm.time_declare
      );
      let mincount = 0;
      let maxcount = 0;
      if (this.ruleForm.type == "1") {
        mincount = this.ruleForm.count;
      } else if (this.ruleForm.type == "2") {
        maxcount = this.ruleForm.count;
      } else {
        mincount = this.ruleForm.count;
        maxcount = this.ruleForm.count;
      }
      this.$api
        .updatetopic({
          id: id,
          name: this.ruleForm.name,
          content: this.ruleForm.content,
          nature: this.ruleForm.nature,
          direction: this.ruleForm.direction,
          topic_type: this.ruleForm.topic_type,
          achievementstype: achievementstype,
          time_release: time_release,
          time_declare: time_declare,
          releaseid: sessionStorage.getItem("userid"),
          mincount: mincount,
          maxcount: maxcount,
          rateEconomics: this.ruleForm.rateEconomics,
          rateTechnology: this.ruleForm.rateTechnology,
          rateComprehensive: this.ruleForm.rateComprehensive,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功",
              offset: 150,
            });
          } else {
            this.$message({
              type: "error",
              message: "发布失败，请稍后再试",
              offset: 150,
            });
          }
        });
    },
    // 新增
    addtopic(id) {
      let achievementstype = this.ruleForm.achievementstype.join();
      let time_release = myFunctions.newDateToDatetime();
      let time_declare = myFunctions.newDateToDatetime(
        this.ruleForm.time_declare
      );
      let mincount = 0;
      let maxcount = 0;
      if (this.ruleForm.type == "1") {
        mincount = this.ruleForm.count;
      } else if (this.ruleForm.type == "2") {
        maxcount = this.ruleForm.count;
      } else {
        mincount = this.ruleForm.count;
        maxcount = this.ruleForm.count;
      }
      //   console.log(achievementstype);

      this.$api
        .addtopic({
          id: id,
          name: this.ruleForm.name,
          content: this.ruleForm.content,
          nature: this.ruleForm.nature,
          direction: this.ruleForm.direction,
          topic_type: this.ruleForm.topic_type,
          achievementstype: achievementstype,
          time_release: time_release,
          time_declare: time_declare,
          releaseid: sessionStorage.getItem("userid"),
          mincount: mincount,
          maxcount: maxcount,
          rateEconomics: this.ruleForm.rateEconomics,
          rateTechnology: this.ruleForm.rateTechnology,
          rateComprehensive: this.ruleForm.rateComprehensive,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "发布成功",
              offset: 150,
            });
          } else {
            this.$message({
              type: "error",
              message: "发布失败，请稍后再试",
              offset: 150,
            });
          }
        });
    },
    addtopicfiles(id, data) {
      this.$api
        .addTopicFiles({
          id: id,
          upurl: data.upurl,
          uid: data.uid,
          url: data.url,
          name: data.name,
          uploadtime: data.uploadtime,
          size: data.size,
        })
        .then((res) => {});
    },
    deletetopicfiles(id, data) {
      this.$api
        .deleteTopicFiles({
          id: id,
          uid: data.uid,
        })
        .then((res) => {});
    },
    // 确定按钮
    Ok(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type == "add") {
            this.$api.getAllTopic({}).then((res) => {
              if (res.status == 200) {
                if (res.data.status == 200) {
                  let data = res.data.result;
                  // 获取课题id
                  let id = myFunctions.getNewItemId(data[data.length - 1].id);
                  // 新增项目
                  this.addtopic(id);
                  // 新增文件（成功上传减去删除）
                  if (this.successFlieList.length > 0) {
                    for (let i = 0; i < this.successFlieList.length; i++) {
                      this.addtopicfiles(id, this.successFlieList[i]);
                    }
                  }
                  // 删除文件
                  if (this.dataDelete.length > 0) {
                    for (let i = 0; i < this.dataDelete.length; i++) {
                      this.deletetopicfiles(id, this.dataDelete[i]);
                    }
                  }
                  // 课题状态更改
                }
              }
              this.$emit("refresh", "1");
              this.visible = false;
            });
          } else if (this.type == "edit") {
            // 修改课题信息
            this.updatetopic(this.data.id);
            // 增加文件
            if (this.successFlieList.length > 0) {
              for (let i = 0; i < this.successFlieList.length; i++) {
                this.addtopicfiles(this.data.id, this.successFlieList[i]);
              }
            }
            // 删除文件
            if (this.dataDelete.length > 0) {
              for (let i = 0; i < this.dataDelete.length; i++) {
                this.deletetopicfiles(this.data.id, this.dataDelete[i]);
              }
            }
            this.$emit("refresh", "1");
            this.visible = false;
          }
        }
      });
    },
    // 取消键
    Cancel() {
      //   this.$emit("closeDialog", "关闭");
    },
    // 新上传文件成功后的函数
    successUpload(response, file, fileList) {
      this.imgurl = base.host + "/" + response.url.slice(7);
      let fileInfo = {};
      fileInfo.name = file.name;
      fileInfo.upurl = file.response.url;
      fileInfo.uid = file.uid;
      fileInfo.url = this.imgurl;
      fileInfo.size = file.size;
      fileInfo.id = this.datadetail.id;
      fileInfo.uploadtime = myFunctions.newDateToDatetime(
        file.raw.lastModifiedDate
      );
      this.successFlieList.push(fileInfo);
      this.fileList = fileList;
      if (this.datadetail.type == "add") {
        this.datafiles = this.successFlieList;
        let data = [];
        if (this.successFlieList.length > 0) {
          for (let i = 0; i < this.successFlieList.length; i++) {
            data.push(this.successFlieList[i]);
            let size = data[i].size;
            data[i].sizes = myFunctions.filterfilesize(size);
          }
        }
        this.datafiles = data;
      } else {
        this.datafiles = this.dataFiles;
        for (let i = 0; i < this.successFlieList.length; i++) {
          let ins = 0;
          for (let j = 0; j < this.dataFiles.length; j++) {
            if (this.dataFiles[j].url == this.successFlieList[i].url) {
              ins = 1;
              break;
            }
          }
          if (ins == 0) {
            this.successFlieList.sizes = myFunctions.filterfilesize(
              this.successFlieList.size
            );
            this.datafiles.push(this.successFlieList[i]);
          }
        }
        for (let i = this.datafiles.length - 1; i > 0; i--) {
          for (let j = 0; j < this.dataDelete.length; j++) {
            if (this.dataDelete[j].url == this.datafiles[i].url) {
              this.datafiles.splice(i, 1);
              break;
            }
          }
        }
      }
    },
    // 删除新上传文件
    handleRemove(file, fileList) {
      for (let i = 0; i < this.successFlieList.length; i++) {
        if (this.successFlieList[i].id == file.uid) {
          this.successFlieList.splice(i, 1);
          break;
        }
      }
    },
    // 删除文件
    deleteRow(index, datafiles) {
      this.dataDelete.push(this.datafiles[index]);
      this.datafiles.splice(index, 1);
    },
    // 下载文件
    download(index, datafiles) {
      let url = datafiles[index].url;
      let name = datafiles[index].name;
      if (
        name[name.length - 3] + name[name.length - 2] + name[name.length - 1] ==
        "txt"
      ) {
        window.open(url); // 新窗口打开
      } else {
        window.location.href = url;
      }
    },
    getachievementstype() {
      this.$api.getachievementstype({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.dataachievementstype = data;
          }
        }
      });
    },
    gettopictype() {
      this.$api.gettopic_type({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.datatopictype = data;
          }
        }
      });
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.getachievementstype();
        this.gettopictype();
        this.dataDelete = [];
        this.deleteFiles = [];
        this.fileList = [];
        this.successFlieList = [];

        this.type = this.datadetail.type;
        // 申报
        if (this.datadetail.power) {
          this.power = "detail";
          this.title = "课题详情";
        }
        if (this.datadetail.type == "add") {
          this.show = true;
          this.title = "课题新增";
        } else if (this.datadetail.type == "edit") {
          this.show = true;
          this.title = "课题编辑";
          let data = myFunctions.deepClone(this.data);
          if (data.achievementstype && data.achievementstype.length > 0) {
            data.achievementstype = data.achievementstype.split(",");
            for (let i = 0; i < data.achievementstype.length; i++) {
              data.achievementstype[i] = parseInt(data.achievementstype[i]);
            }
          }

          if (data.mincount == data.maxcount) {
            data.count = data.mincount;
            data.type = "3";
          } else if (data.mincount == 0) {
            data.count = data.maxcount;
            data.type = "2";
          } else {
            data.count = data.mincount;
            data.type = "1";
          }
          this.ruleForm = data;
          this.gettopicfiles(data.id);
        } else if (this.datadetail.type == "detail") {
          this.title = "课题详情";
          this.show = false;
          let data = myFunctions.deepClone(this.data);
          if (data.achievementstype && data.achievementstype.length > 0) {
            data.achievementstype = data.achievementstype.split(",");
            for (let i = 0; i < data.achievementstype.length; i++) {
              data.achievementstype[i] = parseInt(data.achievementstype[i]);
            }
          }
          if (data.mincount == data.maxcount) {
            data.count = data.mincount;
            data.type = "3";
          } else if (data.mincount == 0) {
            data.count = data.maxcount;
            data.type = "2";
          } else {
            data.count = data.mincount;
            data.type = "1";
          }
          this.ruleForm = data;
          this.gettopicfiles(data.id);
        }
      }
    },
    type(n, o) {
      if (n == "detail") {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 65vh;
  overflow: auto;
  .block {
    width: 100%;
    border-bottom: 1px dashed #dcdcdc;
    .blockmsg {
      font-size: 18px;
      color: #9c8888;
    }
  }
}
// ::-webkit-scrollbar {
//   display: none; // 隐藏滚动条
// }
</style>