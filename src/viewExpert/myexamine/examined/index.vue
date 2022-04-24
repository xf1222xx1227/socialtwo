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
      <ExaminedTable
        ref="examinedTable"
        :datadetail="dataDetail"
        @Fresh="reFresh"
      />
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import ExaminedTable from "./examinedTable.vue";
import Details from "../../../views/Items/ExamineInvitation/itemDetails.vue";
export default {
  components: {
    ExaminedTable,
    Details,
  },
  data() {
    return {
      visible: false,
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
    //  获取细审项目
    this.getItems();

    this.getCounted();
  },
  methods: {
    addHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#3341eb";
    },
    deleteHoverStyle(data) {
      // console.log(111, data);
      let dom = document.getElementsByClassName(data)[0];

      dom.style.color = "#668B8B";
    },
    getItems() {
      this.$api
        .getOneExpertDetailItems({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.dataListTotal = res.data.result;
              // console.log(333, res.data.result);
            }
          }
        });
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
      this.$refs.examinedTable.filter = data;
    },
    // 点击项目详情时
    itemDetailClick(data) {
      this.dataDetail = data;
      this.$refs.dialogDetail.visible = true;
    },
    // 获取项目已经细审的人数
    getCounted() {
      this.$api
        .getOneExpertItemDetailedcount({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res);
            let data = res.data.result;
            // if (res.data.status == 200) {
            this.dataDetailedCount = data;
            this.concatInfoAndCount();
            // }
          }
        });
    },
    // 连接项目详情以及已经细审人数
    concatInfoAndCount() {
      let data = [];
      for (let i = 0; i < this.dataListTotal.length; i++) {
        data.push(this.dataListTotal[i]);
        if (!myFunctions.isEmpty(this.dataDetailedCount)) {
          for (let j = 0; j < this.dataDetailedCount.length; j++) {
            if (
              this.dataListTotal[i].it_id == this.dataDetailedCount[j].it_id
            ) {
              data[i].count = this.dataDetailedCount[j].count;
              break;
            } else {
              data[i].count = 0;
            }
          }
        } else {
          data[i].count = 0;
        }
      }
      this.dataList = data;
      this.dataListAll = data;
      // console.log(111, this.dataList);
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        // this.getCounted(); // 重新获取项目已经审核人数
        this.fresh = "0";
      }
    },
    visible(newval, val) {
      if (newval == true) {
        this.getCounted();
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
    // height: 100%;
    overflow: auto;
    // white-space: nowrap;
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