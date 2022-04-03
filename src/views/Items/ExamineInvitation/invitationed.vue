<template>
  <div id="invitationed">
    <el-table
      :data="
        dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%; overflow: auto"
      height="80%"
      :default-sort="{ prop: 'name', order: 'ascending' }"
      stripe
      border
      @sort-change="sortChange"
      class="table"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="专长">
              <span>{{ props.row.research_specialty }}</span>
            </el-form-item>
            <el-form-item label="学位">
              <span>{{ props.row.degreename }}</span>
            </el-form-item>
            <el-form-item label="完成项目数">
              <span>{{ props.row.count }}</span>
            </el-form-item>
            <el-form-item label="项目总预算">
              <span>{{ props.row.money }}</span>
            </el-form-item>
            <el-form-item label="电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="邮件">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable="custom"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="状态"
        header-align="center"
        align="center"
        :filters="[
          { text: '未应答', value: '未应答' },
          { text: '同意', value: '同意' },
          { text: '拒绝', value: '拒绝' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.tag === '拒绝'
                ? 'warning'
                : scope.row.tag === '同意'
                ? 'success'
                : ''
            "
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="degreename" label="学位" header-align="center">
      </el-table-column>
      <el-table-column prop="honorname" label="荣誉称号" header-align="center">
      </el-table-column>
      <el-table-column
        prop="count"
        label="已做项目数"
        header-align="center"
        sortable="custom"
        align="right"
      >
      </el-table-column>
      <el-table-column
        prop="money"
        label="项目总预算"
        header-align="center"
        sortable="custom"
        align="right"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="sendInvitation(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            专家信息
          </el-button> -->
          <!-- <el-button
            @click.native.prevent="detail(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            <i class="el-icon-s-operation"></i>
            详情
          </el-button> -->
          <el-button
            @click.native.prevent="revoke(scope.$index, dataTable)"
            type="text"
            size="small"
          >
            <i class="el-icon-remove-outline"></i>
            撤销
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
  </div>
</template>

<script>
import myFunctions from "../../../myFunctions";
export default {
  props: ["dataitid"],
  data() {
    return {
      // 表格
      dataTableTotal: [],
      dataTable: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      reloadTable: 0,
    };
  },
  created() {
    this.getOneItemInvitation();
  },
  methods: {
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

    // 获取某个项目已经邀请的人员
    getOneItemInvitation() {
      let it_id = this.dataitid;
      this.dataTable = [];
      this.dataTableTotal = [];
      this.$api
        .getOneItemReviewDetailsInvitationExpert({
          it_id: it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              // console.log(4333, data);
              for (let i = 0; i < data.length; i++) {
                if (data[i].expertstate == 0) {
                  data[i].tag = "未应答";
                } else if (data[i].expertstate == 1) {
                  data[i].tag = "同意";
                } else {
                  data[i].tag = "拒绝";
                }
              }
              this.dataTableTotal = data;
              this.dataTable = data;
              this.dataTableLength = this.dataTable.length;
            }
          }
        });
    },
    // 标记
    filterTag(value, row) {
      return row.tag === value;
    },
    detail(index, dataTable) {},
    // 撤销
    revoke(index, dataTable) {
      let myindex = this.pageSize * (this.currentPage - 1) + index;
      let data = dataTable[myindex];
      this.$confirm("是否确定撤销邀请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$api
            .deleteFinishFirst({
              ex_id: data.ex_id,
              it_id: this.dataitid,
            })
            .then((res) => {
              if (res.status == 200) {
                this.dataTable.splice(myindex, 1);
                this.$message({
                  message: "专家撤销邀请成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "专家撤销邀请失败",
                  type: "error",
                });
              }
            });
        })
        .catch(() => {});
    },
  },
  watch: {
    dataitid(newval, val) {
      //   console.log(111, newval);

      this.getOneItemInvitation();
      this.dataTableLength = this.dataTable.length;
    },
  },
};
</script>

<style lang="less" scoped>
#invitationed {
  height: 100%;
  width: 100%;
  //   #rightTable {
  //   border-left: 1px solid blue;
  overflow: auto;
  overflow-x: auto;
  white-space: nowrap;
  .demo-table-expand {
    margin-left: 20px;
    font-size: 0;
    display: flex;
    flex-flow: column;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  display: flex;
  flex-flow: column;
  .table {
    flex: 18;
  }
  .pagination {
    flex: 1;
  }
  //   }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  display: none; // 隐藏滚动条
}
</style>