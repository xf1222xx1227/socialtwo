<template>
  <el-dialog
    width="70%"
    title="细审详情"
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
      <Deatil ref="detail" :datadetail="dataDetail" />

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
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
import Deatil from "../../../views/Items/Calibration/first/examineDetail.vue";
export default {
  props: ["datadetail"],
  components: { Deatil },
  data() {
    return {
      visible: false,
      dataSelect: "",

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
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    openDetail(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },
    getTableData(itid) {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getCalibrationOneItemInfo({
          it_id: itid,
          ex_id: sessionStorage.getItem("userid"),
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
      this.getTableData(newval);
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