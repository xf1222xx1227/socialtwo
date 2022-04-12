<template>
  <div class="total">
    <!-- <div id="myMiddleChart" :style="{ width: '300px', height: '300px' }"></div> -->
  </div>
</template>

<script>
// import * as echarts from "echarts";
export default {
  data() {
    return {
      // //图表配置项对象
      // middleChartExtend: {
      //   color: ["#5ACC23"], //柱状图的柱子颜色
      //   tooltip: {
      //     //是否显示提示工具
      //     show: true,
      //   },
      //   xAxis: {
      //     //X坐标配置项
      //     type: "category",
      //     axisPointer: { show: true },
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     data: [
      //       "Jan",
      //       "Feb",
      //       "Mar",
      //       "Apr",
      //       "May",
      //       "Jun",
      //       "Jul",
      //       "Aug",
      //       "Sep",
      //       "Oct",
      //       "Nov",
      //       "Dec",
      //     ],
      //   },
      //   yAxis: {
      //     //y坐标配置项
      //     type: "value",
      //     minInterval: 1,
      //     onZero: false,
      //     axisLine: {
      //       show: false,
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       formatter: "{value} min",
      //     },
      //     splitLine: {
      //       show: true,
      //       lineStyle: {
      //         // color: "#F5F7F8"
      //       },
      //     },
      //   },
      //   series: {
      //     //图表内容数据配置项
      //     name: "平均时间",
      //     type: "bar", //显示成柱状图
      //     barWidth: 10, //柱子宽度为10
      //     data: [], //每项数据，动态赋予
      //   },
      //   grid: {
      //     //图表属性配置项，一个图表对应一个grid
      //     top: "3%",
      //     left: "3%",
      //     right: "3%",
      //     bottom: "3%",
      //     containLabel: true,
      //   },
      // },
      // myMiddleChartObj: null, //图表对象
    };
  },
  methods: {
    // getData() {
    //   //获取数据并赋值给middleChartExtend.series.data
    // },
    // drawMiddleChart() {
    //   //绘制图表方法
    //   this.myMiddleChartObj = this.$echarts.init(
    //     document.getElementById("myMiddleChart")
    //   );
    //   //将图表配置项赋给图表,true参数表示不和之前的数据合并
    //   this.myMiddleChartObj.setOption(this.middleChartExtend, true);
    // },
  },
  mounted() {
    // this.drawMiddleChart();
  },
};
</script>

<style>
</style>