<template>
  <div id="bidding">
    <div id="total">
      <!-- <div class="steps" style="height: 50px; width: 100%">
        <Steps :index="1" />
      </div> -->
      <div class="search">
        <div class="textboxp">
          <div class="p">项目名称：</div>
          <el-input
            v-model="dataSearch.name"
            clearable
            class="text"
            @keyup.enter.native="search"
          ></el-input>
        </div>
        <div class="textboxp">
          <div class="p">研究方向：</div>
          <!-- <el-input v-model="dataSearch.type" clearable class="text"></el-input> -->
          <el-select
            v-model="dataSearch.type"
            class="text"
            filterable
            clearable
            placeholder="可输入"
          >
            <el-option
              v-for="item in options_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="textboxp">
          <div class="p"><!--项目名称：--></div>
          <!-- <el-input v-model="dataSearch.name" clearable class="text"></el-input> -->
          <div class="text"></div>
        </div>
        <div class="bt">
          <el-button type="primary" @click="search" icon="el-icon-search" round
            >搜索</el-button
          >
        </div>
      </div>
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
          width="330"
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
            <el-button
              @click.native.prevent="edit(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              <i class="el-icon-edit"></i>
              编辑
            </el-button>
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
      <!-- <hr /> -->
      <Detail ref="dialogDetail" :datadetail="dataDetail" />
      <Edit ref="dialogEdit" :dataedit="dataEdit" />
    </div>
  </div>
</template>

<script>
import Detail from "./details.vue";
import Edit from "./edit.vue";
import Steps from "../../steps.vue";
export default {
  components: {
    Detail,
    Edit,
    Steps,
  },
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
      // 编辑页数据
      dataEdit: {},
      // 搜索框
      dataSearch: {
        name: "",
        type: "",
      },
      // labelPosition: "right",
      options_type: [],
    };
  },
  created() {
    // 项目类别
    this.$api.getResearchDirection({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].value = data[i].name;
            data[i].label = data[i].name;
            data[i].it_id = data[i].re_id;
            this.options_type.push(data[i]);
          }
        }
      }
    });
    // 获取正在招标项目数据
    this.$api
      .getBiddingItems({
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
    // 搜索
    search() {
      this.dataTable = [];
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].name.indexOf(this.dataSearch.name) != -1) {
          if (this.dataSearch.type == "") {
            this.dataTable.push(this.dataTableAll[i]);
          } else {
            if (this.dataSearch.type == this.dataTableAll[i].typename) {
              this.dataTable.push(this.dataTableAll[i]);
            }
          }
        }
      }
      this.dataTableLength = this.dataTable.length;
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
    // 打开编辑弹窗
    edit(index, dataTable) {
      let myindex = this.pageSize * (this.currentPage - 1) + index;
      let data = dataTable[myindex];
      this.dataEdit = data;
      this.$refs.dialogEdit.visible = true;
    },
    // 撤销
    revoke(index, dataTable) {
      let myindex = this.pageSize * (this.currentPage - 1) + index;
      let data = dataTable[myindex];
      this.$confirm("是否确定撤销项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$api
            .deleteBidingReleaseItems({
              it_id: data.it_id,
            })
            .then((res) => {
              if (res.status == 200) {
                this.dataTable.splice(myindex, 1);
                this.$message({
                  message: "项目撤销成功",
                  type: "success",
                });
              }
            });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
#bidding {
  height: 92vh;
  // height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;

  #total {
    flex: 3;
    // border: 1px solid blue;
    // overflow: auto;
    width: 100%;
    // overflow-x: auto;
    // white-space: nowrap;

    display: flex;
    flex-flow: column;
    .search {
      flex: 1.5;
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
      flex: 13;
      height: 100%;
      overflow: hidden;
    }
    .pagination {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>