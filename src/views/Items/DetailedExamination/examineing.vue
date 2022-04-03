<template>
  <div class="total" v-show="visible">
    <div class="leftList">
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
          @dblclick="finishFirst(item)"
        >
          {{ item.name + "(" + item.count + "条)" }}
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
    <div class="rightTable">
      <ExamineingTable
        ref="examineingTable"
        :datadetail="dataDetail"
        @Fresh="reFresh"
      />
    </div>
    <FinishFirst ref="dialogfinishfirst" :datadetail="datafinish" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import ExamineingTable from "./examineingTable.vue";
import Details from "../ExamineInvitation/itemDetails.vue";
import FinishFirst from "../ExamineInvitation/finishFirst.vue";
export default {
  components: {
    ExamineingTable,
    Details,
    FinishFirst,
  },
  data() {
    return {
      visible: true,
      dataList: [],
      dataListAll: [],
      dataListTotal: [], // 未添加条数
      dataDetailCount: [],
      dataDetailedCount: [],
      dataDetail: {},
      fresh: "0",
      datafinish: {},
    };
  },
  created() {
    // 获取每个项目审核总条数
    this.getCount();
    //  获取细审项目
    this.$api
      .getBiddingItemsToDetail({
        userid: sessionStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            this.dataListTotal = res.data.result;
            // console.log("获取项目");
            this.concatInfoAndCount();
          }
        }
      });
    // 获取项目已经审核条数
    this.getCounted();
  },
  methods: {
    addHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#3341eb";
    },
    deleteHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#ff00ff";
    },
    finishFirst(data) {
      this.datafinish = data;
      this.$refs.dialogfinishfirst.visible = true;
    },
    // 点击项目列表时
    itemClick(data, dataObj) {
      this.dataitem = dataObj;
      let doms = document.getElementsByClassName("listItem");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].className.indexOf(data) != -1) {
          doms[i].style.background = "#FFEBCD";
        } else {
          doms[i].style.background = "#f5f5f5";
        }
      }
      this.$refs.examineingTable.filter = data;
    },
    // 点击项目详情时
    itemDetailClick(data) {
      this.dataDetail = data;
      this.$refs.dialogDetail.visible = true;
    },
    // 获取项目细审总人数
    getCount() {
      this.$api
        .getItemDetailcount({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            // console.log("总条数");
            if (res.data.status == 200) {
              this.dataDetailCount = data;
            }
          }
        });
    },
    // 获取项目已经细审的人数
    getCounted() {
      this.$api
        .getItemDetailedcount({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            // console.log("已经审核条数");
            if (res.data.status == 200) {
              this.dataDetailedCount = data;
              this.reduceCount();
            }
          }
        });
    },
    // 连接项目详情以及细审总人数
    concatInfoAndCount() {
      // console.log("连接");
      let data = [];
      for (let i = 0; i < this.dataListTotal.length; i++) {
        data.push(this.dataListTotal[i]);
        if (this.dataDetailCount.length > 0) {
          for (let j = 0; j < this.dataDetailCount.length; j++) {
            if (this.dataListTotal[i].it_id == this.dataDetailCount[j].it_id) {
              data[i].count = this.dataDetailCount[j].count;
              break;
            } else {
              data[i].count = 0;
            }
          }
        } else {
          data[i].count = 0;
        }
        // this.dataListAll.push(data[i]);
      }
      this.dataList = data;
      this.dataListAll = data;
      // console.log(1234, this.dataListAll);
    },
    // 减去已经审核的人数
    reduceCount() {
      // console.log("减去");
      if (!myFunctions.isEmpty(this.dataDetailedCount)) {
        this.dataList = [];
        let list = [];
        for (let i = 0; i < this.dataListAll.length; i++) {
          list.push(this.dataListAll[i]);
          for (let j = 0; j < this.dataDetailedCount.length; j++) {
            if (this.dataListAll[i].it_id == this.dataDetailedCount[j].it_id) {
              let count1 = this.dataListAll[i].count;
              let count2 = this.dataDetailedCount[j].count;
              list[i].count = count1 - count2;
              break;
            }
          }
        }
        this.dataList = list;
        // console.log(333, this.dataListAll);
      }
    },
    // 偏方审核后减一
    reduceCounted(itid) {
      // console.log(11111, itid);
      this.dataList = [];
      let data = [];
      for (let i = 0; i < this.dataListAll.length; i++) {
        data.push(this.dataListAll[i]);
        if (this.dataListAll[i].it_id == itid) {
          data[i].count -= 1;
        }
      }
      this.dataList = data;
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        // this.getCounted(); // 重新获取项目已经审核人数
        // this.reduceCount();
        this.reduceCounted(this.dataitem.it_id);
        this.fresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  //   border: 1px solid red;
  height: 83vh;
  display: flex;
  flex-flow: row;
  .leftList {
    flex: 1;
    height: 100%;
    overflow: auto;
    white-space: nowrap;
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
  .rightTable {
    flex: 4;
    height: 100%;
    border-left: 1px solid green;
    .tabs {
      width: 100%;
      height: 100%;
      .el-tabs__content {
        position: static;
        height: 90%;
        border: 1px solid green;
        border-left: none;
        .tab_item {
          height: 100%;
        }
      }
    }
  }
}
</style>