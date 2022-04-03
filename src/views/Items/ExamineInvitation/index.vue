<template>
  <div id="invitationtotal">
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
    <div class="rightData">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick" class="tabs">
        <el-tab-pane label="专家邀请" name="first" class="tab_item">
          <Invitation :dataitem="dataitem" :dataitid="dataitem.it_id" />
        </el-tab-pane>
        <el-tab-pane label="推荐邀请" name="second" class="tab_item">
          推荐
        </el-tab-pane>
        <el-tab-pane label="已邀请" name="third" class="tab_item">
          <Invitationed :dataitid="dataitem.it_id" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <invitationDetail :datadetail="dataDetail" /> -->
    <FinishFirst ref="dialogfinishfirst" :datadetail="datafinish" />
  </div>
</template>

<script>
import Details from "./itemDetails.vue"; // 项目详情
import Invitation from "./invitation.vue"; // 树和网格
// import invitationDetail from "./invitationDetail.vue"; // 弃用
import FinishFirst from "./finishFirst.vue"; // 结束初审
import Invitationed from "./invitationed.vue"; // 已经邀请
export default {
  components: {
    Details,
    Invitation,
    // invitationDetail,
    FinishFirst,
    Invitationed,
  },
  data() {
    return {
      dataList: [],
      dataListAll: [],
      dataSearch: {
        name: "",
        type: "",
      },
      dataDetail: {},
      datafinish: {},
      activeName: "first",
      dataitem: {},
    };
  },
  created() {
    // console.log(111, parseInt(0.0000005));
    // 获取正在招标项目数据
    this.$api
      .getBiddingItems({
        userid: sessionStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.dataList = data;
            // this.dataList = this.dataList.concat(data);  // 数据乘二，看滚动效果
            this.dataListAll = data;
          }
        }
      });
  },
  methods: {
    addHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#3341eb";
      // dom.style.background = "#FFEBCD";
    },
    deleteHoverStyle(data) {
      let dom = document.getElementsByClassName(data)[0];
      dom.style.color = "#ff00ff";
      // dom.style.background = "#f5f5f5";
    },
    finishFirst(data) {
      this.datafinish = data;
      this.$refs.dialogfinishfirst.visible = true;
    },
    itemClick(data, dataObj) {
      // console.log(111, dataObj);
      // let dom = document.getElementsByClassName(data)[0];
      // dom.style.background = "#FFEBCD";
      this.dataitem = dataObj;
      let doms = document.getElementsByClassName("listItem");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].className.indexOf(data) != -1) {
          doms[i].style.background = "#FFEBCD";
          // this.dataitem = data;
        } else {
          doms[i].style.background = "#f5f5f5";
        }
      }
    },
    itemDetailClick(data) {
      this.dataDetail = data;
      // console.log(222, data);
      this.$refs.dialogDetail.visible = true;
    },
    search() {},
    tabHandleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style lang="less">
#invitationtotal {
  height: 92vh;
  // border: 1px solid black;
  display: flex;
  flex-flow: row;
  .leftList {
    flex: 1;
    overflow: auto;
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
  .rightData {
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
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  display: none; // 隐藏滚动条
}
</style>