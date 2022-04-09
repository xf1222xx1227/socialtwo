<template>
  <div class="total">
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
          <el-button
            @click="deleteExpert(item)"
            type="success"
            size="small"
            round
          >
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
          <el-button type="danger" size="small" round>
            <i class="el-icon-error icon"></i>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="bt">
      <el-button type="primary" @click="openItem" round :disabled="btDisable"
        >项目开标</el-button
      >
    </div>
    <Add ref="dialogadd" :datadetail="datatoadd" @Fresh="getfresh" />
    <Edit ref="dialogedit" :datadetail="datatedit" @Fresh="getfresh" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Add from "../calibration/add.vue";
import Edit from "../calibration/edit.vue";
export default {
  props: ["datadetail", "dataitid"],
  components: { Add, Edit },
  data() {
    return {
      dataList: [],
      dataListAll: [],
      //   it_id: "",
      exid: "",
      //   表格数据
      dataCalibrationed: [],

      datatoadd: {},
      datatedit: {},

      btDisable: true,

      fresh: "0",
    };
  },
  created() {
    // console.log(this.dataitid);
    // let data = [];
    // console.log(111, data.length);
    // if (data) {
    //   console.log(222);
    // } else {
    //   console.log(333);
    // }
    this.judgeDisabled();
  },
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
      // console.log(dataObj);
    },
    // 获取某个项目定标情况
    getCalibrationed(itid) {
      this.$api
        .getOneItemCalibrationed({
          it_id: itid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let xdata = res.data.result;
              this.dataCalibrationed = xdata;
              // console.log(222, this.dataCalibrationed);
              this.getRank(this.dataitid);
            }
          }
        });
    },
    getRank(newval) {
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
                  for (let k = 0; k < this.dataCalibrationed.length; k++) {
                    if (
                      this.dataCalibrationed[k].it_id == this.dataitid &&
                      this.dataCalibrationed[k].ex_id == data[i].ex_id
                    ) {
                      data[i].state = this.dataCalibrationed[k].state;
                      break;
                    }
                  }
                } else {
                  data[i].state = -1;
                }
              }

              this.dataList = data;
              this.dataListAll = data;
            }
            this.judgeDisabled();
          }
        });
    },
    add(data) {
      this.datatoadd = data;
      this.$refs.dialogadd.visible = true;
    },
    edit(data) {
      this.datatedit = data;
      this.$refs.dialogedit.visible = true;
    },
    deleteExpert(data) {
      this.$confirm(`是否确定撤销对该专家的邀请信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        this.$api
          .deleteCalibration({
            it_id: this.dataitid,
            ex_id: data.ex_id,
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "撤销成功",
                offset: 150,
              });
              this.fresh = "2";
            } else {
              this.$message({
                type: "error",
                message: "撤销失败，请稍后再试",
                offset: 150,
              });
            }
          });
      });
    },
    // 项目开标
    openItem() {
      // console.log(111, this.dataitid);
      let data = this.searchHaveCalibrationed();
      // console.log(111, data);
      if (data.length > 1) {
        this.$message({
          type: "error",
          message: `项目仅能交给一个专家/团队，当前为${data.length}个，请删减至一个`,
          offset: 150,
        });
      } else {
        this.$confirm(
          `是否确定此项目开标?
         应邀专家为：${data}`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }
        ).then(() => {
          this.$api
            .updateCalibrationToOpen({
              it_id: this.dataitid,
            })
            .then((res) => {
              if (res.status == 200) {
                let data = this.searchHaveCalibrationedExid();
                let success = "1";
                if (data.length > 0) {
                  for (let i = 0; i < data.length; i++) {
                    let it_id = this.dataitid;
                    let ex_id = data[i];
                    let time_open = myFunctions.newDateToDate(new Date());
                    let userid = sessionStorage.getItem("userid");
                    this.$api
                      .addBidOpening({
                        it_id: it_id,
                        ex_id: ex_id,
                        time_open: time_open,
                        userid: userid,
                      })
                      .then((res) => {
                        if (res.status == 200) {
                        } else {
                          success = "0";
                        }
                      });
                  }
                }
                if (success == "1") {
                  this.$message({
                    type: "success",
                    message: "开标成功，请前往开标项目查看进度",
                    offset: 150,
                  });
                  this.judgeDisabled();
                  this.dataList = [];
                  this.dataListAll = [];
                  this.$emit("refresh", "1");
                } else {
                  this.$message({
                    type: "error",
                    message: "开标失败，请稍后再试",
                    offset: 150,
                  });
                }
              }
            });
        });
      }
    },
    // 判断按钮的禁用状态
    judgeDisabled() {
      if (!this.dataitid) {
        this.btDisable = true;
      } else {
        let data = this.searchHaveCalibrationed();
        if (data.length < 1) {
          this.btDisable = true;
        } else {
          this.btDisable = false;
        }
      }
    },
    // 寻找等待开标的专家name
    searchHaveCalibrationed() {
      let data = [];
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].state == 1) {
          data.push(this.dataList[i].name);
        }
      }
      // console.log(data);
      return data;
    },
    // 寻找等待开标的专家name
    searchHaveCalibrationedExid() {
      let data = [];
      for (let i = 0; i < this.dataList.length; i++) {
        if (this.dataList[i].state == 1) {
          data.push(this.dataList[i].ex_id);
        }
      }
      // console.log(data);
      return data;
    },
    getfresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    dataitid(newval, val) {
      // console.log(newval);
      this.dataCalibrationed = [];
      this.dataList = [];
      this.dataListAll = [];
      this.getCalibrationed(newval);
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
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].ex_id == this.datatedit.ex_id) {
            this.dataList[i].state = "-1";
            break;
          }
        }
        this.fresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  //   height: 74vh;
  //   border: 1px solid red;
  overflow: auto;
  // border: 1px solid red;
  .rankListItem {
    height: 50px;
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
        width: 40px;
        height: 40px;
      }
      .ph2 {
        width: 35px;
        height: 35px;
      }
      .ph3 {
        width: 30px;
        height: 30px;
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
      .icon {
        font-size: 20px;
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
  .bt {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>