<template>
  <el-dialog
    width="80%"
    title="项目编辑"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="biddingEdit">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
        class="form"
      >
        <div class="block">
          <p class="blockmsg">项目基本信息</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="11" class="col">
            <el-form-item label="项目名称：" prop="name" class="form_item">
              <el-input v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="项目内容：" prop="content" class="form_item">
              <el-input
                type="textarea"
                v-model="ruleForm.content"
                placeholder="请输入项目具体内容"
                autosize
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item
              label="项目类别："
              prop="category2"
              class="form_item selecttotal"
            >
              <el-select
                v-model="ruleForm.category1"
                @change="typeChange('change')"
                style="width: 50%"
              >
                <el-option
                  v-for="item in options_category1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.category2" style="width: 50%">
                <el-option
                  v-for="item1 in options_category2"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="项目预算：" prop="funds" class="form_item">
              <el-input type="number" v-model="ruleForm.funds"
                ><template slot="append">万元</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item label="研究方向：" prop="type" class="form_item">
              <el-select v-model="ruleForm.type" style="width: 100%">
                <el-option
                  v-for="item in options_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="截至时间：" prop="endTime" class="form_item">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                placeholder="申报截至时间"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="block">
          <p class="blockmsg">招标方式</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="8" class="col">
            <el-tooltip
              effect="light"
              content="是否所有人可见并参与投标"
              placement="top"
            >
              <el-form-item label="公开招标：" prop="public" class="form_item">
                <el-radio v-model="ruleForm.public" label="1">是</el-radio>
                <el-radio v-model="ruleForm.public" label="0">否</el-radio>
              </el-form-item>
            </el-tooltip>
          </el-col>
          <el-col :span="8" class="col">
            <el-tooltip
              effect="light"
              content="系统是否根据项目类型给予相关专家发送推荐"
              placement="top"
            >
              <el-form-item
                label="推荐招标："
                prop="recommend"
                class="form_item"
              >
                <el-radio v-model="ruleForm.recommend" label="1">是</el-radio>
                <el-radio v-model="ruleForm.recommend" label="0" disabled
                  >否</el-radio
                >
              </el-form-item>
            </el-tooltip>
          </el-col>
          <el-col :span="8" class="col">
            <el-tooltip
              effect="light"
              content="是否自主选择相关专家发送邀请"
              placement="top"
            >
              <el-form-item
                label="邀请招标："
                prop="invitation"
                class="form_item"
                @change="invitationCh"
              >
                <el-radio
                  v-model="ruleForm.invitation"
                  label="1"
                  :disabled="radioDisabled"
                  @change="invitationCh"
                  >是</el-radio
                >
                <el-radio
                  v-model="ruleForm.invitation"
                  label="0"
                  disabled
                  @change="invitationCh"
                  >否</el-radio
                >
                <i
                  id="invitation"
                  class="el-icon-view"
                  style="display: none; color: #2289ec"
                  @click="invitationCh"
                ></i>
              </el-form-item>
            </el-tooltip>
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
              <el-slider v-model="ruleForm.rateEconomics"> </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="技术评审："
              prop="rateTechnology"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rateTechnology"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1" class="col">
            <el-form-item
              label="综合评审："
              prop="rateComprehensive"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rateComprehensive"> </el-slider>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="block">
          <p class="blockmsg">其他信息</p>
        </div>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="20" class="col">
            <el-form-item label="文件信息：" prop="other" class="form_item">
              <!-- <el-input v-model="files" disabled></el-input> -->
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
                  >上传文件</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1" class="col"
            ><el-button type="primary" @click="detailsFiles" size="small"
              >已上传文件</el-button
            >
          </el-col>
        </el-row>
      </el-form>

      <!-- <Invitation
        v-bind:visible="dialogVisible"
        @closeDialog="closeDialog"
        @gettagdata="getTagData"
      /> -->
    </div>
    <DetailsFiles
      ref="dialogEditFils"
      :datafiles="dataFiles"
      @getdeletedata="getDeleteData"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="Ok">确 定</el-button>
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "../../../myFunctions";
import Invitation from "../../launch/invitation.vue";
import DetailsFiles from "./detailsFiles.vue";
import base from "../../../api/base";
export default {
  props: ["dataedit"],
  components: { Invitation, DetailsFiles },

  data() {
    return {
      visible: false,
      files: "",
      ruleForm: {
        name: "",
        content: "",
        cid: "",
        category1: "",
        category2: "",
        type: "",
        funds: 0,
        endTime: "",
        public: "1",
        recommend: "0",
        invitation: "0",
        rateEconomics: 30,
        rateTechnology: 60,
        rateComprehensive: 10,
        other: "",
        tagData: [],
      },
      rules: {
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择项目类型", trigger: "change" },
        ],
        category2: [
          { required: true, message: "请选择项目类别", trigger: "change" },
        ],
        funds: [{ required: true, message: "请输入项目预算", trigger: "blur" }],
        endTime: [
          {
            required: true,
            message: "请输入项目截至投标时间",
            trigger: "blur",
          },
        ],
        finishTime: [
          {
            required: true,
            message: "请输入项目预计完成时间",
            trigger: "blur",
          },
        ],
      },
      labelPosition: "left",
      // 下拉列表
      options_category1: [],
      options_category2: [],
      options_type: [],
      // 组件禁用
      radioDisabled: true,
      // 文件信息
      dataFiles: [],
      files: "",
      deleteFiles: [],
      // 上传文件
      fileList: [],
      successFlieList: [],
      url: base.upload, // 图片地址服务器
      imgurl: "",
    };
  },
  created() {
    // console.log("user", sessionStorage.getItem("userid"));
    // 项目类别一层节点
    this.$api.itemCategory({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        for (let i = 0; i < data.length; i++) {
          let data1 = {};
          data1.value = data[i].categoryid;
          data1.label = data[i].categoryid;
          data1.categoryid = data[i].categoryid;
          data1.categoryname = data[i].categoryname;
          data1.cid = data[i].cid;
          data1.minfunds = data[i].min_funds;
          this.options_category1.push(data1);
        }
      }
    });
    // 项目类别
    this.$api.getResearchDirection({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].value = data[i].name;
            data[i].label = data[i].name;
            data[i].it_id = data[i].re_id;
            this.options_type.push(data[i]);
          }
        }
      }
    });
  },
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    // 确定按钮
    Ok() {
      this.visible = false;

      for (let i = 0; i < this.options_type.length; i++) {
        if (this.options_type[i].name == this.ruleForm.type) {
          this.ruleForm.typeid = this.options_type[i].re_id;
          break;
        }
      }
      for (let i = 0; i < this.options_category2.length; i++) {
        if (
          this.options_category2[i].categoryid == this.ruleForm.category1 &&
          this.options_category2[i].categoryname == this.ruleForm.category2
        ) {
          this.ruleForm.cid = this.options_category2[i].cid;
          break;
        }
      }

      // 保存修改
      this.$api
        .updateReleaseItems({
          it_id: this.ruleForm.it_id,
          name: this.ruleForm.name,
          userid: this.ruleForm.userid,
          content: this.ruleForm.content,
          time_release: this.ruleForm.time_release,
          time_end: myFunctions.newDateToDatetime(this.ruleForm.endTime),
          recommend: parseInt(this.ruleForm.recommend),
          public: parseInt(this.ruleForm.public),
          invitation: parseInt(this.ruleForm.invitation),
          type: this.ruleForm.typeid,
          cid: this.ruleForm.cid,
          rate_economics: parseInt(this.ruleForm.rateEconomics),
          rate_comprehensive: parseInt(this.ruleForm.rateComprehensive),
          rate_technology: parseInt(this.ruleForm.rateTechnology),
          other: this.ruleForm.other,
          funds: parseInt(this.ruleForm.funds) * 10000,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "修改成功!",
              offset: 100,
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败!",
              offset: 100,
            });
          }
        });
      // 删除文件
      if (this.deleteFiles.length > 0) {
        for (let i = 0; i < this.deleteFiles.length; i++) {
          this.$api
            .deleteItemFiles({
              url: this.deleteFiles[i].url,
              it_id: this.deleteFiles[i].it_id,
            })
            .then((res) => {});
        }
      }
      // 上传文件
      if (this.successFlieList.length > 0) {
        for (let i = 0; i < this.successFlieList.length; i++) {
          this.$api
            .addItemFiles({
              name: this.successFlieList[i].name,
              upurl: this.successFlieList[i].upurl,
              uid: this.successFlieList[i].uid,
              url: this.successFlieList[i].url,
              size: this.successFlieList[i].size,
              it_id: this.successFlieList[i].it_id,
              uploadtime: this.successFlieList[i].uploadtime,
            })
            .then((res) => {});
        }
      }
    },
    // 取消键
    Cancel() {
      //   this.$emit("closeDialog", "关闭");
    },
    // 类别变化第二下拉框也随之变化
    typeChange(val) {
      this.options_category2 = [];
      if (val == "created") {
      } else {
        this.ruleForm.category2 = "";
      }

      this.$api
        .itemCategoryname({
          categoryid: this.ruleForm.category1,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            for (let i = 0; i < data.length; i++) {
              let data1 = {};
              data1.value = data[i].categoryname;
              data1.label = data[i].categoryname;
              data1.categoryname = data[i].categoryname;
              data1.categoryid = data[i].categoryid;
              data1.cid = data[i].cid;
              data1.minfunds = data[i].min_funds;
              this.options_category2.push(data1);
            }
          }
        });
    },
    // 打开文件详情面板
    detailsFiles() {
      this.$refs.dialogEditFils.whereFrom = "edit";
      this.$refs.dialogEditFils.visible = true;
    },
    // 打开专家选择弹窗
    invitationCh() {
      let dom = document.getElementById("invitation");
      if (this.ruleForm.invitation == "1") {
        this.dialogVisible = true;
        // 方法2 修改子组件数据
        // this.$refs.dialog.visible=true;
        dom.style.display = "inline";
      } else {
        this.dialogVisible = false;
        dom.style.display = "none";
      }
    },
    // 获取删除的文件
    getDeleteData(val) {
      // console.log("delete", val);
      this.deleteFiles = val;
    },
    // 新上传文件成功后的函数
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
      fileInfo.it_id = this.dataedit.it_id;
      fileInfo.uploadtime = myFunctions.newDateToDatetime(
        file.raw.lastModifiedDate
      );
      this.successFlieList.push(fileInfo);
      this.fileList = fileList;
      // console.log(12345, this.successFlieList);
    },
    // 删除新上传文件
    handleRemove(file, fileList) {
      // console.log(222, file);
      for (let i = 0; i < this.successFlieList.length; i++) {
        if (this.successFlieList[i].id == file.uid) {
          this.successFlieList.splice(i, 1);
          break;
        }
      }
    },
  },
  watch: {
    visible(newval, val) {
      // console.log(1111, this.dataedit);
      this.files = "";
      if (newval == true) {
        this.ruleForm.it_id = this.dataedit.it_id;
        this.ruleForm.name = this.dataedit.name;
        this.ruleForm.content = this.dataedit.content;
        this.ruleForm.cid = this.dataedit.cid;
        this.ruleForm.category1 = this.dataedit.categoryid;
        this.ruleForm.category2 = this.dataedit.categoryname;
        this.ruleForm.type = this.dataedit.typename;
        this.ruleForm.funds = parseInt(this.dataedit.funds) / 1000;
        this.ruleForm.endTime = this.dataedit.time_end;
        this.ruleForm.recommend = this.dataedit.recommend + "";
        this.ruleForm.public = this.dataedit.public + "";
        this.ruleForm.invitation = this.dataedit.invitation + "";
        this.ruleForm.rateEconomics = parseInt(this.dataedit.rate_economics);
        this.ruleForm.rateTechnology = parseInt(this.dataedit.rate_technology);
        this.ruleForm.rateComprehensive = parseInt(
          this.dataedit.rate_comprehensive
        );
        this.ruleForm.other = this.dataedit.other;
        this.ruleForm.userid = this.dataedit.userid;
        this.ruleForm.time_release = this.dataedit.time_release;

        // 加载二层节点
        this.typeChange("created");
        // console.log(111, this.dataedit);
        // console.log(123, this.ruleForm);

        // 加载文件数据
        this.$api
          .getBiddingFiles({
            it_id: this.ruleForm.it_id,
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
    },
  },
};
</script>

<style  lang="less" scoped>
#biddingEdit {
  height: 55vh;
  .block {
    width: 100%;
    border-bottom: 1px dashed #dcdcdc;
    .blockmsg {
      font-size: 18px;
      color: #9c8888;
    }
  }
}
</style>