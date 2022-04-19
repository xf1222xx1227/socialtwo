<template>
  <div class="total" v-if="visible">
    <div
      class="rankListItem"
      style="
        display: flex;
        flex-flow: row;
        border-top: 1px solid #7fffd4;
        align-items: center;
        cursor: pointer;
      "
    >
      <div class="rank">排名</div>
      <div class="photo"></div>
      <div class="name">姓名</div>
      <div class="point">得分</div>
      <div class="state">定标</div>
    </div>
    <div
      class="rankListItem"
      :class="item.ex_id"
      :id="item.ex_id"
      v-for="item in dataList"
      :key="item.ex_id"
      @click="itemClick(item.ex_id, item)"
    >
      <div class="rank" :class="'rank' + item.index">
        {{ item.index }}
      </div>
      <div class="photo" :class="'photo' + item.index">
        <img class="ph" :class="'ph' + item.index" :src="item.photo" />
      </div>
      <div class="name" :class="'name' + item.index">{{ item.name }}</div>
      <div class="point" :class="'point' + item.index">
        {{ item.average_total }}
      </div>
      <div
        class="state"
        :class="'state' + item.index"
        v-show="item.state + '' == '-1'"
      >
        <el-tooltip
          effect="light"
          content="邀请完成项目"
          placement="left"
          style="width: 50%"
        >
          <el-button @click="add(item)" type="text" size="small">
            <i class="el-icon-circle-plus-outline icon"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div
        class="state"
        :class="'state' + item.index"
        v-show="item.state + '' == '0'"
      >
        <el-tooltip
          effect="light"
          content="未应答，点击修改邀请信息"
          placement="left"
          style="width: 50%"
        >
          <el-button @click="edit(item)" type="text" size="small">
            <i class="el-icon-edit icon"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div
        class="state"
        :class="'state' + item.index"
        v-show="item.state + '' == '1'"
      >
        <el-tooltip
          effect="light"
          content="专家已经接受项目，等待开标"
          placement="left"
          style="width: 50%"
        >
          <el-button type="success" size="small" circle>
            <i class="el-icon-check icon"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div
        class="state"
        :class="'state' + item.index"
        v-show="item.state + '' == '2'"
      >
        <el-tooltip
          effect="light"
          content="该专家暂不参加该项目"
          placement="left"
          style="width: 50%"
        >
          <el-button type="danger" size="small" circle>
            <i class="el-icon-error icon"></i>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <Add ref="dialogadd" :datadetail="datatoadd" @Fresh="getfresh" />
    <Edit ref="dialogedit" :datadetail="datatedit" @Fresh="getfresh" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Add from "./add.vue";
