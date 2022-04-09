<template>
  <div class="total" v-show="visible">
    <div class="search">
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-select
          v-model="dataSelect"
          filterable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataList"
            :key="item.it_id"
            :label="item.name"
            :value="item.it_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="textboxp"></div>
      <div class="textboxp"></div>
      <div class="bt"></div>
    </div>
    <div class="form">
      <div class="item">
        <ItemInfo :dataitid="dataSelect" />
      </div>
      <div class="calibration">
        <CalibrationInfo :dataitid="dataSelect" @refresh="reFresh" />
      </div>
      <div class="bid">
        <BidInfo :dataitid="dataSelect" />
      </div>
    </div>
  </div>
</template>

<script>
import ItemInfo from "./itemInfo.vue";
import CalibrationInfo from "./calibrationInfo.vue";
import BidInfo from "./bidInfo.vue";
export default {
  components: { ItemInfo, CalibrationInfo, BidInfo },
  data() {
    return {
      visible: false,

      dataList: [],
      dataListAll: [],
      dataSelect: "",
      fresh: "0",
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    getListData() {
      this.dataList = [];
      this.dataListAll = [];
      this.dataSelect = "";
      this.$api
        .getOneExpertCalibrationingItems({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataList = data;
              this.dataListAll = data;
              this.dataSelect = data[0].it_id;
              this.$emit("getbadge", data.length);
            } else {
              this.$emit("getbadge", 0);
            }
          }
        });
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval != "0") {
        this.getListData();
        // this.$emit("refresh", "1");
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
  //   height: 84vh;
  display: flex;
  flex-flow: column;
  .search {
    height: 9vh;
    display: flex;
    flex-flow: row;
    align-items: center;
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
  .form {
    flex: 15;
    // height: 75vh;
    display: flex;
    flex-flow: row;
    border-top: 1px solid blue;
    .item {
      flex: 3;
      border-right: 1px solid blue;
    }
    .calibration {
      flex: 5;
      border-right: 1px solid blue;
    }
    .bid {
      flex: 3;
    }
  }
}
</style>