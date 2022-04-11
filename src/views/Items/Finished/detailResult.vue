<template>
  <el-dialog
    width="60%"
    title="项目细审结果"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div class="firstresult">
      <div class="textboxp">
        <div class="p">申报人：</div>
        <el-select
          v-model="dataexid"
          filterable
          clearable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataExpert"
            :key="item.ex_id"
            :label="item.name"
            :value="item.ex_id"
          >
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="
          dataTable.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        height="80%"
        stripe
        border
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
import Deatil from "../Calibration/first/examineDetail.vue";
export default {
  props: ["datadetail"],
  components: { Deatil },
  data() {
    return {
      visible: false,
      dataexid: "",

      dataExpert: [],

      dataDetail: {},

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
        .getCalibrationOneItemInfo({
          it_id: this.datadetail,
          ex_id: this.dataexid,
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
            }
          }
        });
    },
    getListData() {
      this.dataExpert = [];
      this.$api
        .getOneItemReviewDetails({
          it_id: this.datadetail,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.dataExpert = data;
              this.dataexid = data[0].ex_id;
            }
          }
        });
    },
    openDetail(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },
    // 改变每页显示条数时触发
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 改变页码时触发
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        this.getListData();
      }
    },
    dataexid(newval, val) {
      if (newval != "") {
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
  .textboxp {
    height: 45px;
    width: 50%;
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
  .table {
    flex: 12;
  }
  .pagination {
    flex: 1;
  }
}
</style>