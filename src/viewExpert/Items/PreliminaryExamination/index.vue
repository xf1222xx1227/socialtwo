<template>
  <div id="bid">
    <div class="search">
      <div class="textboxp">
        <div class="p">课题名称：</div>
        <el-input
          v-model="dataSearch.name"
          clearable
          class="text"
          @keyup.enter.native="search"
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
      style="width: 100%"
      stripe
      border
      @sort-change="sortChange"
      class="table"
      height="80%"
    >
      <el-table-column
        prop="name"
        label="课题主题"
        sortable="custom"
        header-align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="declarename"
        label="申报名称"
        header-align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="time_release"
        label="发布时间"
        sortable="custom"
        header-align="center"
        width="110"
      >
      </el-table-column>
      <el-table-column
        prop="declaretime"
        label="申报时间"
        header-align="center"
        sortable="custom"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="finishdate"
        label="计划完成时间"
        header-align="center"
        sortable="custom"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="prople"
        label="申报人数"
        header-align="center"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="declaretype"
        label="申报类型"
        header-align="center"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="checkListGone"
        label="成果去向"
        header-align="center"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="time_declare"
        label="截至申报时间"
        header-align="center"
        sortable="custom"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="releasename"
        label="发布人"
        header-align="center"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="companyname"
        label="发布机构"
        header-align="center"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="topic_typename"
        label="课题类别"
        header-align="center"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="achievementstypename"
        label="成果形式"
        header-align="center"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="directions"
        label="参考选题"
        header-align="center"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="要求人数"
        header-align="center"
        align="center"
        width="100"
      >
      </el-table-column>

      <el-table-column label="操作" align="center" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="details(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            <!-- <i class="el-icon-s-operation"></i> -->
            课题详情
          </el-button>
          <el-button
            @click.native.prevent="biddingDetail(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            <!-- <i class="el-icon-edit"></i> -->
            申报详情
          </el-button>
          <el-button
            @click.native.prevent="process(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            <!-- <i class="el-icon-edit"></i> -->
            流程
          </el-button>
          <el-button
            @click.native.prevent="revoke(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            撤销
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" style="text-align: center; height: 10%">
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
      <Detail
        ref="dialogTopicDetail"
        :datadetail="dataadd"
        :data="dataDetail"
      />
      <BidDetail
        ref="dialogDeclareDetail"
        :datadetail="datadetail"
        @refresh="reFresh"
      />
    </div>
  </div>
</template>

