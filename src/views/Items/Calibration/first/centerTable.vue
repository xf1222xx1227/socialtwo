<template>
  <div id="bid">
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
        prop="exaname"
        label="审核人"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="score_economics"
        label="经济评审"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="score_technology"
        label="技术评审"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="score_comprehensive"
        label="综合评审"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="examinedate"
        label="审核时间"
        header-align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-tooltip
            effect="light"
            content="项目详情"
            placement="left"
            style="width: 25%"
          >
            <el-button
              @click.native.prevent="getItemDetail(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-view"></i>
            </el-button>
          </el-tooltip> -->
          <!-- <el-tooltip
            effect="light"
            content="申报详情"
            placement="top"
            style="width: 25%"
          >
            <el-button
              @click.native.prevent="getBidDetail(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-s-operation"></i>
            </el-button>
          </el-tooltip> -->
          <el-tooltip
            effect="light"
            content="审核详情"
            placement="top"
            style="width: 45%"
          >
            <el-button
              @click.native.prevent="openDetail(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <!-- <i class="el-icon-edit"></i> -->
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
    <Deatil ref="detail" :datadetail="dataDetail" />
    <!-- <BidDetail ref="bidDetail" :datadetail="dataBidDetailAndExpert" /> -->
    <!-- <Examine
      ref="examine"
      :datadetail="dataExamine"
      :wherefrom="'examine'"
      @Fresh="reFresh"
      @getData="getdata"
    /> -->
  </div>
</template>

<script>
import Deatil from "./examineDetail.vue";
import myFunctions from "@/myFunctions";

export default {
  components: { Deatil },
  props: ["dataitid", "dataexid", "fresh"],
  data() {
    return {
      dataAllFirstTrial: [],
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,

      dataDetail: {},
    };
  },
  created() {},
  methods: {
    //   获取表格数据
    getTableData(itid, exid) {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getCalibrationOneItemInfo({
          it_id: itid,
          ex_id: exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].examinedate = myFunctions.newDateToDate(
                  data[i].examinetime
                );
              }
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
              //   console.log(data);
            }
          }
        });
    },
    openDetail(index, dataTable) {
      //   console.log(dataTable[index]);
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },

    // 改变每页显示条数时触发
    handleSizeChange(val) {
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
  },
  watch: {
    dataitid(newval, val) {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      //   console.log(11, newval);
      //   if (this.dataexid != "" && this.dataitid != "") {
      //     this.getTableData(this.dataitid, this.dataexid);
      //   } else {
      //     this.dataTable = [];
      //     this.dataTableAll = [];
      //     this.dataTableLength = 0;
      //   }
    },
    dataexid(newval, val) {
      //   console.log(11, newval, this.dataitid);
      if (this.dataexid != "" && this.dataitid != "") {
        this.getTableData(this.dataitid, this.dataexid);
      } else {
        this.dataTable = [];
        this.dataTableAll = [];
        this.dataTableLength = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#bid {
  //   height: 90vh;
  height: 100%;
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