<template>
  <div class="total">
    <div class="choose">
      <ChooseDate @getdate="getDate" />
    </div>
    <div class="contentbar" v-show="datadate.type == 'all'">
      <div id="chartbar"></div>
    </div>
    <div class="contentline" v-show="datadate.type != 'all'">
      <ChartLine
        :datadate="datadate"
        :freshline="freshline"
        ref="chartline"
        @freshed="freshed"
      />
    </div>
    <!-- <TableBar :userid="userid" :username="username" ref="drawerdetail" /> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import myFunctions from "@/myFunctions";

import ChooseDate from "../../choosedate.vue";
import ChartLine from "./chartline.vue";
export default {
  components: { ChooseDate, ChartLine },
  data() {
    return {
      datadate: {},
      dataBar: [],
      userid: "",
      username: "",
      freshline: "0",
    };
  },
  created() {},
  methods: {
    // 获取分类条件
    getDate(val) {
      // console.log(val);
      this.datadate = val;
      if (val.type == "all") {
        this.getBarData();
      } else {
        this.freshline = "1";
      }
    },
    freshed(val) {
      this.freshline = "0";
    },
    // 获取每个社科成员的发布数据条数
    getBarData() {
      this.$api
        .getOneBiddingUsersDetailItems({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.databar = data;
              // console.log(data);
              this.displaybar();
            }
          }
        });
    },
    // 展示社科成员发布情况柱状图
    displaybar() {
      let datax = [];
      let datay = [];
      if (this.databar.length > 0) {
        for (let i = 0; i < this.databar.length; i++) {
          datax.push(this.databar[i].username);
          let data = {};
          data.value = this.databar[i].count;
          data.id = this.databar[i].userid;
          data.itemStyle = {};
          data.itemStyle.color = myFunctions.randomcolor();
          // datay.push(this.databar[i].count);
          datay.push(data);
        }
      }
      let chartDom = document.getElementById("chartbar");
      let myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: "项目细审总览",
        },
        xAxis: {
          type: "category",
          data: datax,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: datay,
            type: "bar",
            itemStyle: {
              // 设置显示数据
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
          },
        ],
      };
      myChart.on("click", (event) => {
        if (event.data) {
          this.userid = event.data.id;
          this.username = event.name;
          //   this.$refs.drawerdetail.visible = true;
        }
      });
      option && myChart.setOption(option);
    },
  },
  watch: {
    userid(newval, val) {},
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  width: 100%;
  display: flex;
  flex-flow: column;
  .choose {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid blue;
  }
  .contentbar {
    flex: 1;
    display: flex;
    flex-flow: column;
    padding: 20px 20px;
    #chartbar {
      flex: 2;
    }
  }
  .contentline {
    flex: 1;
    display: flex;
    flex-flow: column;
  }
}
</style>