<script>
import myFunctions from "../../../myFunctions";
import BidDetail from "../Bidding/detailBid";
import Detail from "../../../views/Items/Bidding/add.vue";
export default {
  components: { Detail, BidDetail },
  data() {
    return {
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      // 详情页数据
      dataDetail: {},
      datadetail: {},
      // 编辑页数据
      dataEdit: {},
      // 搜索框
      dataSearch: {
        name: "",
        type: "",
      },
      options_type: [],

      dataachievementstype: [],
      datatopictype: [],

      dataadd: {},
      dataDetail: {},

      fresh: "0",

      userid: "",

      getdata: 0,
    };
  },
  created() {
    this.getachievementstype();
    this.gettopictype();
    this.userid = sessionStorage.getItem("userid");
    // this.getoneexpertstorage();
    this.dataadd.userid = sessionStorage.getItem("userid");
  },
  methods: {
    // 搜索
    search() {
      this.dataTable = [];
      this.dataTableLength = 0;
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].name.indexOf(this.dataSearch.name) != -1) {
          this.dataTable.push(this.dataTableAll[i]);
        }
      }
      this.dataTableLength = this.dataTable.length;
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
    getachievementstype() {
      this.$api.getachievementstype({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.dataachievementstype = data;
          }
          this.getdata++;
        }
      });
    },
    gettopictype() {
      this.$api.gettopic_type({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.datatopictype = data;
          }
          this.getdata++;
        }
      });
    },
    // 获取表格数据
    getoneexpertstorage() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getoneexpertprocess({
          ex_id: sessionStorage.getItem("userid"),
          // date: myFunctions.newDateToDate(),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].time_release = myFunctions.newDateToDate(
                  data[i].time_release
                );
                data[i].time_declare = myFunctions.newDateToDate(
                  data[i].time_declare
                );
                // 申报时间过滤
                data[i].declaretime = myFunctions.newDateToDate(
                  data[i].declaretime
                );
                // 完成时间过滤
                data[i].finishdate = myFunctions.newDateToDate(
                  data[i].finishdate
                );
                // 人数过滤
                if (data[i].mincount == data[i].maxcount) {
                  data[i].count = "= " + data[i].mincount + " 人";
                } else if (data[i].mincount == 0) {
                  data[i].count = "< " + data[i].maxcount + " 人";
                } else if (data[i].maxcount == 0) {
                  data[i].count = "> " + data[i].mincount + " 人";
                }
                // 参考选题长度限制
                if (data[i].direction.length > 20) {
                  data[i].directions = data[i].direction.substring(0, 20);
                  data[i].directions += "...";
                } else {
                  data[i].directions = data[i].direction;
                }
                for (let j = 0; j < this.datatopictype.length; j++) {
                  if (data[i].topic_type == this.datatopictype[j].id) {
                    data[i].topic_typename = this.datatopictype[j].name;
                  }
                }
                if (
                  data[i].achievementstype &&
                  data[i].achievementstype.length > 0
                ) {
                  let type = data[i].achievementstype.split(",");
                  for (let j = 0; j < type.length; j++) {
                    type[j] = parseInt(type[j]);
                    for (let k = 0; k < this.dataachievementstype.length; k++) {
                      if (this.dataachievementstype[k].id == type[j]) {
                        if (j > 0) {
                          data[i].achievementstypename += ";";
                          data[i].achievementstypename +=
                            this.dataachievementstype[k].name;
                        } else {
                          data[i].achievementstypename =
                            this.dataachievementstype[k].name;
                        }
                      }
                    }
                  }
                }
              }
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
            }
          }
        });
    },
    // 打开课题详情弹窗
    details(index, dataTable) {
      let data = dataTable[index];
      this.dataDetail = data;
      this.dataadd.type = "detail";
      this.dataadd.power = "detail";
      this.$refs.dialogTopicDetail.visible = true;
    },
    // 打开申报详情
    biddingDetail(index, dataTable) {
      let data = dataTable[index];
      this.datadetail.topicid = data.id;
      this.datadetail.name = data.name;
      this.datadetail.ex_id = data.ex_id;
      this.datadetail.sb_id = data.sb_id;
      this.datadetail.type = "detail";
      this.datadetail.power = "detail";
      this.datadetail.mincount = data.mincount;
      this.datadetail.maxcount = data.maxcount;
      this.$refs.dialogDeclareDetail.visible = true;
    },
    // 流程查看
    process(index, dataTable) {
      // let data = dataTable[index];
      // this.datadetail.topicid = data.id;
      // this.datadetail.name = data.name;
      // this.datadetail.ex_id = data.ex_id;
      // this.datadetail.sb_id = data.sb_id;
      // this.datadetail.type = "edit";
      // this.datadetail.mincount = data.mincount;
      // this.datadetail.maxcount = data.maxcount;
      // this.$refs.dialogDeclareDetail.visible = true;
    },
    // 撤销
    revoke(index, dataTable) {
      let data = dataTable[index];
      let sb_id = data.sb_id;
      this.$confirm("确定申报?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      }).then(() => {
        this.$api
          .deleteDeclare({
            sb_id: sb_id,
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "撤销成功",
                offset: 150,
              });
            } else {
              this.$message({
                type: "error",
                message: "撤销失败，请稍后再试",
                offset: 150,
              });
            }
          });
      });
    },

    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(n, o) {
      if (n != "0") {
        this.getoneexpertstorage();
        this.fresh = "0";
      }
    },
    getdata(n, o) {
      if (n == 2) {
        this.getoneexpertstorage();
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