<template>
  <el-dialog
    width="85%"
    title="课题申报"
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
        <el-row class="row">
          <el-col :span="24" class="col">
            <div class="tabletitle">{{ ruleForm.title }}</div>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :soan="24" class="col">
            <div class="block">
              <p class="blockmsg">基础信息</p>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col"
            >课题名称<span class="must">*</span></el-col
          >
          <el-col :span="21" class="col">
            <el-input
              v-model="ruleForm.name"
              clearable
              class="input"
              :disabled="disabled"
            ></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col"
            >推荐单位 <span class="must">*</span></el-col
          >
          <el-col :span="9" class="col">
            <el-select
              v-model="companytype"
              class="input"
              style="width: 100%"
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
          </el-col>
          <el-col :span="3" class="col">单位名称</el-col>
          <el-col :span="9" class="col">
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
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col"
            >申报类型 <span class="must">*</span></el-col
          >
          <el-col :span="4.5" class="col">
            <el-select
              v-model="ruleForm.declaretype"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optiondeclaretype"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="col">研究类型</el-col>
          <el-col :span="4.5" class="col">
            <el-select
              v-model="ruleForm.researchtype"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionresearchtype"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="col">同意转为立项不资助课题</el-col>
          <el-col :span="3" class="col">
            <el-radio v-model="nosupport" label="0" :disabled="disabled"
              >是</el-radio
            >
            <el-radio v-model="nosupport" label="1" :disabled="disabled"
              >否</el-radio
            >
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col"
            >一级学科 <span class="must">*</span></el-col
          >
          <el-col :span="6" class="col">
            <el-select
              v-model="majorone"
              class="input"
              style="width: 100%"
              clearable
              filterable
              @change="changemajor(ruleForm.majorone)"
              :disabled="disabled"
            >
              <el-option
                v-for="item in optiononemajors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="col"
            >二级学科<span class="must">*</span></el-col
          >
          <el-col :span="6" class="col">
            <el-select
              v-model="ruleForm.majortwo"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optiontwomajors"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="col"></el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col"
            >负责人 <span class="must">*</span></el-col
          >
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.name"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col">性别 </el-col>
          <el-col :span="3" class="col">
            <el-radio v-model="userdata.gender" :label="0" :disabled="disabled"
              >男</el-radio
            >
            <el-radio v-model="userdata.gender" :label="1" :disabled="disabled"
              >女</el-radio
            >
          </el-col>

          <el-col :span="3" class="col">民族</el-col>
          <el-col :span="3" class="col">
            <el-select
              v-model="userdata.nation"
              class="input"
              style="width: 100%"
              clearable
              filterable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optionnation"
                :key="item.id"
                :label="item.nation"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3" class="col">出生日期</el-col>
          <el-col :span="3" class="col">
            <el-date-picker
              v-model="userdata.birthdate"
              type="date"
              placeholder="选择日期"
              clearable
              style="width: 100%"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col">行政职务</el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.post"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col">专业职称 </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.title"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>

          <el-col :span="3" class="col">研究专长</el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.research_specialty"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col">最后学历</el-col>
          <el-col :span="3" class="col">
            <el-select
              v-model="education"
              class="input"
              style="width: 100%"
              clearable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optioneducation"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col">最高学位 </el-col>
          <el-col :span="3" class="col">
            <el-select
              v-model="userdata.degree"
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
          </el-col>
          <el-col :span="3" class="col">担任导师 </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.tutor"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>

          <el-col :span="3" class="col">工作单位</el-col>
          <el-col :span="9" class="col">
            <el-input
              v-model="userdata.workcompany"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col">办公电话 </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.workphone"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col"
            >手机号码<span class="must">*</span>
          </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.phone"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col">邮政编码 </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.postoffice"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>

          <el-col :span="3" class="col">邮箱</el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="userdata.email"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px" class="row">
          <el-col :span="3" class="col">通讯地址 </el-col>
          <el-col :span="15" class="col">
            <el-input
              v-model="userdata.address"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="3" class="col"> </el-col>
          <el-col :span="3" class="col"> </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="24" style="text-align: center">课题组成员</el-col>
        </el-row>
        <el-row style="margin-top: 10px; text-align: center">
          <el-col :span="1">序号</el-col>
          <el-col :span="3">姓名</el-col>
          <el-col :span="2">性别</el-col>
          <el-col :span="3">出生日期</el-col>
          <el-col :span="2">专业职称</el-col>
          <el-col :span="2">行政职务</el-col>
          <el-col :span="2">学历</el-col>
          <el-col :span="3">学位</el-col>
          <el-col :span="5">工作单位</el-col>
          <el-col :span="1">操作</el-col>
        </el-row>
        <el-row v-for="item in datamenber" :key="item.index">
          <el-col :span="1">
            <el-button style="width: 100%; height: 100%">{{
              item.index
            }}</el-button>
          </el-col>
          <el-col :span="3">
            <el-input
              v-model="item.name"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="item.gender"
              class="input"
              style="width: 100%"
              clearable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optiongender"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-date-picker
              v-model="item.birthdate"
              type="date"
              placeholder="选择日期"
              clearable
              style="width: 100%"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-col>
          <el-col :span="2">
            <el-input
              v-model="item.title"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-input
              v-model="item.post"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-select
              v-model="item.education"
              class="input"
              style="width: 100%"
              clearable
              :disabled="disabled"
            >
              <el-option
                v-for="item in optioneducation"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select
              v-model="item.degree"
              style="width: 100%"
              filterable
              :disabled="disabled"
            >
              <el-option
                v-for="item in dataDegree"
                :key="item.de_id"
                :label="item.name"
                :value="item.de_id"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input
              v-model="item.workcompany"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
          <el-col :span="1">
            <el-button
              type="warning"
              style="width: 100%; height: 100%"
              @click="deletemenber(item.index)"
              :disabled="disabled"
              ><i class="el-icon-delete"></i
            ></el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center">
            <el-button
              type="primary"
              style="width: 100px; height: 100%"
              @click="addmenber"
              :disabled="disabled"
              >新增成员</el-button
            >
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span="3" class="col">预期成果 </el-col>
          <el-col :span="15" class="col" style="justify-content: left">
            <el-checkbox-group
              v-model="ruleForm.checkList"
              :disabled="disabled"
            >
              <el-checkbox
                v-for="item in dataachievementstype"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="3" class="col">字数 </el-col>
          <el-col :span="3" class="col">
            <el-input
              v-model="ruleForm.number"
              type="text"
              clearable
              :disabled="disabled"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="3" class="col">成果去向 </el-col>
          <el-col :span="15" class="col" style="justify-content: left">
            <el-checkbox-group
              v-model="ruleForm.checkListGone"
              :disabled="disabled"
            >
              <el-checkbox
                v-for="item in optiontopicgone"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="3" class="col">计划完成时间 </el-col>
          <el-col :span="3" class="col">
            <el-date-picker
              v-model="ruleForm.finishdate"
              type="date"
              placeholder="选择日期"
              clearable
              style="width: 100%"
              :disabled="disabled"
            >
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :soan="24" class="col">
            <div class="block">
              <p class="blockmsg">
                课题设计论证(限5000字,用于存档,无需在意排版)
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="24" class="col">
            <el-input
              type="textarea"
              v-model="ruleForm.demonstration"
              :placeholder="placeholderdemonstration"
              :rows="10"
              :disabled="disabled"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :soan="24" class="col">
            <div class="block">
              <p class="blockmsg">活页上传</p>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align: center">
            <!-- <el-button
              type="primary"
              style="width: 100px; height: 100%"
              @click="addmenber"
              >上传附件</el-button
            > -->
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
                :disabled="disabled"
                >上传附件</el-button
              >
            </el-upload>
          </el-col>
        </el-row>
        <el-row class="row" style="margin-top: 10px">
          <el-col :span="4">已上传文件</el-col>
          <el-col :span="20" class="col">
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
                min-width="100"
              >
              </el-table-column>

              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, datafiles)"
                    type="text"
                    size="small"
                    :disabled="disabled"
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
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="Ok('ruleForm', '0')"
        v-show="showdelete && power == 'edit'"
        >暂 存</el-button
      >
      <el-button
        type="primary"
        @click="editinfo"
        v-show="!showdelete && power == 'edit'"
        >编 辑</el-button
      >
      <el-button
        type="primary"
        @click="Ok('ruleForm', '1')"
        v-show="power == 'edit'"
        >提 交</el-button
      >

      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import base from "../../../api/base";
