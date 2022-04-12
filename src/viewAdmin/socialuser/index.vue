<template>
  <div class="total">
    <div class="search">
      <div class="textboxp">
        <div class="p">社科名称：</div>
        <el-select
          v-model="name"
          filterable
          clearable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataSocial"
            :key="item.b_id"
            :label="item.name"
            :value="item.b_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="textboxp"></div>
      <div class="textboxp"></div>

      <div class="bt"></div>
    </div>
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
        prop="password"
        label="密码"
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

      <el-table-column prop="bname" label="所属社科" header-align="center">
      </el-table-column>

      <el-table-column
        prop="bphone"
        label="社科电话"
        header-align="center"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            effect="light"
            content="密码操作"
            placement="left"
            style="width: 30%"
          >
            <el-button
              @click.native.prevent="changePassword(scope.$index, dataTable)"
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
    <Password
      :datadetail="datadetail"
      ref="dialogpassword"
      @refresh="reFresh"
    />
  </div>
</template>

<script>
import Password from "./password.vue";
export default {
  components: { Password },
  data() {
    return {
      dataSocial: [],

      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 20,
      nowPageSize: 20,

      name: "",
      datadetail: {},
      fresh: "0",
    };
  },
  created() {
    let userid = sessionStorage.getItem("userid");
    if (userid && userid[0] == "A") {
      this.getsocial();
    }
  },
  methods: {
    changePassword(index, dataTable) {
      let data = dataTable[index];
      this.datadetail = data;
      this.$refs.dialogpassword.visible = true;
    },
    reFresh(val) {
      this.fresh = val;
    },
    // 获取社科
    getsocial() {
      this.$api.getSocial({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            let all = { b_id: "all", name: "所有" };
            data.push(all);
            this.dataSocial = data;
            this.name = data[0].b_id;
          }
        }
      });
    },
    getsocialuser() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getOneSocialUser({
          b_id: this.name,
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
    name(newval, val) {
      if (newval != "") {
        this.getsocialuser();
      }
    },
    fresh(newval, val) {
      if (newval != "0") {
        this.getsocialuser();
        this.fresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  display: flex;
  flex-flow: column;
  .search {
    height: 8vh;
    display: flex;
    flex-flow: row;
    align-items: center;
    .textboxp {
      flex: 4;
      display: flex;
      align-items: center;
      flex-flow: row;
      //   border: 1px solid blue;
      .p {
        flex: 2;
        text-align: center;
      }
      .text {
        flex: 4;
      }
    }
    .bt {
      flex: 1;
      text-align: center;
      margin-left: 5px;
    }
  }
  .table {
    flex: 14;
  }
  .pagination {
    flex: 1;
  }
}
</style>