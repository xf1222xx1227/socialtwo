<template>
  <div id="ltemLaunch">
    <div id="total">
      <!-- <div class="steps" style="height: 50px; width: 100%">
        <Steps :index="0" />
      </div> -->
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
                @change="typeChange()"
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
              <el-select
                v-model="ruleForm.category2"
                @change="typenameChange()"
                style="width: 50%"
              >
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
              <el-input
                type="number"
                v-model="ruleForm.funds"
                :min="setMinFunds"
                ><template slot="append">万元</template></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="11" class="col">
            <el-form-item label="项目类型：" prop="type" class="form_item">
              <el-select
                v-model="ruleForm.type"
                @change="typenameChange()"
                style="width: 100%"
              >
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
                placeholder="投标截至时间"
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
                <el-radio v-model="ruleForm.recommend" label="0">否</el-radio>
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
                  @change="invitationCh"
                  >是</el-radio
                >
                <el-radio
                  v-model="ruleForm.invitation"
                  label="0"
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
          <el-col :span="8" class="col">
            <el-form-item
              label="经济评审："
              prop="rateEconomics"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rateEconomics"> </el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
            <el-form-item
              label="技术评审："
              prop="rateTechnology"
              class="form_item slider"
            >
              <el-slider v-model="ruleForm.rateTechnology"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="col">
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
          <el-col :span="11" class="col">
            <el-form-item label="文件上传：" class="form_item">
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
          <el-col :span="11" :offset="2" class="col">
            <el-form-item label="其他信息：" prop="other" class="form_item">
              <el-input
                v-model="ruleForm.other"
                type="textarea"
                autosize
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="block">
          <p class="blockmsg">项目提交</p>
        </div>
        <div class="mybt" style="margin-top: 10px">
          <el-button type="primary" @click="submit('ruleForm')" round class="bt"
            >提交发布</el-button
          >
        </div>
      </el-form>

      <Invitation
        v-bind:visible="dialogVisible"
        @closeDialog="closeDialog"
        @gettagdata="getTagData"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import base from "../../api/base";
