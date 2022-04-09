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
      <div class="textboxp"></div>
      <!-- <div class="textboxp"></div> -->
      <div class="bt" v-show="showApply == -1 || showApply == 2">
        <el-button
          type="primary"
          @click="applyFinish"
          round
          :disabled="disablebt"
          >申请完成</el-button
        >
      </div>
      <div class="bt" v-show="showApply == 0">
        <div>
          <el-tag type="warning">已申请项目完成，等待回应</el-tag>
        </div>
      </div>
      <div class="bt" v-show="showApply == 2">
        <el-badge :is-dot="badgeValue" class="item">
          <el-button type="primary" @click="receipt" round>回执</el-button>
        </el-badge>
      </div>
      <div class="bt" v-show="showApply != 2"></div>
      <div class="bt">
        <el-button type="primary" @click="upload" round :disabled="disablebt"
          >上传</el-button
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
    <Upload :dataitid="dataSelect" ref="dialogUpload" @refresh="reFresh" />
    <Receipt :datadetail="datadetail" ref="dialogReceipt" />
    <DetailsFiles :datafiles="dataFiles" ref="dialogFiles" />
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import DetailsFiles from "../../../views/Items/Bidding/detailsFiles.vue";
import Upload from "./upload.vue";
import Receipt from "./receipt.vue";
export default {
  components: { Upload, DetailsFiles, Receipt },
  data() {
    return {
      dataList: [],
      dataListAll: [],
      dataSelect: "",
      dataexid: "",

      disablebt: true,
      showApply: -1,

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,

      files: "",
      dataFiles: [],

      badgeValue: false,
      datadetail: {},

      dataFinish: [],

      fresh: "0",
    };
  },
  created() {
    this.getListData();
    // let data = [];
    // console.log(111, data.length);
  },
  methods: {
    // 获取下拉列表数据
    getListData() {
      this.dataList = [];
      this.dataListAll = [];
      this.dataSelect = "";
      this.$api
        .getOneExpertScheduleItems({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataList = data;
              this.dataListAll = data;
              this.dataSelect = data[0].it_id;
              this.dataexid = data[0].ex_id;
            }
          }
        });
    },
    // 获取表格数据
    getTableData() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getOneExpertSchedules({
          ex_id: sessionStorage.getItem("userid"),
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
            }
          }
        });
    },
    // 获取进度催促
    getUrge(it_id, ex_id) {
      this.$api
        .getSchedulesUrge({
          ex_id: ex_id,
          it_id: it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              let date = myFunctions.newDateToDate(data[0].urgetime);
              this.$alert(
                `项目方正在催促进度，请抓紧完成项目并上传进度</br>提醒时间为：<b>${date}</b>`,
                "进度提醒",
                {
                  dangerouslyUseHTMLString: true,
                  confirmButtonText: "收到",
                  cancelButtonText: "关闭",
                }
              ).then(() => {
                // console.log(111);
                this.$api
                  .updateSchedulesUrge({
                    ex_id: ex_id,
                    it_id: it_id,
                  })
                  .then((res) => {
                    if (res.status == 200) {
                    }
                  });
              });
            }
          }
        });
    },
    // 打开文件详情
    openDetailFiles(index, dataTable) {
      let data = dataTable[index];
      let uploadtime = data.time_schedule;
      this.dataFiles = [];
      this.$api
        .getSchedulesFiles({
          it_id: this.dataSelect,
          ex_id: sessionStorage.getItem("userid"),
          uploadtime: uploadtime,
        })
        .then((res) => {
          if (res.status == 200) {
            let xdata = res.data.result;
            if (res.data.status == 200) {
              this.dataFiles = xdata;
              this.$refs.dialogFiles.visible = true;
            }
          } else {
            this.$refs.dialogFiles.visible = true;
          }
        });
    },
    upload() {
      this.$refs.dialogUpload.visible = true;
    },
    // 获取申请完成信息
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
                this.showApply = 0;
              } else if (data[0].state == 2) {
                this.showApply = 2;
              } else {
                this.showApply = -1;
              }
            } else {
              this.showApply = -1;
            }
          }
        });
    },
    // 申请项目完成
    applyFinish() {
      let data = this.dataTableAll;
      let schedules = data.length == 0 ? 0 : data[data.length - 1].schedules;
      let h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", null, `当前进度为<${schedules}%>，是否确定申请项目完成`),
          // h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then((action) => {
        this.apply();
      });
    },
    apply() {
      this.$api
        .addApplyFinishItem({
          ex_id: this.dataexid,
          it_id: this.dataSelect,
          applytime: myFunctions.newDateToDatetime(new Date()),
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              message: "申请成功，请等待应答",
              offset: 150,
            });
          } else {
            this.$message({
              type: "error",
              message: "申请失败，请稍后重试",
              offset: 150,
            });
          }
        });
    },
    // 查看未通过时的申请回执
    receipt() {
      this.$refs.dialogReceipt.visible = true;
    },
    // 回执获取
    getReceipt() {
      this.$api
        .getReceipt({
          ex_id: this.dataexid,
          it_id: this.dataSelect,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.datadetail = res.data.result[0];
              // console.log(22, this.datadetail);
              this.badgeValue = true;
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
      if (newval != "0") {
        this.getTableData();
        this.fresh = "0";
      }
    },
    dataSelect(newval, val) {
      // console.log(newval);
      if (newval != "") {
        for (let i = 0; i < this.dataList.length; i++) {
          if (this.dataList[i].it_id == newval) {
            this.dataexid = this.dataList[i].ex_id;
            this.getUrge(this.dataSelect, this.dataexid);
            this.getApplyFinishItem();
            this.getReceipt();
            break;
          }
        }
        this.getTableData();
        this.disablebt = false;
        this.showApply = -1;
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