<template>
  <div id="bid">
    <div class="search">
      <div class="textboxp">
        <div class="p">专家姓名：</div>
        <el-input v-model="dataSearch.exname" clearable class="text"></el-input>
      </div>
      <div class="textboxp">
        <!-- <div class="p">项目名称：</div> -->
        <!-- <el-input v-model="dataSearch.name" clearable class="text"></el-input> -->
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
        prop="name"
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
      <el-table-column prop="typename" label="项目类型" header-align="center">
      </el-table-column>
      <el-table-column prop="exname" label="申报人" header-align="center">
      </el-table-column>
      <el-table-column prop="bid_time" label="申报时间" header-align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
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
          </el-tooltip>
          <el-tooltip
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
          </el-tooltip>
          <el-tooltip
            effect="light"
            content="审核"
            placement="top"
            style="width: 25%"
          >
            <el-button
              @click.native.prevent="examine(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-edit"></i>
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
    <ItemDetail ref="detail" :datadetail="dataDetail" />
    <BidDetail ref="bidDetail" :datadetail="dataBidDetailAndExpert" />
    <Examine
      ref="examine"
      :datadetail="dataExamine"
      :wherefrom="'examine'"
      @Fresh="reFresh"
    />
  </div>
</template>

<script>
import ItemDetail from "../../../views/Items/DetailedExamination/examineingTable/itemDetail.vue";
import BidDetail from "../../../views/Items/DetailedExamination/examineingTable/bidDetail.vue";
import Examine from "../../../views/Items/DetailedExamination/examineingTable/examine.vue";
export default {
  components: { ItemDetail, BidDetail, Examine },
  data() {
    return {
      dataAllFirstTrial: [],
      // 搜索
      dataSearch: { exname: "" },
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableTotal: [], // 无用
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      filter: "",
      // 传递数据
      dataDetail: {},
      dataBidDetailAndExpert: {},
      dataExamine: {},
      // 审核后刷新
      fresh: "0",
    };
  },
  created() {},
  methods: {
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
    // 获取表格数据
    getTableData(filter) {
      this.$api
        .getOneExpertOneItemNeedDetailExamine({
          it_id: filter,
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              //   console.log(111, data);
              // 过滤已经审核的
              this.$api
                .getOneItemNeedDetailedExamine({
                  it_id: filter,
                  userid: sessionStorage.getItem("userid"),
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.status == 200) {
                      let xdata = res.data.result;
                      console.log(222, xdata);
                      let resultdata = [];
                      for (let i = 0; i < data.length; i++) {
                        let ins = 0;
                        for (let j = 0; j < xdata.length; j++) {
                          if (data[i].ex_id == xdata[j].ex_id) {
                            ins = 1;
                            break;
                          }
                        }
                        if (ins == 0) {
                          resultdata.push(data[i]);
                        }
                      }
                      this.dataTableAll = resultdata;
                      this.dataTable = resultdata;
                      this.dataTableLength = resultdata.length;
                    } else {
                      this.dataTableAll = data;
                      this.dataTable = data;
                      this.dataTableLength = data.length;
                    }
                  } else {
                    this.dataTableAll = data;
                    this.dataTable = data;
                    this.dataTableLength = data.length;
                  }
                });
            }
          }
        });
    },
    search() {
      if (this.dataSearch.exname != "") {
        this.dataTable = [];
        for (let i = 0; i < this.dataTableAll.length; i++) {
          if (
            this.dataTableAll[i].exname.indexOf(this.dataSearch.exname) != -1
          ) {
            this.dataTable.push(this.dataTableAll[i]);
          }
        }
        this.dataTableLength = this.dataTable.length || 0;
      }
    },
    // 项目详情
    getItemDetail(index, dataTable) {
      let mydata = dataTable[index];
      this.dataDetail = mydata;
      this.$refs.detail.visible = true;
    },
    // 申报详情
    getBidDetail(index, dataTable) {
      let mydata = dataTable[index];
      this.$api
        .getOneItemBidDetail({
          it_id: mydata.it_id,
          ex_id: mydata.ex_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.$api
                .getOneExpertDetail({
                  ex_id: mydata.ex_id,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.status == 200) {
                      let datas = res.data.result;
                      this.dataBidDetailAndExpert = { ...datas[0], ...data[0] };
                      this.$refs.bidDetail.visible = true;
                    }
                  }
                });
            }
          }
        });
    },
    // 审核
    examine(index, dataTable) {
      this.dataExamine = dataTable[index];
      this.$refs.examine.visible = true;
    },

    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        this.getTableData(this.filter);
        this.$emit("Fresh", this.fresh);
        this.fresh = "0";
      }
    },
    filter(newval, val) {
      this.dataTableAll = [];
      this.dataTable = [];
      this.dataTableLength = 0;
      this.getTableData(newval);
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