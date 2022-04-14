<template>
  <div id="chartLine">
    <div id="chartLine"></div>
    <!-- <div id="chartLine" v-show="this.datadate.type == 'year'"></div>
    <div id="chartMonth" v-show="this.datadate.type == 'month'"></div>
    <div id="chartDay" v-show="this.datadate.type == 'day'"></div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["datadate", "freshline"],
  data() {
    return {
      str: "",
      attribute: "",
      groupby: "",

      datachart: [],
      datax: [],
      datay: [],
      datalegend: [],

      dataUsers: [],
    };
  },
  created() {
    // let data = [1];
    // console.log(222, data[1]);
    this.getUsers();
  },
  methods: {
    getMonthData() {
      let date = new Date();
      let year = date.getFullYear();
      let begin = this.datadate.begin;
      let end = this.datadate.end;
      if (begin < 10) begin = "0" + begin;
      if (end < 10) end = "0" + end;
      this.str = "";
      this.attribute = "";
      this.attribute += ",substring(c.time_examine,1,7) as 'date' ";
      this.groupby = "";
      this.groupby += `,substring(c.time_examine,1,7)`;
      this.str +=
        ` and substring(c.time_examine,6,2) between '` +
        begin +
        `' and '` +
        end +
        `' and substring(c.time_examine,1,4)='` +
        year +
        `' `;
      this.getData();
    },
    getYearData() {
      let begin = this.datadate.begin;
      let end = this.datadate.end;
      this.str = "";
      this.attribute = "";
      this.attribute += " ,substring(c.time_examine,1,4) as 'date' ";
      this.groupby = "";
      this.groupby += `,substring(c.time_examine,1,4)`;
      this.str +=
        ` and substring(c.time_examine,1,4) between '` +
        begin +
        `' and '` +
        end +
        `' `;
      this.getData();
    },
    getDayData() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) month = "0" + month;
      year = year + "-" + month;
      let begin = this.datadate.begin;
      let end = this.datadate.end;
      if (begin < 10) begin = "0" + begin;
      if (end < 10) end = "0" + end;
      this.str = "";
      this.attribute = "";
      this.attribute += ",substring(c.time_examine,1,10) as 'date' ";
      this.groupby = "";
      this.groupby += `,substring(c.time_examine,1,10)`;
      this.str +=
        ` and substring(c.time_examine,9,2) between '` +
        begin +
        `' and '` +
        end +
        `' and substring(c.time_examine,1,7)='` +
        year +
        `' `;
      this.getData();
    },
    // 获取分类搜索的数据
    getData() {
      this.dataChart = [];
      this.$api
        .getOneBiddingUsersFirstCategoryItems({
          userid: sessionStorage.getItem("userid"),
          str: this.str,
          groupby: this.groupby,
          attribute: this.attribute,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              //   console.log(1111, data);
              this.datachart = data;
              this.dataFilter();
            }
          }
        });
    },
    // 过滤得到的数据
    dataFilter() {
      this.datax = [];
      this.datay = [];
      this.datalegend = [];
      for (let i = 0; i < this.dataUsers.length; i++) {
        let data = this.dataUsers[i];
        let datas = {};
        datas.name = data.username;
        this.datalegend.push(data.username);
        datas.type = "line";
        // datas.stack = "Total";
        datas.data = [];
        datas.id = data.userid;
        this.datay.push(datas);
      }
      let data = this.datadate;
      if (this.datadate.type == "year") {
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          // 循环取年份
          this.datax.push(i + "年");
          for (let j = 0; j < this.datachart.length; j++) {
            // 循环取得到的发表数据
            if (this.datachart[j].date == i + "") {
              for (let k = 0; k < this.datay.length; k++) {
                if (this.datay[k].id == this.datachart[j].userid) {
                  this.datay[k].data[index] = this.datachart[j].count;
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datay.length; j++) {
            if (!this.datay[j].data[i]) {
              this.datay[j].data[i] = 0;
            }
          }
        }
      } else if (this.datadate.type == "month") {
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          this.datax.push(i + "月");
          let month = i + "";
          if (month < 10) month = "0" + month;
          for (let j = 0; j < this.datachart.length; j++) {
            // 循环取得到的发表数据
            if (this.datachart[j].date.slice(5, 7) == month) {
              for (let k = 0; k < this.datay.length; k++) {
                if (this.datay[k].id == this.datachart[j].userid) {
                  this.datay[k].data[index] = this.datachart[j].count;
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datay.length; j++) {
            if (!this.datay[j].data[i]) {
              this.datay[j].data[i] = 0;
            }
          }
        }
      } else if (this.datadate.type == "day") {
        let index = 0;
        for (let i = data.begin; i <= data.end; i++) {
          this.datax.push(i + "日");
          let day = i + "";
          if (day < 10) day = "0" + day;
          for (let j = 0; j < this.datachart.length; j++) {
            // 循环取得到的发表数据
            if (this.datachart[j].date.slice(8, 10) == day) {
              for (let k = 0; k < this.datay.length; k++) {
                if (this.datay[k].id == this.datachart[j].userid) {
                  this.datay[k].data[index] = this.datachart[j].count;
                }
              }
            }
          }
          index++;
        }
        for (let i = 0; i < index; i++) {
          for (let j = 0; j < this.datay.length; j++) {
            if (!this.datay[j].data[i]) {
              this.datay[j].data[i] = 0;
            }
          }
        }
      }
      //   console.log(111, this.datay);
      this.showChart();
    },
    // 图表配置
    showChart() {
      let chartDom = document.getElementById("chartLine");

      let myChart = echarts.init(chartDom);

      let option;
      option = {
        title: {
          text: "项目初审统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          //   data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
          data: this.datalegend,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.datax,
        },
        yAxis: {
          type: "value",
        },
        series: this.datay,
      };
      myChart.clear();
      myChart.setOption(option);
      myChart = null;
      this.$emit("freshed", "0");
    },
    // 获取某个社科下属人员
    getUsers() {
      this.dataUsers = [];
      this.$api
        .getOneBiddingUsers({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataUsers = data;
            }
          }
        });
    },
  },
  watch: {
    freshline(newval, val) {
      // console.log(123);
      if (newval == 1) {
        if (this.datadate.type == "year") {
          this.getYearData();
        } else if (this.datadate.type == "month") {
          this.getMonthData();
        } else {
          this.getDayData();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#chartLine {
  height: 100%;
  padding: 20px 20px;
  //   border: 1px solid red;
}
</style>