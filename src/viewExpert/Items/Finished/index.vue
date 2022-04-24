<template>
  <div class="total">
    <div class="search">
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-input
          v-model="dataSearch.name"
          @keyup.enter.native="search"
          clearable
          class="text"
        ></el-input>
      </div>
      <div class="textboxp">
        <div class="p">发布社科：</div>
        <el-select
          v-model="dataSearch.social"
          filterable
          clearable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataSocial"
            :key="item.b_id"
            :label="item.name"
            :value="item.b_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="textboxp">
        <div class="p">研究方向：</div>
        <el-select
          v-model="dataSearch.research"
          filterable
          clearable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataResearch"
            :key="item.re_id"
            :label="item.name"
            :value="item.re_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="bt">
        <el-button @click="reset" round>重置</el-button>
      </div>
    </div>
    <div class="search">
      <div class="textboxp">
        <div class="p">发布区间：</div>
        <el-date-picker
          v-model="dataSearch.bdate"
          type="date"
          clearable
          placeholder="起始发布日期"
          class="text"
        >
        </el-date-picker>
      </div>
      <div class="textboxp">
        <div class="p">发布区间：</div>
        <el-date-picker
          v-model="dataSearch.fdate"
          type="date"
          clearable
          placeholder="终止发布日期"
          class="text"
        >
        </el-date-picker>
      </div>
      <div class="textboxp"></div>
      <div class="bt">
        <el-button type="primary" @click="search" round>搜索</el-button>
      </div>
    </div>

    <div class="content">
      <div class="tables">
        <el-table
          :data="dataTable"
          height="80%"
          stripe
          class="table"
          @row-click="(row, column, event) => TableOnclick(row, column, event)"
        >
          <el-table-column
            prop="name"
            label="项目名称"
            header-align="center"
            align="center"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="发布人"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bname"
            label="发布社科"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="time_release"
            label="发布时间"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="finilly_time"
            label="完成时间"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="budget"
            label="预算"
            header-align="center"
            align="center"
          >
          </el-table-column>
        </el-table>
        <div class="pagination" style="text-align: center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataTableLength"
          >
          </el-pagination>
        </div>
      </div>
      <div class="timeline">
        <div class="title" style="font-size: 20px; text-align: center">
          项目进程
        </div>
        <div class="radio" style="margin-top: 20px; margin-left: 20px">
          时序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div>
        <el-timeline
          :reverse="reverse"
          style="margin-top: 20px; margin-left: 20px"
        >
          <div
            v-for="(activity, index) in dataTimeLineAll"
            :key="index"
            @click="timeLineClick(index)"
            style="cursor: pointer"
          >
            <el-timeline-item
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </div>
        </el-timeline>
      </div>
    </div>
    <Detail ref="detail" :datadetail="dataDetail" />
    <BidDetail ref="bidDetail" :datadetail="dataBidDetail" />
    <FirstResult ref="firstResult" :datadetail="dataFirstResult" />
    <DetailResult ref="detailResult" :datadetail="dataDetailResult" />
    <Calibration ref="calibration" :dataitid="dataCalibration" />
    <Schedule ref="schedule" :datadetail="dataSchedule" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Detail from "../../bid/detail.vue";
