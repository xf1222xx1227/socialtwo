<template>
  <div class="total">
    <div class="choose">
      <ChooseDate @getdate="getDate" />
    </div>
    <div class="contentbar" v-show="datadate.type == 'all'">
      <div id="chartbar"></div>
    </div>
    <div class="contentbar" v-show="datadate.type != 'all'">
      <div id="chartdetailbar"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import myFunctions from "@/myFunctions";

import ChooseDate from "../../choosedate.vue";
export default {
  components: { ChooseDate },
  data() {
    return {
      datadate: {},
      databar: [],
      datadetailbar: [],
      userid: "",
      username: "",
      fresh: "0",

      str: "",
      attribute: "",
      groupby: "",

      datax: [],
      datay: [],
      datason: [],
    };
  },
  created() {},
  methods: {
    // 获取分类条件
    getDate(val) {
      this.datadate = val;
      this.str = "";
      this.attribute = "";
      this.groupby = "";
      if (val.type == "all") {
        this.getBarData();
      } else if (val.type == "year") {
        let begin = this.datadate.begin;
        let end = this.datadate.end;
        this.attribute = " ,substring(c.finilly_time,1,4) as 'date' ";
        this.groupby = `,substring(c.finilly_time,1,4)`;
        this.str =
          ` and substring(c.finilly_time,1,4) between '` +
          begin +
          `' and '` +
          end +
          `' `;
        this.getBarData();
      } else if (val.type == "month") {
        let date = new Date();
        let year = date.getFullYear();
        let begin = this.datadate.begin;
        let end = this.datadate.end;
        if (begin < 10) begin = "0" + begin;
        begin += "";
        if (end < 10) end = "0" + end;
        end += "";
        this.attribute = ",substring(c.finilly_time,1,7) as 'date' ";
        this.groupby = `,substring(c.finilly_time,1,7)`;
        this.str =
          ` and substring(c.finilly_time,6,2) between '` +
          begin +
          `' and '` +
          end +
          `' and substring(c.finilly_time,1,4)='` +
          year +
          `' `;
        this.getBarData();
      } else if (val.type == "day") {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;
        year = year + "-" + month;
        let begin = this.datadate.begin;
        let end = this.datadate.end;
        if (begin < 10) begin = "0" + begin;
        if (end < 10) end = "0" + end;
        this.attribute = ",substring(c.finilly_time,1,10) as 'date' ";
        this.groupby = `,substring(c.finilly_time,1,10)`;
        this.str =
          ` and substring(c.finilly_time,9,2) between '` +
          begin +
          `' and '` +
          end +
          `' and substring(c.finilly_time,1,7)='` +
          year +
          `' `;
        this.getBarData();
      }
    },
    // 获取每个社科成员的发布数据总条数
    getBarData() {
      this.$api
        .getOneBiddingUsersFinishItems({
          userid: sessionStorage.getItem("userid"),
          str: this.str,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.databar = data;
              // console.log(111, data);
              this.getDetailData();
            }
          }
        });
    },
    // 获取每个社科用户详细数据
    getDetailData() {
      if (this.datadate.type != "all") {
        this.$api
          .getOneBiddingUsersFinishCategoryItems({
            userid: sessionStorage.getItem("userid"),
            str: this.str,
            attribute: this.attribute,
            groupby: this.groupby,
          })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.status == 200) {
                let data = res.data.result;
                // console.log(11111111, data);
                this.datadetailbar = data;
                this.dataFilter();
              }
            }
          });
      } else {
        this.dataFilter();
      }
    },
    dataFilter() {
      this.datax = [];
      this.datay = [];
      this.datason = [];
      let datax = [];
      let datay = [];
      if (this.databar.length > 0) {
        for (let i = 0; i < this.databar.length; i++) {
          // 单图/总览
          datax.push(this.databar[i].username);
          let data = {};
          data.value = this.databar[i].count;
          data.id = this.databar[i].userid;
          data.itemStyle = {};
          data.itemStyle.color = myFunctions.randomcolor();
          datay.push(data);
          // 下钻
          this.datax.push(this.databar[i].username);
          data.groupId = this.databar[i].userid;
          this.datay.push(data);
          let datas = {};
          datas.dataGroupId = this.databar[i].userid;
          datas.data = [];
          this.datason.push(datas);
        }
      }
      if (this.datadate.type == "all") {
        this.showbar(datax, datay);
      } else if (this.datadate.type == "year") {
        let data = this.datadate;
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          // 循环取年份
          let year = i + "年";
          for (let j = 0; j < this.datason.length; j++) {
            this.datason[j].data.push([year]);
          }
          for (let j = 0; j < this.datadetailbar.length; j++) {
            // 循环取得到的发表数据
            if (this.datadetailbar[j].date == i + "") {
              for (let k = 0; k < this.datason.length; k++) {
                if (
                  this.datason[k].dataGroupId == this.datadetailbar[j].userid
                ) {
                  this.datason[k].data[index].push(this.datadetailbar[j].count);
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datason.length; j++) {
            if (!this.datason[j].data[i][1]) {
              this.datason[j].data[i][1] = 0;
            }
          }
        }
        // console.log(123, this.datason);
        this.showDetailBar(this.datax, this.datay, this.datason);
      } else if (this.datadate.type == "month") {
        let data = this.datadate;
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          // 循环取月份
          let month = i + "月";
          for (let j = 0; j < this.datason.length; j++) {
            this.datason[j].data.push([month]);
          }
          month = i + "";
          if (i < 10) month = "0" + month;
          for (let j = 0; j < this.datadetailbar.length; j++) {
            // 循环取得到的发表数据
            if (this.datadetailbar[j].date.slice(5, 7) == month) {
              for (let k = 0; k < this.datason.length; k++) {
                if (
                  this.datason[k].dataGroupId == this.datadetailbar[j].userid
                ) {
                  this.datason[k].data[index].push(this.datadetailbar[j].count);
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datason.length; j++) {
            if (!this.datason[j].data[i][1]) {
              this.datason[j].data[i][1] = 0;
            }
          }
        }
        // console.log(123, this.datason);
        this.showDetailBar(this.datax, this.datay, this.datason);
      } else if (this.datadate.type == "day") {
        let data = this.datadate;
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          // 循环取月份
          let day = i + "日";
          for (let j = 0; j < this.datason.length; j++) {
            this.datason[j].data.push([day]);
          }
          day = i + "";
          if (i < 10) day = "0" + day;
          for (let j = 0; j < this.datadetailbar.length; j++) {
            // 循环取得到的发表数据
            if (this.datadetailbar[j].date.slice(8, 10) == day) {
              for (let k = 0; k < this.datason.length; k++) {
                if (
                  this.datason[k].dataGroupId == this.datadetailbar[j].userid
                ) {
                  this.datason[k].data[index].push(this.datadetailbar[j].count);
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datason.length; j++) {
            if (!this.datason[j].data[i][1]) {
              this.datason[j].data[i][1] = 0;
            }
          }
        }
        // console.log(123, this.datason);
        this.showDetailBar(this.datax, this.datay, this.datason);
      }
    },
    // 显示总览图
    showbar(datax, datay) {
      let chartDom = document.getElementById("chartbar");
      let myChart = echarts.init(chartDom);
      let option = {
        title: {
          text: "项目发布情况总览",
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
      myChart.clear();
      option && myChart.setOption(option);
      myChart = null;
    },
    // 展示社科成员发布情况柱状图
    showDetailBar(datax, datay, datason) {
      // console.log(111, datax);
      // console.log(222, datay);
      // console.log(333, datason);
      let chartDom = document.getElementById("chartdetailbar");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        xAxis: {
          data: datax,
        },
        yAxis: {},
        dataGroupId: "",
        animationDurationUpdate: 500,
        series: {
          type: "bar",
          id: "sales",
          data: datay,
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
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
      };
      let drilldownData = datason;

      myChart.on("click", function (event) {
        if (event.data) {
          var subData = drilldownData.find(function (data) {
            return data.dataGroupId === event.data.groupId;
          });
          if (!subData) {
            return;
          }
          myChart.setOption({
            xAxis: {
              data: subData.data.map(function (item) {
                return item[0];
              }),
            },
            series: {
              type: "bar",
              id: "sales",
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              }),
              universalTransition: {
                enabled: true,
                divideShape: "clone",
              },
            },
            graphic: [
              {
                type: "text",
                left: 50,
                top: 20,
                style: {
                  text: "返回",
                  fontSize: 18,
                },
                onclick: function () {
                  myChart.setOption(option);
                },
              },
            ],
          });
        }
      });
      myChart.setOption(option);
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        this.fresh = "0";
      }
    },
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
    #chartdetailbar {
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