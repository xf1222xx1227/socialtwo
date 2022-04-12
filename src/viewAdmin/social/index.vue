<template>
  <div class="total">
    <!-- <div class="search">
      <div class="textboxp">
        <div class="p">专家姓名：</div>
        <el-input
          v-model="name"
          @keyup.enter.native="search"
          clearable
          class="text"
        ></el-input>
      </div>
      <div class="textboxp"></div>
      <div class="textboxp"></div>

      <div class="bt">
      </div>
    </div> -->
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
        prop="b_id"
        label="社科账号"
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
        prop="name"
        label="社科名称"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>

      <el-table-column
        prop="phone"
        label="社科电话"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="address" label="社科地址" header-align="center">
      </el-table-column>
      <el-table-column
        prop="representative"
        label="法人"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="representative_phone"
        label="法人电话"
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
          <!-- <el-tooltip
            effect="light"
            content="账号冻结"
            placement="top"
            style="width: 30%"
          >
            <el-button
              @click.native.prevent="frozen(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-close"></i>
            </el-button>
          </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
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
    let userid = sessionStorage.getItem("userid");
    if (userid && userid[0] == "A") {
      this.getsocial();
    }
  },
  methods: {
    search() {
      // this.datadetail
    },
    changePassword(index, dataTable) {
      let data = dataTable[index];
      this.datadetail = data;
      this.$refs.dialogpassword.visible = true;
    },
    reFresh(val) {
      this.fresh = val;
    },
    getsocial() {
      this.dataTable = [];
      this.dataTableAll = [];
      this.$api.getSocial({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            this.dataTable = res.data.result;
            this.dataTableAll = res.data.result;
          }
        }
      });
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
        this.getsocial();
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
  // .search {
  //   height: 8vh;
  //   display: flex;
  //   flex-flow: row;
  //   align-items: center;
  //   .textboxp {
  //     flex: 4;
  //     display: flex;
  //     align-items: center;
  //     flex-flow: row;
  //     //   border: 1px solid blue;
  //     .p {
  //       flex: 2;
  //       text-align: center;
  //     }
  //     .text {
  //       flex: 4;
  //     }
  //   }
  //   .bt {
  //     flex: 1;
  //     text-align: center;
  //     margin-left: 5px;
  //   }
  // }
  .table {
    flex: 14;
    // border: 1px solid red;
  }
  // .pagination {
  //   flex: 1;
  // }
}
</style>