import Edit from "./edit.vue";
export default {
  props: ["datadetail", "dataitid"],
  components: { Add, Edit },
  data() {
    return {
      visible: false,
      dataList: [],
      dataListAll: [],
      it_id: "",
      exid: "",
      dataCalibrationed: [],

      datatoadd: {},
      datatedit: {},

      fresh: "0",
    };
  },
  created() {},
  methods: {
    // 点击项目列表时
    itemClick(data, dataObj) {
      this.exid = data;
      this.$emit("sendExid", this.exid);
      let doms = document.getElementsByClassName("rankListItem");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].className.indexOf(data) != -1) {
          doms[i].style.background = "#FFEBCD";
        } else {
          doms[i].style.background = "#f5f5f5";
        }
      }
    },
    // 获取某个项目的定标信息
    getCalibrationed(itid) {
      this.dataCalibrationed = [];
      this.$api
        .getOneItemCalibrationed({
          it_id: itid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataCalibrationed = data;
              // console.log("项目定标信息", data);
            }
            this.getRank(itid);
          }
        });
    },
    getRank(newval) {
      this.dataList = [];
      this.dataListAll = [];
      this.$api
        .getCalibrationOneItemRank({
          it_id: newval,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              // 计算分数
              data = myFunctions.calculationPoint(data);
              // 排序
              data = myFunctions.sortData(data, "average_total");
              // 添加排行
              let j = 0;
              for (let i = 0; i < data.length; i++) {
                if (
                  i > 0 &&
                  data[i].average_total != data[i - 1].average_total
                ) {
                  j++;
                }
                data[i].index = j + 1;
                if (j == 0) {
                  data[
                    i
                  ].photo = require("../../../../assets/images/rankFirst.png");
                } else if (j == 1) {
                  data[
                    i
                  ].photo = require("../../../../assets/images/rankSecond.png");
                } else if (j == 2) {
                  data[
                    i
                  ].photo = require("../../../../assets/images/rankThird.png");
                } else {
                }
              }
              // 添加是否已经定标
              for (let i = 0; i < data.length; i++) {
                if (
                  !myFunctions.isEmpty(this.dataCalibrationed) &&
                  myFunctions.dataInObj(
                    data[i].ex_id,
                    "ex_id",
                    this.dataCalibrationed
                  )
                ) {
                  for (let j = 0; j < this.dataCalibrationed.length; j++) {
                    if (
                      this.dataCalibrationed[j].it_id == this.dataitid &&
                      this.dataCalibrationed[j].ex_id == data[i].ex_id
                    ) {
                      data[i].state = this.dataCalibrationed[j].state;
                      break;
                    }
                  }
                } else {
                  data[i].state = -1;
                }
              }

              this.dataList = data;
              this.dataListAll = data;
              // console.log("项目排行信息", data);
              // console.log(111, data);
            }
          }
        });
    },
    // 新增会导致v-for出错，无法加载
    add(data) {
      this.datatoadd = data;
      this.$refs.dialogadd.visible = true;
    },
    edit(data) {
      this.datatedit = data;
      this.$refs.dialogedit.visible = true;
    },
    getfresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    dataitid(newval, val) {
      this.getCalibrationed(newval);

      // this.getRank(newval);
    },
    visible(newval, val) {
      // console.log(newval);
    },
    fresh(newval, val) {
      if (newval == "1") {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].ex_id == this.datatoadd.ex_id) {
            this.dataList[i].state = "0";
            break;
          }
        }
        this.fresh = "0";
      } else if (newval == "2") {
        console.log(2222222, this.datatedit);
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].ex_id == this.datatedit.ex_id) {
            this.dataList[i].state = "-1";
            break;
          }
        }
        // this.dataitid = "";
        // this.dataitid = this.datatedit.it_id;
        this.fresh = "0";
      }
      // if (newval != "0") {
      //   this.visible = false;
      //   this.fresh = "0";
      // } else {
      //   this.visible = true;
      // }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  overflow: auto;
  // border: 1px solid red;
  .rankListItem {
    height: 40px;
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid #7fffd4;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .rank {
      flex: 2;
      text-align: center;
    }
    .photo {
      flex: 2;
      text-align: center;
      .ph1 {
        width: 50%;
        height: 50%;
      }
      .ph2 {
        width: 45%;
        height: 45%;
      }
      .ph3 {
        width: 40%;
        height: 40%;
      }
    }
    .name {
      flex: 3;
      text-align: center;
    }
    .point {
      flex: 2;
      text-align: center;
    }
    .state {
      flex: 3;
      text-align: center;
      // height: 60%;
      width: 30%;
      .icon {
        font-size: 18px;
      }
    }
    .rank1 {
      font-size: 22px;
      color: #ffd900;
    }
    .photo1,
    .name1,
    .point1 {
      color: #ffd900;
    }
    .rank2 {
      font-size: 19px;
      color: #c0c0c0;
    }
    .photo2,
    .name2,
    .point2 {
      color: #c0c0c0;
    }
    .rank3 {
      font-size: 17px;
      color: #b89b33;
    }
    .photo3,
    .name3,
    .point3 {
      color: #b89b33;
    }
  }
}
</style>