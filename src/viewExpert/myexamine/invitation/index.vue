<template>
  <div class="total" v-show="visible">
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
      <!-- :default-sort="{ prop: 'name', order: 'ascending' }" -->
      <el-table-column
        prop="name"
        label="项目名称"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="bidname"
        label="发布社科"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="typename"
        label="研究方向"
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
        label="截至申报"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="getDetail(scope.$index, dataTable)"
            type="text"
            size="small"
            style="width: 45%"
          >
            <i class="el-icon-s-operation"></i>
            详情
          </el-button>
          <el-button
            @click.native.prevent="declare(scope.$index, dataTable)"
            type="text"
            size="small"
            style="width: 45%"
          >
            <i class="el-icon-plus"></i>
            应答
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
    </div>
    <Detail ref="detail" :datadetail="dataDetail" />
  </div>
</template>

<script>
import Detail from "../../bid/detail.vue";
export default {
  components: { Detail },
  data() {
    return {
      visible: true,
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      // 详情页传递数据
      dataDetail: {},
    };
  },
  created() {
    this.$api
      .getInvitationExpertItems({
        userid: sessionStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.dataTable = data;
            this.dataTableAll = data;
            this.dataTableLength = data.length;
          }
        }
      });
  },
  methods: {
    // 打开详情页面
    getDetail(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },
    // 是否同意参与细审工作
    declare(index, dataTable) {
      let data = dataTable[index];
      // this.$refs.declare.visible = true;

      this.$confirm(`是否确定参加项目{${data.name}}的细审工作?`, "提示", {
        confirmButtonText: "参加",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$api
            .updateReviewDetailsInvitationState({
              state: 1,
              it_id: data.it_id,
              ex_id: sessionStorage.getItem("userid"),
            })
            .then((res) => {
              if (res.status == 200) {
                this.dataTable.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "提交成功!请前往待审核页面查看申报信息",
                  offset: 150,
                });
              } else {
                this.$message({
                  type: "error",
                  message: "提交失败，请稍后重试",
                  offset: 150,
                });
              }
            });
        })
        .catch(() => {
          console.log(11111);
          this.$api
            .updateReviewDetailsInvitationState({
              state: 2,
              it_id: data.it_id,
              ex_id: sessionStorage.getItem("userid"),
            })
            .then((res) => {
              if (res.status == 200) {
                this.dataTable.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "提交成功!本项目不参与细审工作",
                  offset: 150,
                });
              } else {
                this.$message({
                  type: "error",
                  message: "提交失败，请稍后重试",
                  offset: 150,
                });
              }
            });
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
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
  // border: 1px solid red;
  height: 83vh;
  display: flex;
  flex-flow: column;
  .table {
    flex: 15;
  }
  .pagination {
    flex: 1;
  }
}
</style>