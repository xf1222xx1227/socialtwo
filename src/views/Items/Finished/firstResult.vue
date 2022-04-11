<template>
  <el-dialog
    width="60%"
    title="项目初审结果"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="firstresult">
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
        <el-table-column prop="exname" label="申报人" header-align="center">
        </el-table-column>
        <el-table-column prop="date" label="审核时间" header-align="center">
        </el-table-column>
        <el-table-column prop="result" label="审核结果" header-align="center">
        </el-table-column>
        <el-table-column prop="reason" label="审核原因" header-align="center">
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
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  props: ["datadetail"],
  data() {
    return {
      visible: false,

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
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
    getData() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getOneItemFirstTrial({
          it_id: this.datadetail,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].date = myFunctions.newDateToDate(data[i].time_examine);
                data[i].result = data[i].adopt == 1 ? "通过" : "不通过";
              }
              this.dataTable = data;
              this.dataTableAll = data;
            }
          }
        });
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
    visible(newval, val) {
      if (newval == true) {
        this.getData();
      }
    },
  },
};
</script>

<style  lang="less" scoped>
.firstresult {
  height: 55vh;
  display: flex;
  flex-flow: column;
  .table {
    flex: 12;
  }
  .pagination {
    flex: 1;
  }
}
</style>