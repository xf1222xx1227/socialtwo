<template>
  <div id="bid">
    <!-- <div class="steps">
      <Steps :index="2" />
    </div> -->
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
        <div class="p"></div>
      </div>
      <div class="textboxp">
        <div class="p"></div>
        <div class="textboxp">
          <div class="p"></div>
          <div class="text"></div>
        </div>
        <div class="bt">
          <el-button type="primary" @click="search" icon="el-icon-search" round
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <el-table
      :data="
        dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      height="80%"
      stripe
      border
      @sort-change="sortChange"
      class="table"
    >
      <el-table-column
        prop="itemname"
        label="项目名称"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time_release"
        label="发布时间"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="bid_time"
        label="申报时间"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="初审结果"
        header-align="center"
        align="center"
        :filters="[
          { text: '通过', value: '通过' },
          { text: '未通过', value: '未通过' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.tag === '未通过'
                ? 'warning'
                : scope.row.tag === '通过'
                ? 'success'
                : ''
            "
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="reason" label="审核原因" header-align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="light"
            content="项目详情"
            placement="left"
            style="width: 40%"
          >
            <el-button
              @click.native.prevent="getItemDetail(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-view"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip
            effect="light"
            content="我的申报详情"
            placement="top"
            style="width: 40%"
          >
            <el-button
              @click.native.prevent="getBidDetail(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-s-operation"></i>
            </el-button>
          </el-tooltip>
          <!-- <el-tooltip
            effect="light"
            content="投标信息修改"
            placement="top"
            style="width: 18%"
          >
            <el-button
              @click.native.prevent="bidEdit(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip> -->
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
    <ItemDetail ref="detail" :datadetail="dataDetail" />
    <BidDetail ref="bidDetail" :datadetail="dataBidDetail" @Fresh="refresh" />
    <!-- <Declare
      ref="bidEdit"
      :datadetail="dataBidDetail"
      :wherefrom="declarewherefrom"
      @Fresh="refresh"
    /> -->
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import ItemDetail from "../../bid/detail.vue"; // 申报页面详情页
import BidDetail from "../Bidding/detailBid"; // 我的投标详情页
import Declare from "../../bid/declare.vue";
import Steps from "../../steps.vue";
export default {
  components: { ItemDetail, BidDetail, Declare, Steps },
  data() {
    return {
      // 搜索
      dataSearch: { name: "" },
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      str: "",
      // 网格与树连接
      // 详情页传递数据
      dataDetail: {},
      dataBidDetail: {},
      // 申报刷新
      refresh: "0",
      declarewherefrom: "bidedit",
    };
  },
  created() {
    // 获取全部项目
    this.getAllItems();
  },
  methods: {
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
    getAllItems() {
      this.$api
        .getBidItemsFirstTrialResult({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataTableLength = 0;
            this.dataTable = [];
            this.dataTableAll = [];
            let data = res.data.result;
            if (res.data.status == 200) {
              // console.log(111, data);
              for (let i = 0; i < data.length; i++) {
                if (data[i].adopt == 1) {
                  data[i].result = "通过";
                  data[i].tag = "通过";
                } else if (data[i].adopt == 0) {
                  data[i].tag = "审核中";
                } else {
                  data[i].tag = "未通过";
                }
              }
              this.dataTableLength = data.length;
              this.dataTable = data;
              this.dataTableAll = data;
              // console.log(111, this.dataTable);
            }
          }
        });
    },
    // 标记
    filterTag(value, row) {
      return row.tag === value;
    },
    // 连接投标时查看详情的界面
    getItemDetail(index, dataTable) {
      let it_id = dataTable[index].it_id;
      this.$api
        .getOneItem({
          it_id: it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            if (res.data.status == 200) {
              // console.log(111, data);
              this.dataDetail = data[0];
              this.$refs.detail.visible = true;
            }
          }
        });
    },
    // 投标详情
    getBidDetail(index, dataTable) {
      this.dataBidDetail = dataTable[index];
      // console.log(111, this.dataBidDetail);
      this.$refs.bidDetail.visible = true;
    },
    // 修改投标
    bidEdit(index, dataTable) {
      this.dataBidDetail = dataTable[index];
      // console.log(111, this.dataBidDetail);
      this.$refs.bidEdit.visible = true;
    },
    Fresh(val) {
      this.refresh = val;
    },
    // 撤销投标
    revoke(index, dataTable) {
      // this.dataBidDetail = dataTable[index];
      // console.log(111, this.dataBidDetail);
      // this.$refs.bidDetail.visible = true;
      let ex = dataTable[index].ex_id;
      let it = dataTable[index].it_id;
      this.$confirm("是否确定撤销申报?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // 申报撤销
          this.$api
            .deleteDeclareItem({
              ex_id: ex,
              it_id: it,
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "撤销成功",
                  offset: 100,
                });
                this.refresh = "1";
              } else {
                this.$message({
                  type: "error",
                  message: "撤销失败！请重试",
                  offset: 100,
                });
              }
            });
          this.$api
            .deleteDeclareFiles({
              ex_id: ex,
              it_id: it,
            })
            .then((res) => {
              if (res.status == 200) {
              }
            });
        })
        .catch(() => {});
    },

    // 搜索
    search() {
      this.dataTable = [];
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].itemname.indexOf(this.dataSearch.name) != -1) {
          this.dataTable.push(this.dataTableAll[i]);
        }
      }
      this.dataTableLength = this.dataTable.length;
    },
  },
  watch: {
    refresh(newval, val) {
      if (newval == "1") {
        this.getAllItems();
        this.refresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
#bid {
  height: 90vh;
  width: 100%;
  // border: 1px solid blue;
  overflow: auto;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-flow: column;
  .steps {
    height: 50px;
  }
  .search {
    flex: 1.8;
    height: 100%;
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
      flex: 2;
      text-align: center;
    }
  }
  .table {
    flex: 15;
    // width: 100%;
  }
  .pagination {
    flex: 1;
  }
  // }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 7px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  // -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(11, 221, 211, 0.4);
}
</style>