import Invitation from "./invitation.vue";
import Steps from "../steps.vue";
import myFunctions from "../../myFunctions";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        content: "",
        category: "",
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
      setMinFunds: 0,
      fileList: [],
      successFlieList: [],
      url: base.upload, // 文件地址服务器
      imgurl: "",
      dialogVisible: false, // 选择专家弹窗是否显示
      options_category1: [],
      options_category2: [],
      options_type: [],
      labelPosition: "left",
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
    };
  },
  components: {
    Invitation,
    Steps,
  },
  computed: {
    ...mapState(["userid"]),
  },
  methods: {
    // 获取专家邀请信息
    getTagData(val) {
      this.ruleForm.tagData = val;
      // console.log(111, val);
      // console.log(222, this.ruleForm.tagData);
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
    // 删除文件
    handleRemove(file, fileList) {
      // console.log(222, file);
      for (let i = 0; i < this.successFlieList.length; i++) {
        if (this.successFlieList[i].id == file.uid) {
          this.successFlieList.splice(i, 1);
          break;
        }
      }
    },
    // 提交按钮
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否确定发布?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          })
            .then(() => {
              this.$refs.upload.submit();
              this.ruleForm.endTime = myFunctions.newDateToDatetime(
                this.ruleForm.endTime
              );
              let dataReleaseItems = {};
              let dataState = {};
              let dataInvitation = {};

              this.$api.getReleaseAllItems({}).then((res) => {
                if (res.status == 200) {
                  if (res.data.status == 200) {
                    let dataid =
                      res.data.result[res.data.result.length - 1].it_id;
                    let datanewid = myFunctions.getNewItemId(dataid);
                    dataReleaseItems.it_id = datanewid;
                    dataState.it_id = datanewid;
                    dataInvitation.it_id = datanewid;
                    if (this.successFlieList.length > 0) {
                      for (let i = 0; i < this.successFlieList.length; i++) {
                        this.successFlieList[i].it_id = datanewid;
                      }
                    }
                    let data = this.ruleForm;
                    dataReleaseItems.name = data.name;
                    dataReleaseItems.userid = sessionStorage.getItem("userid");
                    dataReleaseItems.content = data.content || "";
                    dataReleaseItems.time_release = myFunctions.newDateToDate(
                      new Date()
                    );
                    dataReleaseItems.time_end = data.endTime;
                    dataReleaseItems.recommend = parseInt(data.recommend);
                    dataReleaseItems.public = parseInt(data.public);
                    dataReleaseItems.invitation = parseInt(data.invitation);
                    if (data.tagData.length < 1) {
                      dataReleaseItems.invitation = 0;
                    }
                    dataReleaseItems.type = data.type;
                    for (let i = 0; i < this.options_category2.length; i++) {
                      if (
                        this.options_category2[i].categoryid ==
                          data.category1 &&
                        this.options_category2[i].categoryname == data.category2
                      ) {
                        dataReleaseItems.cid = parseInt(
                          this.options_category2[i].cid
                        );
                        break;
                      }
                    }
                    dataReleaseItems.time_finilly = "";
                    dataReleaseItems.rate_economics = data.rateEconomics;
                    dataReleaseItems.rate_comprehensive =
                      data.rateComprehensive;
                    dataReleaseItems.rate_technology = data.rateTechnology;
                    dataReleaseItems.other = data.other;
                    dataReleaseItems.funds =
                      data.funds > 0 ? data.funds * 10000 : 0;

                    // console.log("项目发布表", dataReleaseItems);
                    this.$api
                      .addReleaseItems({
                        it_id: dataReleaseItems.it_id,
                        name: dataReleaseItems.name,
                        userid: dataReleaseItems.userid,
                        content: dataReleaseItems.content,
                        time_release: dataReleaseItems.time_release,
                        time_end: dataReleaseItems.time_end,
                        recommend: dataReleaseItems.recommend,
                        public: dataReleaseItems.public,
                        invitation: dataReleaseItems.invitation,
                        type: dataReleaseItems.type,
                        cid: dataReleaseItems.cid,
                        time_finilly: dataReleaseItems.time_finilly,
                        rate_economics: dataReleaseItems.rate_economics,
                        rate_comprehensive: dataReleaseItems.rate_comprehensive,
                        rate_technology: dataReleaseItems.rate_technology,
                        other: dataReleaseItems.other,
                        funds: dataReleaseItems.funds,
                      })
                      .then((res) => {
                        // console.log(1234567890);
                      });

                    dataState.releases = 2;
                    dataState.bid = 1;
                    dataState.release_items = 0;
                    dataState.review_details = 0;
                    dataState.calibratio = 0;
                    dataState.bid_opening = 0;
                    dataState.finish = 0;
                    dataState.state = 2;
                    // console.log("项目状态表", dataState);

                    this.$api
                      .addItemState({
                        it_id: dataState.it_id,
                        releases: dataState.releases,
                        bid: dataState.bid,
                        release_items: dataState.release_items,
                        review_details: dataState.review_details,
                        calibratio: dataState.calibratio,
                        bid_opening: dataState.bid_opening,
                        finish: dataState.finish,
                        state: dataState.state,
                      })
                      .then((res) => {});

                    if (
                      dataReleaseItems.invitation == 1 &&
                      data.tagData.length > 0
                    ) {
                      for (let i = 0; i < data.tagData.length; i++) {
                        console.log(i, data.tagData.length);
                        dataInvitation.ex_id = data.tagData[i].ex_id;
                        this.$api
                          .addReleaseItemsInvitation({
                            it_id: dataInvitation.it_id,
                            ex_id: dataInvitation.ex_id,
                          })
                          .then((res) => {});
                        // console.log("邀请专家：", dataInvitation);
                      }
                    }
                    // 文件信息保存
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

                    // 如果只是部分成功，则删除该数据
                    this.$api
                      .addSuccessOrDefault({
                        it_id: dataReleaseItems.it_id,
                        invitation: parseInt(dataReleaseItems.invitation),
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          if (res.data.status == 200) {
                            this.$message({
                              type: "success",
                              message: "发布成功!可前往<我的项目>查看",
                              offset: 100,
                            });
                          } else {
                            this.$api
                              .deleteSomeSuccess({
                                table: " release_items ",
                                it_id: dataReleaseItems.it_id,
                              })
                              .then((res) => {});
                            this.$api
                              .deleteSomeSuccess({
                                table: " release_items_invitation ",
                                it_id: dataReleaseItems.it_id,
                              })
                              .then((res) => {});
                            this.$api
                              .deleteSomeSuccess({
                                table: " item_state ",
                                it_id: dataReleaseItems.it_id,
                              })
                              .then((res) => {});
                            this.$api
                              .deleteSomeSuccess({
                                table: " item_files ",
                                it_id: dataReleaseItems.it_id,
                              })
                              .then((res) => {});

                            this.$message({
                              type: "error",
                              message: "发布失败，请重新尝试",
                            });
                          }
                        }
                      });
                  }
                }
              });
            })
            .catch(() => {});
        } else {
          this.$message.error("输入有错误");
          return false;
        }
      });
    },
    // 类别变化第二下拉框也随之变化
    typeChange() {
      this.options_category2 = [];
      this.ruleForm.category2 = "";
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
            // console.log(111, this.options_category1);
            // console.log(222, this.options_category2);
          }
        });
    },
    typenameChange() {
      // console.log(111, this.ruleForm.category1, this.ruleForm.category2);
      // console.log(222, this.options_category2);
    },
    // 打开弹窗
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
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  created() {
    // console.log(111, sessionStorage.getItem("userdata").userid);
    // console.log(222, sessionStorage.getItem("userid"));
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
            data[i].value = data[i].re_id;
            data[i].label = data[i].name;
            this.options_type.push(data[i]);
          }
        }
      }
    });
  },
  watch: {
    // dialogVisible(newval, val) {
    //   if (newval == true) {
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
#ltemLaunch {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  #total {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-flow: column;
    // margin-top: 20px;
    // border: 1px solid red;
    .form {
      margin-top: 20px;
      flex: 1;
      .row {
        width: 100%;
      }
      .form_item {
        width: 100%;
      }
      .slider {
        width: 80%;
      }
      .block {
        width: 100%;
        border-bottom: 1px dashed #dcdcdc;
        .blockmsg {
          font-size: 18px;
          color: #9c8888;
        }
      }
      .mybt {
        text-align: center;
      }
    }
  }
}
</style>