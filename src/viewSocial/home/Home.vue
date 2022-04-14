<template>
  <div class="total">
    <div id="q1">sfgtrshbsfgnbfdnfg</div>
    <div
      id="mains"
      style="width: 600px; height: 400px; border: 1px solid red"
    ></div>
    <!-- <div ref="myechart" style="width: 600px; height: 400px"></div> -->
  </div>
</template>

<script>
import * as echarts from "echarts";
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      mydata: {},
      drilldownData: [],
      option: {},
      color: "",
    };
  },
  created() {},
  mounted() {
    this.setchart();
    this.color = myFunctions.randomcolor();
    let dom = document.getElementById("q1");
    dom.style.background = this.color;
    // console.log(111, this.color);
  },
  methods: {
    setchart() {
      var chartDom = document.getElementById("mains");
      // console.log(111, chartDom);
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          data: ["Animals", "Fruits", "Cars"],
        },
        yAxis: {},
        dataGroupId: "",
        animationDurationUpdate: 500,
        series: {
          type: "bar",
          id: "sales",
          data: [
            {
              value: 5,
              groupId: "animals",
            },
            {
              value: 2,
              groupId: "fruits",
            },
            {
              value: 4,
              groupId: "cars",
            },
          ],
          universalTransition: {
            enabled: true,
            divideShape: "clone",
          },
        },
      };
      let drilldownData = [
        {
          dataGroupId: "animals",
          data: [
            ["Cats", 4],
            ["Dogs", 2],
            ["Cows", 1],
            ["Sheep", 2],
            ["Pigs", 1],
          ],
        },
        {
          dataGroupId: "fruits",
          data: [
            ["Apples", 4],
            ["Oranges", 2],
          ],
        },
        {
          dataGroupId: "cars",
          data: [
            ["Toyota", 4],
            ["Opel", 2],
            ["Volkswagen", 2],
          ],
        },
      ];
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
                  text: "Back",
                  fontSize: 18,
                },
                onclick: () => {
                  myChart.setOption(option);
                },
              },
            ],
          });
        }
      });

      option && myChart.setOption(option);
    },
    // setEcharts() {
    //   var echarts = require("echarts");
    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(document.getElementById("main"));
    //   // 绘制图表
    //   myChart.setOption({
    //     title: {
    //       text: "ECharts 入门示例",
    //     },
    //     tooltip: {},
    //     xAxis: {
    //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         name: "销量",
    //         type: "bar",
    //         data: [5, 20, 36, 10, 10, 20],
    //       },
    //     ],
    //   });
    // },
  },
};
</script>

<style>
</style>