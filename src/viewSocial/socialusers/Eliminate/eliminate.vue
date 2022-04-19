<template>
  <div class="total" v-show="visible">
    <el-table
      :data="
        dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      height="80%"
      stripe
      @sort-change="sortChange"
      class="table"
    >
      <el-table-column
        prop="userid"
        label="账号"
        sortable="custom"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        sortable="custom"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" header-align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="light"
            content="重新审核"
            placement="left"
            style="width: 30%"
          >
            <el-button
              @click.native.prevent="examine(scope.$index, dataTable)"
              type="text"
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
    <Examine ref="examine" :datadetail="datadetail" @refresh="reFresh" />
  </div>
</template>

<script>
import Examine from "../TableRegister/examine.vue";
export default {
  components: { Examine },
  data() {
    return {
      visible: true,
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,

      datadetail: {},
      fresh: "0",
    };
  },
  created() {
    this.getsocialuser();
  },
  methods: {
    getsocialuser() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getOneBiddingUsersRegisterEliminate({
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
            }
          }
        });
    },
    examine(index, dataTable) {
      let data = dataTable[index];
      this.datadetail = data;
      this.$refs.examine.visible = true;
    },
    reFresh(val) {
      this.fresh = val;
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
    fresh(newval, val) {
      if (newval != "0") {
        this.$emit("refresh", "1");
        this.getsocialuser();
      }
      this.fresh = "0";
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 83vh;
  display: flex;
  flex-flow: column;
}
</style>