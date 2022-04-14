<template>
  <el-drawer
    :title="username + '发布项目详情'"
    :visible.sync="visible"
    direction="rtl"
    size="50%"
  >
    <div class="bartotal">
      <el-table
        :data="
          dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%; overflow: auto"
        height="80%"
        stripe
        border
        @sort-change="sortChange"
        class="table"
      >
        <!-- 默认排序 :default-sort="{ prop: 'funds', order: 'descending' }" -->
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
        <el-table-column
          prop="time_end"
          label="截至投标时间"
          header-align="center"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          prop="funds"
          label="初步预算"
          header-align="center"
          sortable="custom"
          align="right"
        >
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="details(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-s-operation"></i>
              详情
            </el-button>
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
        <Detail ref="dialogDetail" :datadetail="dataDetail" />
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Detail from "@/views/Items/Bidding/details.vue";
export default {
  props: ["userid", "username"],
  components: { Detail },
  data() {
    return {
      visible: false,
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      // 详情页数据
      dataDetail: {},
    };
  },
  created() {},
  methods: {
    getTableData(userid) {
      // 获取正在招标项目数据
      this.$api
        .getBiddingItems({
          userid: userid,
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            // console.log(res);
            if (res.data.status == 200) {
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
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
    // 打开详情弹窗
    details(index, dataTable) {
      let myindex = this.pageSize * (this.currentPage - 1) + index;
      let data = dataTable[myindex];
      this.dataDetail = data;
      // console.log(111, data);
      this.$refs.dialogDetail.visible = true;
    },
  },
  watch: {
    userid(newval, val) {
      // console.log(123, newval);
      if (newval != "") {
        this.getTableData(newval);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bartotal {
  //   border: 1px solid blue;
  height: 100%;
  //   height: 40vh;
  width: 100%;
  display: flex;
  flex-flow: column;

  display: flex;
  flex-flow: column;
  .table {
    flex: 8;
    // height: 100%;
    // overflow: hidden;
  }
  .pagination {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>