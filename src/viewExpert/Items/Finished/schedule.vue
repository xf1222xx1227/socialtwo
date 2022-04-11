<template>
  <el-dialog
    width="70%"
    title="进度详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="total">
      <el-table
        :data="
          dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        height="80%"
        stripe
        @sort-change="sortChange"
        class="table"
        border=""
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
      <DetailsFiles :datafiles="dataFiles" ref="dialogFiles" />
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
import DetailsFiles from "../../../views/Items/Bidding/detailsFiles.vue";
export default {
  props: ["datadetail"],
  components: { DetailsFiles },
  data() {
    return {
      visible: false,
      dataSelect: "",
      dataexid: "",

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,

      files: "",
      dataFiles: [],
    };
  },
  created() {},
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
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
    // 标记
    filterTag(value, row) {
      return row.tag === value;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.dataSelect = this.datadetail;
      }
    },
    dataSelect(newval, val) {
      this.dataexid = sessionStorage.getItem("userid");
      this.getTableData();
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 60vh;
  display: flex;
  flex-flow: column;
  .table {
    flex: 10;
  }
  .pagination {
    flex: 1;
  }
}
</style>