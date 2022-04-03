<template>
  <div id="bid">
    <!-- 页面内容 -->
    <div id="leftTree">
      <el-tree
        :data="dataTree"
        :props="defaultProps"
        :highlight-current="true"
        node-key="id"
        :default-expanded-keys="['all']"
        @node-click="handleNodeClick"
        class="tree"
      ></el-tree>
    </div>
    <div id="rightTable">
      <div class="steps">
        <Steps :index="1" />
      </div>
      <div class="search">
        <div class="textboxp">
          <div class="p">项目名称：</div>
          <el-input v-model="dataSearch.name" clearable class="text"></el-input>
        </div>
        <div class="textboxp">
          <div class="p"><!--研究方向：--></div>
          <!-- <el-select
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
          </el-select> -->
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
              申报
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
    <Detail ref="detail" :datadetail="dataDetail" />
    <Declare
      ref="declare"
      :datadetail="dataDetail"
      @refresh="refreshdata"
      :wherefrom="declarewherefrom"
    />
  </div>
</template>

<script>
import myFunctions from "../../myFunctions";
import Detail from "./detail.vue";
import Declare from "./declare.vue";
import Steps from "../steps.vue";
export default {
  components: { Detail, Declare, Steps },
  data() {
    return {
      // 树
      dataTree: [
        {
          label: "全部分类",
          id: "all",
          type: "all",
          children: [
            {
              label: "研究方向",
              id: "research",
              type: "research1",
              children: [],
            },
            {
              label: "发布社科",
              id: "social",
              type: "social1",
              children: [],
            },
            {
              label: "项目类别",
              id: "category",
              type: "category1",
              children: [],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dataResearchSpecialty: [],
      dataSocial: [], // 社科联
      dataCategory: [], // 类别一层节点
      dataCategoryname: [], // 二层节点
      dataCategoryAll: [], // 类别总数居
      // 搜索
      dataSearch: { name: "" },
      // 表格
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      str: "",
      // 网格与树连接
      // 详情页传递数据
      dataDetail: {},
      // 申报刷新
      refresh: "0",
      declarewherefrom: "bid",
    };
  },
  created() {
    //   获取研究方向
    this.$api.getResearchDirection({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = data[i].name;
            data[i].type = "research2";
            data[i].id = data[i].re_id;
            this.dataResearchSpecialty.push(data[i]);
          }
          this.dataTree[0].children[0].children = this.dataResearchSpecialty;
        }
      }
    });
    //   获取社科
    this.$api.getSocial({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].value = data[i].name;
            data[i].type = "social2";
            data[i].id = data[i].b_id;
            this.dataSocial.push(data[i]);
          }
          this.dataTree[0].children[1].children = this.dataSocial;
        }
      }
    });
    // 所有项目类别
    this.$api.getAllItemCategory({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].categoryname;
            data[i].value = data[i].categoryname;
            data[i].type = "category3";
            data[i].id = data[i].cid;
            this.dataCategoryAll.push(data[i]);
          }
        }
      }
    });
    // 项目类别一二层
    this.$api.itemCategory({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        // console.log(12212, data);
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].categoryid;
            data[i].value = data[i].categoryid;
            data[i].type = "category2";
            data[i].id = data[i].cid;
            this.dataCategory.push(data[i]);
          }
          this.dataTree[0].children[2].children = this.dataCategory;
          // 二层
          for (let i = 0; i < this.dataCategory.length; i++) {
            let xdata = [];
            for (let j = 0; j < this.dataCategoryAll.length; j++) {
              if (
                this.dataCategoryAll[j].categoryid ==
                this.dataCategory[i].categoryid
              ) {
                xdata.push(this.dataCategoryAll[j]);
              }
            }
            this.dataCategoryname.push(xdata);
            this.dataTree[0].children[2].children[i].children = xdata;

            // console.log(i, this.dataCategoryname[i]);
          }
        }
      }
    });
    // 获取全部项目
    this.getAllItems();
  },
  methods: {
    // 选中树节点事件
    handleNodeClick(data) {
      let type = data.type;
      this.str = "";
      // 根节点
      if (data.type == "all" || data.type[data.type.length - 1] == "1") {
        this.getAllItems();
      }
      // 二层节点
      else if (data.type[data.type.length - 1] == "2") {
        //研究方向筛选
        if (type == "research2") {
          let id = data.re_id;
          this.str = ` and research_direction.re_id = '` + id + `' `;
          this.getAllItems(this.str);
        }
        //社科筛选
        else if (type == "social2") {
          let id = data.b_id;
          this.str = ` and bidding.b_id = '` + id + `' `;
          this.getAllItems(this.str);
        }
        // 项目类别
        else if (type == "category2") {
          let id = data.categoryid;
          this.str = ` and item_category.categoryid = '` + id + `' `;
          this.getAllItems(this.str);
        }
      }
      // 三层
      else if (data.type[data.type.length - 1] == "3") {
        // 项目类别三层
        if (type == "category3") {
          let id = data.categoryname;
          this.str = ` and item_category.categoryname = '` + id + `' `;
          this.getAllItems(this.str);
        }
      }
      // console.log(111, data);
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
    // 获取正在招标但是还未申报的
    getAllItems(str) {
      this.$api
        .getAllItems({
          str: str,
          userid: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataTableLength = 0;
            this.dataTable = [];
            this.dataTableAll = [];
            let data = res.data.result;
            if (res.data.status == 200) {
              for (let i = 0; i < data.length; i++) {
                data[i].id = data[i].it_id;
              }
              this.filterReviewDetail(data);
            }
          }
        });
    },
    // 过滤参与细审的项目
    filterReviewDetail(datas) {
      this.$api
        .getOneExpertReviewDetailsItem({
          ex_id: sessionStorage.getItem("userid"),
        })
        .then((res) => {
          if (res.status == 200) {
            let data = res.data.result;
            if (res.data.status == 200) {
              let resdata = [];
              for (let i = 0; i < datas.length; i++) {
                if (
                  myFunctions.dataInJson(datas[i].ex_id, "ex_id", data) == 0
                ) {
                  resdata.push(datas[i]);
                }
              }
              this.dataTableLength = resdata.length;
              this.dataTable = resdata;
              this.dataTableAll = resdata;
            } else {
              this.dataTableLength = datas.length;
              this.dataTable = datas;
              this.dataTableAll = datas;
            }
          } else {
            this.dataTableLength = datas.length;
            this.dataTable = datas;
            this.dataTableAll = datas;
          }
        });
    },
    getDetail(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.detail.visible = true;
    },
    declare(index, dataTable) {
      this.dataDetail = dataTable[index];
      this.$refs.declare.visible = true;
    },
    refreshdata(val) {
      this.refresh = "1";
    },
    // 搜索
    search() {
      this.dataTable = [];
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].name.indexOf(this.dataSearch.name) != -1) {
          this.dataTable.push(this.dataTableAll[i]);
        }
      }
      this.dataTableLength = this.dataTable.length;
    },
  },
  watch: {
    refresh(newval, val) {
      if (newval == "1") {
        this.getAllItems(this.str);
        this.refresh = "0";
      }
    },
  },
};
</script>

<style lang="less" scoped>
#bid {
  height: 90vh;
  width: 100%;
  display: flex;
  flex-flow: row;
  // border: 1px solid red;
  #leftTree {
    flex: 1;
    // border: 1px solid red;
    overflow: auto;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
  #rightTable {
    flex: 5;
    border-left: 1px solid blue;
    overflow: auto;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    white-space: nowrap;

    display: flex;
    flex-flow: column;
    .steps {
      height: 50px;
      width: 100%;
    }
    .search {
      flex: 1.8;
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
      flex: 15;
    }
    .pagination {
      flex: 1;
    }
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 7px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  // -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(11, 221, 211, 0.4);
}
</style>