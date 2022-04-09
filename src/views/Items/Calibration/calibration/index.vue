<template>
  <div class="totalCalibration" v-show="visible">
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
            color: #ff00ff;
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
            @dblclick="finishExamine(item)"
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
      <div class="centerlist">
        <ExamineTable
          ref="examineTable"
          :dataitid="dataitid"
          :dataexid="dataexid"
        />
      </div>
      <div class="right">
        <Ranking
          ref="rank"
          :datadetail="datarank"
          :dataitid="dataitid"
          @sendExid="getExid"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Details from "../../ExamineInvitation/itemDetails.vue";
import Ranking from "./ranking.vue";
import ExamineTable from "../first/centerTable.vue";
import myFunctions from "@/myFunctions";
export default {
  components: { Details, Ranking, ExamineTable },
  data() {
    return {
      visible: true,
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

      datafinish: {},
      dataDetail: {},
      datarank: {},
      dataitid: "",

      dataexid: "",

      finishdata: "error", // 为success时刷新列表
      finishformdata: {},
      fresh: "0",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$api
        .getCalibrationExaminedItem({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              //   this.dataListTotal = res.data.result;
              let data = res.data.result;
              this.dataList = data;
              this.dataListAll = data;
              // console.log("获取项目");
              //   this.concatInfoAndCount();
            }
          }
        });
    },
    search() {
      // console.log(111, this.dataSearch);
      let name = this.dataSearch.name;
      this.dataList = [];
      let data = [];
      for (let i = 0; i < this.dataListAll.length; i++) {
        let xdata = this.dataListAll[i];
        if (xdata.name.indexOf(name) != -1) {
          if (this.dataSearch.time_release) {
            let btime = myFunctions.newDateToDate(
              this.dataSearch.time_release[0]
            );
            let ftime = myFunctions.newDateToDate(
              this.dataSearch.time_release[1]
            );
            if (xdata.time_release > btime && xdata.time_release < ftime) {
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
    // 结束初审细审的数据
    getfinishdata(val) {
      this.finishdata = val;
    },
    getformdata(val) {
      this.finishformdata = val;
    },
    // 获取选择的专家
    getExid(val) {
      this.dataexid = val;
    },
    // 设置列表样式
    addHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#3341eb";
    },
    deleteHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#ff00ff";
    },
    finishExamine(data) {
      this.datafinish = data;
      this.$refs.dialogfinishfirst.visible = true;
    },
    // 点击项目列表时
    itemClick(data, dataObj) {
      // console.log(222, dataObj);
      this.$refs.rank.visible = false;
      this.$refs.rank.visible = true;
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
  },
  watch: {
    finishdata(newval, val) {
      if (newval == "success") {
        let date = myFunctions.newDateToDatetime(new Date());
        // 初审结束进入细审
        let data = this.finishformdata;
        if (data.finishtime != "" && data.finishtime < date) {
          this.$api
            .updateBiddindPreToDetail({
              it_id: data.it_id,
            })
            .then((res) => {
              if (res.status == 200) {
                this.fresh = "1";
              }
            });
        }
        // 细审结束变成定标项目
        if (data.detailfinishtime != "" && data.detailfinishtime < date) {
          this.$api
            .updateDetailToCalibration({
              it_id: data.it_id,
            })
            .then((res) => {
              if (res.status == 200) {
                this.fresh = "2";
              }
            });
        }
        this.finishdata = "error";
      }
    },
    fresh(newval, val) {
      if (newval != "0") {
        let itid = this.datafinish.it_id;
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].it_id == itid) {
            this.dataList.splice(i, 1);
            break;
          }
        }
        this.fresh = "0";
      }
    },
    dataexid(newval, val) {
      // console.log(111, newval);
    },
    visible(newval, val) {
      if (newval == true) {
        this.getList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.totalCalibration {
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
      flex: 1;
      overflow: auto;
      white-space: nowrap;
      border-right: 1px solid blue;
      .listItem {
        height: 40px;
        font-size: 16px;
        padding-left: 20px;
        .listP,
        .listDetail {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }
    .centerlist {
      flex: 4;
      border-right: 1px solid blue;
    }
    .right {
      flex: 1.5;
      min-width: 200px;
    }
  }
}
</style>