import BidDetail from "../Bidding/detailBid.vue";
import FirstResult from "./firstResult.vue";
import DetailResult from "./detailResult.vue";
import Calibration from "./calibration.vue";
import Schedule from "./schedule";
export default {
  components: {
    Detail,
    BidDetail,
    FirstResult,
    DetailResult,
    Calibration,
    Schedule,
  },
  data() {
    return {
      dataSearch: { name: "", social: "", research: "", bdate: "", fdate: "" },
      dataSocial: [],
      dataResearch: [],

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 100,
      currentPage: 1, // 页码
      pageSize: 10,
      // nowPageSize: 10,
      str: "",

      dataTimeLine: [],
      dataTimeLineAll: [],
      reverse: false,

      dataitid: "",
      dataDetail: {}, // 发布详情
      dataBidDetail: {}, // 申报详情
      dataFirstResult: {}, // 初审结果
      dataDetailResult: "", // 细审结果
      dataCalibration: "", // 定标
      dataSchedule: "", // 完成
    };
  },
  created() {
    this.getsocial();
    this.getResearch();
    this.getTableCount(this.str);
    this.getTableData(this.pageSize, this.currentPage, this.str);
  },
  methods: {
    reset() {
      this.dataSearch.name = "";
      this.dataSearch.social = "";
      this.dataSearch.research = "";
      this.dataSearch.bdate = "";
      this.dataSearch.fdate = "";
    },
    search() {
      // console.log(this.dataSearch);
      this.str = "";
      let bdate =
        this.dataSearch.bdate == ""
          ? ""
          : myFunctions.newDateToDate(this.dataSearch.bdate);
      let fdate =
        this.dataSearch.fdate == ""
          ? ""
          : myFunctions.newDateToDate(this.dataSearch.fdate);
      if (this.dataSearch.name != "") {
        this.str += ` and a.name like '%` + this.dataSearch.name + `%' `;
      }

      if (this.dataSearch.social != "") {
        this.str += ` and g.b_id = '` + this.dataSearch.social + `'`;
      }
      if (this.dataSearch.research != "") {
        this.str += ` and b.re_id = '` + this.dataSearch.research + `'`;
      }
      if (fdate != "") {
        this.str += ` and a.time_release <= '` + fdate + `'`;
      }
      if (bdate != "") {
        this.str += ` and a.time_release >= '` + bdate + `'`;
      }
      this.getTableCount(this.str);
      this.getTableData(this.pageSize, 1, this.str);
    },
    // 表格行点击
    TableOnclick(row, column, event) {
      this.dataitid = row.it_id;
      this.getTimeLine(row.it_id);
    },
    // 获取时间线
    getTimeLine(dataitid) {
      this.dataTimeLine = [];
      this.dataTimeLineAll = [];
      this.$api
        .getOneItemTimeLine({
          ex_id: sessionStorage.getItem("userid"),
          it_id: dataitid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataTimeLine = data;

              let xdata = {};
              let datas = [];
              xdata.timestamp = myFunctions.newDateToDate(data[0].time_release);
              xdata.icon = "el-icon-circle-plus-outline";
              xdata.content = "项目发布";
              xdata.type = "primary";
              xdata.size = "large";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(data[0].bid_time);
              xdata.icon = "el-icon-circle-plus-outline";
              xdata.content = "项目申报";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(data[0].time_examine);
              xdata.icon = "el-icon-cloudy";
              xdata.content = "项目初审";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(data[0].examinetime);
              xdata.icon = "el-icon-cloudy-and-sunny";
              xdata.content = "项目细审";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(
                data[0].time_calibration
              );
              xdata.icon = "el-icon-s-flag";
              xdata.content = "项目定标";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(data[0].time_open);
              xdata.icon = "el-icon-position";
              xdata.content = "项目开标";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              xdata.timestamp = myFunctions.newDateToDate(data[0].finilly_time);
              xdata.icon = "el-icon-switch-button";
              xdata.content = "项目完成";
              xdata.type = "primary";
              datas.push(xdata);
              xdata = {};

              this.dataTimeLineAll = datas;
              // console.log(1111111, this.dataTimeLineAll);
            }
          }
        });
    },
    // 时间线点击
    timeLineClick(index) {
      // 项目发布详情
      if (index == 0) {
        this.$api
          .getOneItem({
            it_id: this.dataitid,
          })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.status == 200) {
                let data = res.data.result;
                this.dataDetail = data[0];
                this.$refs.detail.visible = true;
              }
            }
          });
      }
      // 项目申报详情
      else if (index == 1) {
        this.$api
          .getOneExpertOneItem({
            it_id: this.dataitid,
            ex_id: sessionStorage.getItem("userid"),
          })
          .then((res) => {
            if (res.status == 200) {
              // console.log(res);
              if (res.data.status == 200) {
                let data = res.data.result;
                this.dataBidDetail = data[0];
                this.$refs.bidDetail.visible = true;
              }
            }
          });
      }
      // 项目初审
      else if (index == 2) {
        // getOneExpertOneItemFirstResult
        this.$api
          .getOneExpertOneItemFirstResult({
            it_id: this.dataitid,
            ex_id: sessionStorage.getItem("userid"),
          })
          .then((res) => {
            if (res.status == 200) {
              console.log(res);
              if (res.data.status == 200) {
                let data = res.data.result;
                if (data[0].adopt == 1) {
                  data[0].tag = "通过";
                } else if (data[0].adopt == 0) {
                  data[0].tag = "审核中";
                } else {
                  data[0].tag = "未通过";
                }
                this.dataFirstResult = data[0];
                this.$refs.firstResult.visible = true;
              }
            }
          });
      }
      // 项目细审
      else if (index == 3) {
        this.dataDetailResult = this.dataitid;
        this.$refs.detailResult.visible = true;
      }
      // 项目定标
      else if (index == 4 || index == 5) {
        this.dataCalibration = this.dataitid;
        this.$refs.calibration.visible = true;
      }
      // 项目完成
      else if (index == 6) {
        this.dataSchedule = this.dataitid;
        this.$refs.schedule.visible = true;
      }
    },
    // 项目申报详情
    // 获取社科
    getsocial() {
      this.$api.getSocial({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.dataSocial = data;
          }
        }
      });
    },
    // 研究方向 getResearchDirection
    getResearch() {
      this.$api.getResearchDirection({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.dataResearch = data;
          }
        }
      });
    },
    // 表格数据条数
    getTableCount(str) {
      this.dataTableLength = 0;
      this.$api
        .getOneExpertFinishItemsCount({
          ex_id: sessionStorage.getItem("userid"),
          str: str,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataTableLength = data[0].count;
            }
          }
        });
    },
    // 表格数据
    getTableData(pagesize, pagenum, str) {
      this.dataTable = [];
      this.dataTableAll = [];
      this.$api
        .getOneExpertFinishItems({
          ex_id: sessionStorage.getItem("userid"),
          pagesize: pagesize,
          pagenum: pagenum,
          str: str,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataTable = data;
              this.dataTableAll = data;
              // console.log(111, data);
            }
          }
        });
    },
    // 改变每页显示条数时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    // 改变页码时触发
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // .slice((currentPage - 1) * pageSize,currentPage * pageSize)
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  display: flex;
  flex-flow: column;
  .search {
    // height: 40px;
    height: 8vh;
    display: flex;
    flex-flow: row;
    align-items: center;
    .textboxp {
      flex: 4;
      display: flex;
      align-items: center;
      flex-flow: row;
      //   border: 1px solid blue;
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
      text-align: center;
      margin-left: 5px;
    }
  }
  .content {
    flex: 1;
    height: 76vh;
    display: flex;
    flex-flow: row;
    border-top: 1px solid blue;
    .tables {
      flex: 5;
      height: 100%;
      height: 76vh;
      border-right: 1px solid blue;
      display: flex;
      flex-flow: column;
      .table {
        flex: 13;
      }
      .pagination {
        flex: 1;
      }
    }
    .timeline {
      height: 100%;
      height: 76vh;
      // border: 1px solid red;
      flex: 2;
      overflow: auto;
      // padd ing: 10px 20px;
    }
  }
}
</style>