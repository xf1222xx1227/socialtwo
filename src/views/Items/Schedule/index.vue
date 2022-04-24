<template>
  <div class="total">
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
      <div class="textboxp">
        <div class="p">接手专家：</div>
        <div class="text">{{ dataexname }}</div>
      </div>
      <div class="bt">
        <el-badge :value="badgeValue" class="item">
          <el-button
            type="primary"
            @click="finishItem"
            round
            :disabled="disablebt"
            >项目完成</el-button
          >
        </el-badge>
      </div>
      <div class="bt"></div>
      <div class="bt">
        <el-button type="primary" @click="urge" round :disabled="disablebt"
          >催进度</el-button
        >
      </div>
    </div>
    <el-table
      :data="
        dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      height="80%"
      stripe
      @sort-change="sortChange"
      class="table"
    >
      <el-table-column
        prop="title"
        label="标题"
        sortable="custom"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="schedule"
        label="进度"
        sortable="custom"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="other"
        label="备注"
        header-align="center"
        align="center"
      >
      </el-table-column>

      <el-table-column label="查看文件" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="light"
            content="文件详情"
            placement="top"
            style="width: 45%"
          >
            <el-button
              @click.native.prevent="openDetailFiles(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-s-operation"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination" style="text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="nowPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTableLength"
      >
      </el-pagination>
    </div>
    <FinishItem
      :datadetail="dataDetail"
      ref="dialogFinishItem"
      @refresh="reFresh"
    />
    <DetailsFiles :datafiles="dataFiles" ref="dialogFiles" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import DetailsFiles from "../Bidding/detailsFiles.vue";
import FinishItem from "./finishitem.vue";

export default {
  components: { DetailsFiles, FinishItem },
  data() {
    return {
      dataList: [],
      dataListAll: [],
      dataSelect: "",
      dataexid: "",
      dataexname: "",

      disablebt: true,

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,

      badgeValue: "",

      files: "",
      dataFiles: [],

      dataFinish: [],

      dataDetail: {},

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
        .getOneSocialPersonScheduleItems({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataList = data;
              this.dataListAll = data;
              this.dataSelect = data[0].it_id;
              this.dataexid = data[0].ex_id;
              this.dataexname = data[0].exname;
            }
          }
        });
    },
    getTableData() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getOneExpertSchedules({
          ex_id: this.dataexid,
          it_id: this.dataSelect,
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res);
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].schedule = data[i].schedules + "%";
                data[i].date = myFunctions.newDateToDate(data[i].time_schedule);
              }
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
              // this.getFilesData();
            }
          }
        });
    },
    openDetailFiles(index, dataTable) {
      let data = dataTable[index];
      let uploadtime = data.time_schedule;
      // console.log(111, data);
      this.dataFiles = [];
      this.$api
        .getSchedulesFiles({
          it_id: this.dataSelect,
          ex_id: this.dataexid,
          uploadtime: uploadtime,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            let xdata = res.data.result;
            if (res.data.status == 200) {
              this.dataFiles = xdata;
              // console.log(111);
              this.$refs.dialogFiles.visible = true;
            } else {
              // console.log(111);
              // this.$refs.dialogFiles.visible = true;
              this.$message({
                type: "info",
                message: "暂无文件",
                offset: 150,
              });
            }
          }
        });
    },
    upload() {
      this.$refs.dialogUpload.visible = true;
    },
    // 获取申请信息
    getApplyFinishItem() {
      this.$api
        .getApplyFinishItem({
          ex_id: this.dataexid,
          it_id: this.dataSelect,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              // console.log(data);
              this.dataFinish = data[0];
              if (data[0].state == 0) {
                this.badgeValue = "new";
              } else {
                this.showApply = "";
              }
            } else {
              this.showApply = "";
            }
          }
        });
    },
    // 项目完成
    finishItem() {
      // if (this.badgeValue == "") {
      // } else {
      this.dataDetail.it_id = this.dataSelect;
      this.dataDetail.ex_id = this.dataexid;
      this.dataDetail.badgeValue = this.badgeValue;
      this.$refs.dialogFinishItem.visible = true;
      // }
    },
    finish() {
      this.$api
        .addFinishItem({
          ex_id: this.dataexid,
          it_id: this.dataSelect,
          finilly_time: myFunctions.newDateToDate(new Date()),
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res);
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].schedule = data[i].schedules + "%";
                data[i].date = myFunctions.newDateToDate(data[i].time_schedule);
              }
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
              // this.getFilesData();
            }
          }
        });
    },
    // 催出进度提交
    urge() {
      // console.log(1, this.dataSelect, 2, this.dataexid);
      let time = myFunctions.newDateToDatetime(new Date());
      this.$api
        .addSchedulesUrge({
          it_id: this.dataSelect,
          ex_id: this.dataexid,
          urgetime: time,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "催促成功",
              offset: 150,
            });
          } else {
            this.$message({
              type: "success",
              message: "催促失败，请稍后再试",
              offset: 150,
            });
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
    // 自定义排序
    sortChange({ prop, order }) {
      this.dataTable.sort(this.compare(prop, order));
    },
    compare(propertyName, sort) {
      return function (obj1, obj2) {
        var value1 = obj1[propertyName];
        var value2 = obj2[propertyName];
        if (typeof value1 === "string" && typeof value2 === "string") {
          const res = value1.localeCompare(value2, "zh");
          return sort === "ascending" ? res : -res;
        } else {
          if (value1 <= value2) {
            return sort === "ascending" ? -1 : 1;
          } else if (value1 > value2) {
            return sort === "ascending" ? 1 : -1;
          }
        }
      };
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        this.getListData();
        setTimeout(() => {
          this.badgeValue = "";
          this.getTableData();
          this.fresh = "0";
        }, 100);
      } else if (newval == "2") {
        this.badgeValue = "";
        this.fresh = "0";
      }
    },
    dataSelect(newval, val) {
      if (newval != "") {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].it_id == newval) {
            this.dataexid = this.dataList[i].ex_id;
            this.dataexname = this.dataList[i].exname;
            this.getApplyFinishItem();
            break;
          }
        }
        this.getTableData();
        this.disablebt = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  //   border: 1px solid red;
  height: 92vh;
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
  .table {
    flex: 15;
    border-top: 1px solid blue;
    border-bottom: 1px solid blue;
  }
  .pagination {
    flex: 1;
  }
}
</style>