<template>
  <div id="bid">
    <div class="steps">
      <Steps :index="2" />
    </div>
    <div class="search">
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-input v-model="dataSearch.name" clearable class="text"></el-input>
      </div>
      <div class="textboxp">
        <div class="p">专家姓名：</div>
        <el-input v-model="dataSearch.exname" clearable class="text"></el-input>
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
    <Examine ref="examine" :datadetail="dataExamine" @Fresh="reFresh" />
  </div>
</template>

<script>
import myFunctions from "../../../myFunctions";
import ItemDetail from "../../../viewExpert/bid/detail.vue";
import BidDetail from "./bidDetail.vue";
import Examine from "./examine.vue";
// import Declare from "../../bid/declare.vue";
import Steps from "../../steps.vue";
export default {
  components: { ItemDetail, BidDetail, Examine, Steps },
  // Declare,
  data() {
    return {
      dataAllFirstTrial: [],
      // 搜索
      dataSearch: { name: "", exname: "" },
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableTotal: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      str: "",
      // 传递数据
      dataDetail: {},
      dataBidDetail: {},
      dataExpertAll: [],
      dataExpert: {},
      dataBidDetailAndExpert: {},
      dataExamine: {},
      // 申报刷新
      fresh: "0",
      declarewherefrom: "bidedit",
    };
  },
  created() {
    // 获取初审表
    this.getAllFirstTrial(0);
    // 获取全部项目
    this.getAllItems();
    this.getAllExportInfo();
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
    // 获取初审项目
    getAllFirstTrial(number) {
      this.$api.getAllFirstTrial({}).then((res) => {
        if (res.status == 200) {
          this.dataAllFirstTrial = [];
          if (res.data.status == 200) {
            let data = res.data.result;
            // console.log(222, data);
            this.dataAllFirstTrial = data;
            if (number == 1) {
              this.filterItem(this.dataTableTotal, this.dataAllFirstTrial);
            }
          }
        }
      });
    },
    // 获取所有投标
    getAllItems() {
      this.$api
        .getAllPreItems({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataTableTotal = [];
            if (res.data.status == 200) {
              // console.log(111, res.data.result);
              this.dataTableTotal = res.data.result;
              this.filterItem(this.dataTableTotal, this.dataAllFirstTrial);
            }
          }
        });
    },
    filterItem(data, data2) {
      this.dataTableLength = 0;
      this.dataTable = [];
      this.dataTableAll = [];
      if (data.length > 0) {
        if (data2.length > 0) {
          // let index = [];
          for (let i = 0; i < data.length; i++) {
            let ins = 0;
            for (let j = 0; j < data2.length; j++) {
              if (
                data[i].it_id == data2[j].it_id &&
                data[i].ex_id == data2[j].ex_id
              ) {
                ins = 1;
                break;
              }
            }
            if (ins == 0) {
              this.dataTable.push(data[i]);
              this.dataTableAll.push(data[i]);
            }
          }
          this.dataTableLength = this.dataTable.length;
        } else {
          this.dataTableLength = data.length;
          this.dataTable = data;
          this.dataTableAll = data;
        }
      }
      // console.log("data", this.dataTable);
    },
    // 连接投标时查看详情的界面(项目详情)
    getItemDetail(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },
    // 投标详情
    getBidDetail(index, dataTable) {
      let xdata = dataTable[index];
      // console.log(111, xdata);
      this.$api
        .getOneBiddingItems({
          ex_id: xdata.ex_id,
          it_id: xdata.it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataBidDetail = data[0];
              for (let i = 0; i < this.dataExpertAll.length; i++) {
                console.log(i, this.dataExpertAll[i].ex_id, xdata.ex_id);
                if (this.dataExpertAll[i].ex_id == xdata.ex_id) {
                  this.dataExpert = this.dataExpertAll[i];
                  this.dataBidDetailAndExpert = this.dataBidDetail;
                  for (let key in this.dataExpert) {
                    // hasOwnProperty判断自有属性，使用for in 循环遍历对象属性时，原型链上所有属性都会被访问
                    if (this.dataExpert.hasOwnProperty(key) === true) {
                      this.dataBidDetailAndExpert[key] = this.dataExpert[key];
                    }
                  }
                  this.$refs.bidDetail.visible = true;
                  // console.log(111, this.dataBidDetailAndExpert);
                  break;
                }
              }
            }
          }
        });
    },
    // 获取全部专家信息
    getAllExportInfo() {
      this.dataExpertAll = [];
      this.$api.getAllExpertPersonalHave({}).then((res) => {
        if (res.status == 200) {
          this.dataExperts(res);
        }
      });
      this.$api.getAllExpertPersonalNo({}).then((res) => {
        if (res.status == 200) {
          this.dataExperts(res);
        }
      });
    },
    // 初始全部专家信息过滤
    dataExperts(res) {
      let data = res.data.result;
      if (res.data.status == 200) {
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i].ex_id;
          data[i].birthdate = myFunctions.newDateToDate(
            new Date(data[i].birthdate)
          );
          this.dataExpertAll.push(data[i]);
        }
      }
    },
    // 审核
    examine(index, dataTable) {
      let data = dataTable[index];
      // console.log(111, data);
      this.dataExamine.it_id = data.it_id;
      this.dataExamine.name = data.name;
      this.dataExamine.ex_id = data.ex_id;
      this.dataExamine.rate_comprehensive = data.rate_comprehensive;
      this.dataExamine.rate_economics = data.rate_economics;
      this.dataExamine.rate_technology = data.rate_technology;
      // console.log(111, data);
      this.$refs.examine.visible = true;
    },
    reFresh(val) {
      this.fresh = val;
    },
    // 搜索
    search() {
      this.dataTable = [];
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].name.indexOf(this.dataSearch.name) != -1) {
          this.dataTable.push(this.dataTableAll[i]);
        }
      }
      this.dataTableLength = this.dataTable.length;
    },
  },
  watch: {
    fresh(newval, val) {
      if (newval == "1") {
        // console.log(111, newval);
        this.getAllFirstTrial(1);
        // console.log(222, this.dataAllFirstTrial);
        // this.filterItem(this.dataTableTotal, this.dataAllFirstTrial);
        this.fresh = "0";
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