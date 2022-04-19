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
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  props: ["datadetail", "dataitid"],
  data() {
    return {
      dataList: [],
      dataListAll: [],
      it_id: "",
      exid: "",
    };
  },
  created() {},
  methods: {
    // 点击项目列表时
    itemClick(data, dataObj) {
      this.exid = data;
      this.$emit("sendExid", this.exid);
      // this.dataitid = dataObj.it_id;
      let doms = document.getElementsByClassName("rankListItem");
      for (let i = 0; i < doms.length; i++) {
        if (doms[i].className.indexOf(data) != -1) {
          doms[i].style.background = "#FFEBCD";
        } else {
          doms[i].style.background = "#f5f5f5";
        }
      }
    },
  },
  watch: {
    dataitid(newval, val) {
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
              for (let i = 0; i < data.length; i++) {
                data[i].rate =
                  data[i].rate_economics +
                  data[i].rate_technology +
                  data[i].rate_comprehensive;
                //   保留原来比例
                data[i].rate_economics1 = data[i].rate_economics;
                data[i].rate_technology1 = data[i].rate_technology;
                data[i].rate_comprehensive1 = data[i].rate_comprehensive;
                // 计算新比例
                data[i].rate_economics =
                  data[i].rate_economics / parseInt(data[i].rate).toFixed(2);
                data[i].rate_technology =
                  data[i].rate_technology / parseInt(data[i].rate).toFixed(2);
                data[i].rate_comprehensive =
                  data[i].rate_comprehensive /
                  parseInt(data[i].rate).toFixed(2);
                // 计算平均分
                data[i].average_score_technology = (
                  parseInt(data[i].total_score_technology) /
                  parseInt(data[i].count)
                ).toFixed(2);
                data[i].average_score_economics = (
                  parseInt(data[i].total_score_economics) /
                  parseInt(data[i].count)
                ).toFixed(2);
                data[i].average_score_comprehensive = (
                  parseInt(data[i].total_score_comprehensive) /
                  parseInt(data[i].count)
                ).toFixed(2);
                data[i].average_score_system = (
                  parseInt(data[i].total_score_system) / parseInt(data[i].count)
                ).toFixed(2);
                data[i].average_total2 = (
                  parseInt(
                    data[i].rate_economics * data[i].average_score_economics
                  ) +
                  parseInt(
                    data[i].rate_technology * data[i].average_score_technology
                  ) +
                  parseInt(
                    data[i].rate_comprehensive *
                      data[i].average_score_comprehensive
                  ) +
                  parseInt(data[i].average_score_system)
                ).toFixed(2);
                // 计算整数得分
                // data[i].average_total = Math.round(data[i].average_total2);
                data[i].average_total = data[i].average_total2;
              }
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
              this.dataList = data;
              this.dataListAll = data;
              // 默认选中
              // this.exid = data[0].ex_id;
              // let dom = document.getElementById(this.exid);
              // console.log(222, dom);
              // dom.style.background = "#FFEBCD";
              // this.itemClick(data[0].ex_id, data[0]);
              // this.$emit("sendExid", this.exid);
            }
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  overflow: auto;
  //   border: 1px solid red;
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