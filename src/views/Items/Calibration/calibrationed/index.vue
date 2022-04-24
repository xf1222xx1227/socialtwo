<template>
  <div class="totalCalibrationed" v-show="visible">
    <div class="search">
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-input
          v-model="dataSearch.name"
          clearable
          class="text"
          @keyup.enter.native="search"
        ></el-input>
      </div>
      <div class="textboxp">
        <div class="p">发布区间：</div>
        <el-date-picker
          v-model="dataSearch.time_release"
          clearable
          class="text"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          style="width: 100%"
        ></el-date-picker>
      </div>
      <div class="textboxp">
        <!-- <div class="p">项目名称：</div>
        <el-input v-model="dataSearch.other" clearable class="text"></el-input> -->
      </div>
      <div class="bt">
        <el-button type="primary" @click="search" icon="el-icon-search" round
          >搜索</el-button
        >
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <div
          class="listItem"
          :class="item.it_id"
          v-for="item in dataList"
          :key="item.it_id"
          style="
            display: flex;
            flex-flow: row;
            border-top: 1px solid #7fffd4;
            align-items: center;
            color: #668b8b;
            cursor: pointer;
          "
        >
          <p
            class="listP"
            :class="item.it_id + 'p'"
            style="flex: 5"
            @click="itemClick(item.it_id, item)"
            @mouseover="addHoverStyle(item.it_id)"
            @mouseout="deleteHoverStyle(item.it_id)"
          >
            {{ item.name }}
          </p>
          <div
            class="listDetail"
            style="flex: 1; color: yellowgreen; text-align: center"
            @click="itemDetailClick(item)"
          >
            <el-tooltip effect="light" content="项目详情" placement="top">
              <i class="el-icon-view"></i>
            </el-tooltip>
          </div>
        </div>
        <Details ref="dialogDetail" :datadetail="dataDetail" />
      </div>

      <div class="right">
        <Table :datadetail="datarank" :dataitid="dataitid" @refresh="reFresh" />
        <!-- @sendExid="getExid" -->
      </div>
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Details from "../../ExamineInvitation/itemDetails.vue";
import Table from "./Table.vue";
export default {
  components: { Details, Table },
  data() {
    return {
      visible: false,

      dataSearch: { name: "", time_release: "", other: "" },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dataList: [],
      dataListAll: [],

      dataDetail: {},
      dataitid: "",
      datarank: {},

      fresh: "0",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.dataList = [];
      this.dataListAll = [];
      this.$api
        .getCalibrationedItems({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataList = data;
              this.dataListAll = data;
            }
          }
        });
    },
    search() {
      let name = this.dataSearch.name;
      this.dataList = [];
      let data = [];
      for (let i = 0; i < this.dataListAll.length; i++) {
        let xdata = this.dataListAll[i];
        if (xdata.name.indexOf(name) != -1) {
          if (this.dataSearch.time_release) {
            let btime =
              this.dataSearch.time_release[0] == ""
                ? ""
                : myFunctions.newDateToDate(this.dataSearch.time_release[0]);
            let ftime =
              this.dataSearch.time_release[1] == ""
                ? ""
                : myFunctions.newDateToDate(this.dataSearch.time_release[1]);
            if (
              (xdata.time_release > btime && xdata.time_release < ftime) ||
              btime == "" ||
              ftime == ""
            ) {
              data.push(xdata);
            }
          } else {
            data.push(xdata);
          }
        }
      }
      this.dataList = data;
      this.datarank = {};
      this.dataitid = "";
    },

    // 设置列表样式
    addHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#3341eb";
    },
    deleteHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#668B8B";
    },
    // 点击项目列表时
    itemClick(data, dataObj) {
      // console.log(222, dataObj);
      this.datarank = dataObj;
      this.dataitid = dataObj.it_id;
      let doms = document.getElementsByClassName("listItem");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].className.indexOf(data) != -1) {
          doms[i].style.background = "#FFEBCD";
        } else {
          doms[i].style.background = "#f5f5f5";
        }
      }
    },
    // 点击项目详情时
    itemDetailClick(data) {
      this.dataDetail = data;
      this.$refs.dialogDetail.visible = true;
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.getList();
      }
    },
    fresh(newval, val) {
      if (newval != "0") {
        this.getList();
        this.fresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.totalCalibrationed {
  height: 83vh;
  display: flex;
  flex-flow: column;
  .search {
    // height: 100px;
    height: 9vh;
    display: flex;
    flex-flow: row;
    align-items: center;
    // border: 1px solid red;
    .textboxp {
      flex: 4;
      display: flex;
      align-items: center;
      flex-flow: row;
      .p {
        flex: 2;
        text-align: center;
      }
      .text {
        flex: 4;
      }
    }
    .bt {
      flex: 1;
      //   border: 1px solid blue;
      text-align: center;
    }
  }
  .bottom {
    // flex: 1;
    height: 74vh;
    display: flex;
    flex-flow: row;
    border-top: 1px solid red;
    .left {
      // border: 1px solid red;
      flex: 1;
      overflow: auto;
      // white-space: nowrap;
      border-right: 1px solid blue;
      .listItem {
        height: 40px;
        font-size: 16px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        .listP,
        .listDetail {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
    .right {
      flex: 5.5;
      // border: 1px solid red;
    }
  }
}
</style>