import myFunctions from "@/myFunctions";
export default {
  props: ["datadetail"],
  data() {
    return {
      visible: false,
      showdelete: true,
      power: "detail",
      disabled: true,
      ruleForm: {
        title: "",
        name: "",
        // companytype: "",
        company: "",
        declaretype: "",
        researchtype: "",
        // majorone: "",
        majortwo: "",
        checkList: [],
        number: "",
        checkListGone: [],
        finishdate: "",
        demonstration: "",
      },
      companytype: "",
      majorone: "",
      userdata: {
        degree: "",
        name: "",
        gender: 0,
        nation: 1,
        birthdate: "",
        post: "",
        title: "",
        research_specialty: "",
        tutor: "",
        workcompany: "",
        workphone: "",
        phone: "",
        postoffice: "",
        email: "",
        address: "",
      },
      datauser: {},
      education: "",
      datamenber: [],
      rules: {},
      nosupport: "0",
      labelPosition: "left",
      dataachievementstype: [],
      datatopictype: [],
      companytypeoption: [],
      companyoption: [],
      optionresearchtype: [],
      optiondeclaretype: [],
      optiononemajors: [],
      optiontwomajors: [],
      optionnation: [],
      optioneducation: [],
      dataDegree: [],
      optionsDegree: [],
      optiongender: [
        {
          id: 0,
          name: "男",
        },
        { id: 1, name: "女" },
      ],
      optiontopicgone: [],
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

      placeholderdemonstration: ` 本表参照以下提纲撰写，要求逻辑清晰，主题突出，层次分明，内容翔实，排版清晰。除“研究基础”“参考文献”外，本表与《研究课题申报表》课题设计论证中内容一致,总字数不超过5000字。
        1.选题依据：国内外相关研究现状述评，选题的意义；
        2.研究内容：本课题研究的基本思路、主要内容和基本步骤；
        3.学术价值：本课题研究学术观点、学术思想的特色和创新；
        4.预期成果：预期成果及实际应用价值、成果去向；
        5.研究基础：课题负责人前期相关研究成果；
        6.参考文献:开展本课题研究的主要中外参考文献(课题负责人的成果除外)(限填10项)
        `,
      getdata: 0,
      setdata: 0,

      dataruleform: {},
      datauserdata: {},
      dataoldfiles: [],
      dataoldmenber: [],
    };
  },
  created() {
    // this.getdeclareinfo();
    // this.getmenberinfo();
    // this.getfileinfo();
    this.getachievementstype();
    this.gettopictype();
    this.getcompanytype();
    // this.getcompany();
    this.getonemajors();
    this.getnation();
    this.geteducation();
    this.getdegree();
    this.optionresearchtype = myFunctions.gettopicresearchtype();
    this.optiondeclaretype = myFunctions.gettopicdeclaretype();
    this.optiontopicgone = myFunctions.gettopicgone();
  },
  methods: {
    editinfo() {
      this.showdelete = true;
      this.disabled = false;
    },
    deletemenber(index) {
      let dataunder = [];
      for (let i = 0; i < this.datamenber.length; i++) {
        if (this.datamenber[i].index == index) {
          this.datamenber.splice(i, 1);
          break;
        }
      }
      for (let i = this.datamenber.length - 1; i > 0; i--) {
        if (this.datamenber[i].index - i > 1) {
          let data = this.datamenber[i];
          data.index = data.index - 1;
          dataunder.push(data);
          this.datamenber.splice(i, 1);
        }
      }
      if (dataunder.length > 0) {
        for (let i = dataunder.length - 1; i >= 0; i--) {
          this.datamenber.push(dataunder[i]);
        }
      }
    },
    addmenber() {
      let data = {
        index: 1,
        name: "",
        gender: "",
        birthdate: "",
        title: "",
        post: "",
        education: "",
        degree: "",
        workcompany: "",
      };
      if (this.datamenber.length > 0) {
        data.index = this.datamenber[this.datamenber.length - 1].index + 1;
      }
      this.datamenber.push(data);
    },
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    showtips(type, message) {
      let msg = "";
      if (type[0] == "s") {
        msg = message + "成功";
      } else if (type[0] == "e") {
        msg = message + "失败，请稍后再试";
      } else if (type[0] == "i") {
        msg = message;
      }
      if (!message) {
        var message = "";
      }
      this.$message({
        type: type,
        message: msg,
        offset: 150,
      });
    },

    // 判断填写是否合格
    fillqualified() {
      let alert = 0;
      if (this.ruleForm.name == "") {
        this.showtips("info", "课题名称不能为空");
        alert++;
      }
      if (this.ruleForm.companytype == "") {
        this.showtips("info", "推荐单位不能为空");
        alert++;
      }
      if (this.ruleForm.declaretype == "") {
        this.showtips("info", "申报类型不能为空");
        alert++;
      }
      if (this.ruleForm.majorone == "") {
        this.showtips("info", "一级学科不能为空");
        alert++;
      }
      if (this.ruleForm.majortwo == "") {
        this.showtips("info", "二级学科不能为空");
        alert++;
      }
      if (this.ruleForm.phone == "") {
        this.showtips("info", "手机号码不能为空");
        alert++;
      }
      for (let i = this.datamenber.length - 1; i >= 0; i--) {
        if (this.datamenber[i].name == "") {
          this.deletemenber(this.datamenber[i].index);
        }
      }
      let count = this.datamenber.length;
      let mincount = this.datadetail.mincount;
      let maxcount = this.datadetail.maxcount;
      if (mincount - 1 > count) {
        this.showtips("info", `课题组人员为${count}人，低于下限${mincount}`);
        alert++;
      }
      if (maxcount - 1 < count && maxcount != 0) {
        this.showtips("info", `课题组人员为${count}人，超过上限${maxcount}`);
        alert++;
      }
      return alert;
    },

    // 课题申报添加/修改
    adddeclare(id) {
      let education = this.education;
      let checkList = this.ruleForm.checkList.join(";");
      let checkListGone = this.ruleForm.checkListGone.join(";");
      let finishdate = myFunctions.newDateToDate(this.ruleForm.finishdate);
      let declaretime = myFunctions.newDateToDatetime();
      let userbirthdate = myFunctions.newDateToDate(this.userdata.birthdate);

      // 修改
      this.$api
        .updateDeclare({
          sb_id: id,
          topicid: this.datadetail.topicid,
          ex_id: sessionStorage.getItem("userid"),
          name: this.ruleForm.name,
          companytype: this.companytype,
          company: this.ruleForm.company,
          declaretype: this.ruleForm.declaretype,
          researchtype: this.ruleForm.researchtype,
          majorone: this.majorone,
          majortwo: this.ruleForm.majortwo,
          checkList: checkList,
          number: this.ruleForm.number,
          checkListGone: checkListGone,
          finishdate: finishdate,
          demonstration: this.ruleForm.demonstration,
          declaretime: declaretime,
          nosupport: this.nosupport,
          usereducation: education,
          userdegree: this.userdata.degree,
          useraddress: this.userdata.address,
          userbirthdate: userbirthdate,
          useremail: this.userdata.email,
          usergender: this.userdata.gender,
          username: this.userdata.name,
          usernation: this.userdata.nation,
          userphone: this.userdata.phone,
          userpost: this.userdata.post,
          usertitle: this.userdata.title,
          userpostoffice: this.userdata.postoffice,
          userresearch_specialty: this.userdata.research_specialty,
          usertutor: this.userdata.tutor,
          userworkcompany: this.userdata.workcompany,
          userworkphone: this.userdata.workphone,
        })
        .then((res) => {
          // console.log(111, this.ruleForm.name);
          this.$emit("refresh", "1");
          this.visible = false;
        });
    },
    // 申报添加申报文件添加
    adddeclarefiles(id, data) {
      this.$api
        .addDeclareFiles({
          topicid: this.datadetail.topicid,
          sb_id: id,
          upurl: data.upurl,
          uid: data.uid,
          url: data.url,
          name: data.name,
          uploadtime: data.uploadtime,
          size: data.size,
        })
        .then((res) => {});
    },
    deletedeclarefiles(id, data) {
      this.$api
        .deleteDeclareFiles({
          sb_id: id,
          upurl: data.upurl,
        })
        .then((res) => {});
    },
    // 申报成员添加
    adddeclaremenber(id, data) {
      this.$api
        .addDeclareMenbers({
          topicid: this.datadetail.topicid,
          sb_id: id,
          indexs: data.index,
          name: data.name,
          gender: data.gender,
          birthdate: myFunctions.newDateToDate(data.birthdate),
          title: data.title,
          post: data.post,
          education: data.education,
          degree: data.degree,
          workcompany: data.workcompany,
        })
        .then((res) => {});
    },
    // 申报状态添加
    adddeclarestate(id, val) {
      // console.log(111, val);
      let state;
      if (val == "0") {
        state = 0;
      } else {
        state = 1;
      }
      // 更改状态
      this.$api
        .updateOneDeclareState({
          sb_id: id,
          state: state,
        })
        .then((res) => {});
    },

    // 确定按钮
    Ok(formName, val) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let alert = this.fillqualified();
          if (alert == 0) {
            let id = this.datadetail.sb_id;
            // 课题申报添加 / 修改;
            this.adddeclare(id);
            // 申报添加申报文件添加/删除
            // 删除原来文件
            this.$api
              .deleteOneDeclareAllFiles({
                sb_id: id,
              })
              .then((res) => {
                if (res.status == 200) {
                  // 添加文件
                  for (let i = 0; i < this.datafiles.length; i++) {
                    this.adddeclarefiles(id, this.datafiles[i]);
                  }
                }
              });

            // 申报成员添加/删除
            this.$api
              .deleteDeclareMenbers({
                sb_id: id,
              })
              .then((res) => {
                if (res.status == 200) {
                  for (let i = 0; i < this.datamenber.length; i++) {
                    this.adddeclaremenber(id, this.datamenber[i]);
                  }
                }
              });

            // 申报状态添加
            this.adddeclarestate(id, val);
            if (val == "1") {
              this.$message({
                type: "success",
                message: "提交成功，请前往我的申报里面查看审核状态",
                offset: 150,
              });
            } else {
              this.$message({
                type: "success",
                message: "暂存成功，请前往我的申报里面查看",
                offset: 150,
              });
            }
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
      this.datafiles = this.successFlieList;
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
          this.getdata++;
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
          this.getdata++;
        }
      });
    },
    // 获取机构
    getcompanytype() {
      this.$api.getCompanyType({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.companytypeoption = data;
          this.getdata++;
        }
      });
    },
    getcompany(val) {
      // console.log(1111, val);
      this.companyoption = [];

      this.$api
        .getCompany({
          pid: val,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            this.companyoption = data;
            // this.getdata++;
          }
        });
      // console.log(333, this.dataruleform);
      if (this.ruleForm.company == "") {
        this.ruleForm.company = this.dataruleform.company;
      } else {
        this.ruleForm.company = "";
      }
    },
    changetype(val) {
      // this.ruleForm.company = "";
      // console.log("change");
      this.getcompany(val);
    },
    // 获取学科分类
    getonemajors() {
      this.$api.getOneMajors({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.optiononemajors = data;
          this.getdata++;
        }
      });
    },
    gettwomajors(val) {
      this.optiontwomajors = [];
      this.$api
        .getTwoMajors({
          pid: val,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            this.optiontwomajors = data;
            // this.getdata++;
          }
        });
      if (this.ruleForm.majortwo == "") {
        this.ruleForm.majortwo = this.dataruleform.majortwo;
      } else {
        this.ruleForm.majortwo = "";
      }
    },
    changemajor(val) {
      // this.ruleForm.majortwo = "";
      this.gettwomajors(val);
    },
    // 获取民族
    getnation() {
      this.$api.getNations({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.optionnation = data;
          this.getdata++;
        }
      });
    },
    // 获取学历
    geteducation() {
      this.$api.getEducation({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.optioneducation = data;
          this.getdata++;
        }
      });
    },
    getdegree() {
      this.$api.getDegree({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          this.dataDegree = data;
          this.getdata++;
        }
      });
    },

    // 获取申报信息
    getdeclareinfo() {
      this.$api
        .getOneExOneTopicDeclareInfo({
          sb_id: this.datadetail.sb_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result[0];
              this.dataruleform = data;
            }
            this.setdata++;
          }
        });
    },
    setdeclareinfo() {
      let data = this.dataruleform;
      // console.log(data);
      this.ruleForm.name = data.name;
      this.companytype = data.companytype;
      this.ruleForm.declaretype = data.declaretype;
      this.ruleForm.researchtype = data.researchtype;
      this.majorone = data.majorone;
      // this.ruleForm.majortwo = data.majortwo;
      this.ruleForm.checkList = data.checkList.split(";");
      this.ruleForm.number = data.number;
      this.ruleForm.checkListGone = data.checkListGone.split(";");
      this.ruleForm.finishdate = myFunctions.newDateToDate(data.finishdate);
      this.ruleForm.demonstration = data.demonstration;
    },
    setuserinfo() {
      let data = this.dataruleform;
      this.userdata.degree = data.userdegree;
      this.userdata.name = data.username;
      this.userdata.gender = data.usergender;
      this.userdata.nation = data.usernation;
      this.userdata.birthdate = data.userbirthdate;
      this.userdata.post = data.userpost;
      this.userdata.title = data.usertitle;
      this.userdata.research_specialty = data.userresearch_specialty;
      this.userdata.tutor = data.usertutor;
      this.userdata.workcompany = data.userworkcompany;
      this.userdata.workphone = data.userworkphone;
      this.userdata.phone = data.userphone;
      this.userdata.postoffice = data.userpostoffice;
      this.userdata.email = data.useremail;
      this.userdata.address = data.useraddress;
      this.education = data.usereducation;
    },
    // 获取成员信息
    getmenberinfo() {
      this.$api
        .getOneExOneTopicDeclareMenberInfo({
          sb_id: this.datadetail.sb_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].index = i + 1;
              }
              this.dataoldmenber = data;
            }
            this.setdata++;
          }
        });
    },
    setmenberinfo() {
      this.datamenber = this.dataoldmenber;
    },
    // 获取文件信息
    getfileinfo() {
      this.$api
        .getOneExOneTopicDeclareFilesInfo({
          sb_id: this.datadetail.sb_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.dataoldfiles = res.data.result;
            }
            this.setdata++;
          }
        });
    },
    setfileinfo() {
      this.datafiles = this.dataoldfiles;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        if (this.datadetail.type == "detail") {
          this.showdelete = false;
          this.disabled = true;
        } else if (this.datadetail.type == "edit") {
          this.showdelete = true;
          this.disabled = false;
        }
        if (this.datadetail.power == "detail") {
          this.power = "detail";
        } else {
          this.power = "edit";
        }
        this.getdeclareinfo();
        this.getmenberinfo();
        this.getfileinfo();

        this.dataDelete = [];
        this.deleteFiles = [];
        this.fileList = [];
        this.successFlieList = [];
        this.ruleForm.title = this.datadetail.name + "课题申报";
      } else {
        this.setdata = 0;
      }
    },
    type(n, o) {
      if (n == "detail") {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    education(newval, val) {
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
    setdata(n, o) {
      if (n == 3) {
        this.setdeclareinfo();
        this.setuserinfo();
        this.setmenberinfo();
        this.setfileinfo();
      }
    },
    companytype(n, o) {
      if (n != "") {
        this.getcompany(n);
      }
    },
    majorone(n, o) {
      // console.log(111, n);
      if (n != "") {
        this.gettwomajors(n);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 65vh;
  overflow: auto;
  .form {
    width: 95%;
    padding: 5px;
    border: 1px solid black;
    .tabletitle {
      height: 70px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 20px;
    }
    .block {
      width: 100%;
      border-bottom: 1px dashed #dcdcdc;
      .blockmsg {
        font-size: 18px;
        color: #9c8888;
      }
    }
    .row {
      font-size: 16px;
      display: flex;
      align-items: center;
      border: 0.5px solid rgb(102, 127, 150);

      .col {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .must {
          color: red;
        }
      }
    }
  }
}
// ::-webkit-scrollbar {
//   display: none; // 隐藏滚动条
// }
</style>