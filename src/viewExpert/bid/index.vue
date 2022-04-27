<template>
  <div id="bidding">
    <div id="total">
      <el-row class="row">
        <el-col :span="5" class="col">
          <div class="left" style="height: 100%">
            <el-tree
              :data="treedata"
              :props="defaultProps"
              @node-click="handleNodeClick"
              node-key="id"
              :default-expanded-keys="['all']"
              highlight-current
              class="tree"
            ></el-tree>
          </div>
        </el-col>
        <el-col :span="19" class="col">
          <div class="search" style="height: 10%">
            <div class="textboxp">
              <div class="p">课题主题：</div>
              <el-input
                v-model="dataSearch.name"
                clearable
                class="text"
                @keyup.enter.native="search"
              ></el-input>
            </div>
            <div class="textboxp"></div>
            <div class="textboxp"></div>
            <div class="bt">
              <el-button
                type="primary"
                @click="search"
                icon="el-icon-search"
                round
                >搜索</el-button
              >
            </div>
          </div>
          <el-table
            :data="
              dataTable.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            style="width: 100%"
            stripe
            border
            @sort-change="sortChange"
            class="table"
            height="80%"
          >
            <!-- <el-table-column
              prop="id"
              label="课题编号"
              sortable="custom"
              header-align="center"
              width="150"
              align="center"
            >
            </el-table-column> -->
            <el-table-column
              prop="name"
              label="课题主题"
              sortable="custom"
              header-align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="time_release"
              label="发布时间"
              sortable="custom"
              header-align="center"
              width="110"
            >
            </el-table-column>
            <el-table-column
              prop="time_declare"
              label="截至申报时间"
              header-align="center"
              sortable="custom"
              width="130"
            >
            </el-table-column>
            <el-table-column
              prop="releasename"
              label="发布人"
              header-align="center"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="companyname"
              label="发布机构"
              header-align="center"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="topic_typename"
              label="课题类别"
              header-align="center"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="achievementstypename"
              label="成果形式"
              header-align="center"
              align="center"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="directions"
              label="参考选题"
              header-align="center"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="count"
              label="申报人数"
              header-align="center"
              align="center"
              width="100"
            >
            </el-table-column>

            <el-table-column
              label="操作"
              align="center"
              width="150"
              fixed="right"
            >
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
                  @click.native.prevent="bidding(scope.$index, dataTable)"
                  type="text"
                  size="small"
                >
                  <i class="el-icon-edit"></i>
                  申报
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination" style="text-align: center; height: 10%">
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
          <Detail ref="dialogAdd" :datadetail="dataadd" :data="dataDetail" />
          <Bidding
            ref="dialogbidding"
            :datadetail="dataadd"
            :data="dataDetail"
            @refresh="reFresh"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Detail from "../../views/Items/Bidding/add.vue";
import Bidding from "./bidding.vue";
import myFunctions from "@/myFunctions";
export default {
  components: {
    Detail,
    Bidding,
  },
  data() {
    return {
      // 树
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      str: "",
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
      options_type: [],

      dataachievementstype: [],
      datatopictype: [],
      datasocial: [],

      dataadd: {},
      dataDetail: {},

      fresh: "0",

      loadtree: "0",
      loadtree1: "0",
      loadtree2: "0",

      // treeclick: {},
      // treeclicknode: {},
    };
  },
  created() {
    this.getachievementstype();
    this.gettopictype();
    this.getallsocial();
    this.dataadd.userid = sessionStorage.getItem("userid");
  },
  methods: {
    // 获取树
    gettree() {
      let data = [];
      data[0] = {};
      data[0].label = "全部节点";
      data[0].id = "all";
      data[0].level = 1;
      data[0].children = [];

      // 课题类别 datatopictype
      // let treetopic_type = [];
      let treetopic_type = {};
      treetopic_type.label = "课题分类";
      treetopic_type.id = "topic_type";
      treetopic_type.level = 2;
      treetopic_type.index = 0;
      treetopic_type.children = [];
      // console.log(111, this.datatopictype);
      for (let i = 0; i < this.datatopictype.length; i++) {
        let xdata = {};
        xdata.id = this.datatopictype[i].id;
        xdata.label = this.datatopictype[i].name;
        xdata.table = "topic_type";
        xdata.level = 3;
        treetopic_type.children.push(xdata);
      }
      data[0].children[0] = treetopic_type;
      // 成果类别 dataachievementstype
      // let treeachievementstype = [];
      let treeachievementstype = {};
      treeachievementstype.label = "成果形式";
      treeachievementstype.id = "achievementstype";
      treeachievementstype.level = 2;
      treeachievementstype.index = 1;
      treeachievementstype.children = [];
      // console.log(111, this.datatopictype);
      for (let i = 0; i < this.dataachievementstype.length; i++) {
        let xdata = {};
        xdata.id = this.dataachievementstype[i].id;
        xdata.label = this.dataachievementstype[i].name;
        xdata.table = "achievementstype";
        xdata.level = 3;
        treeachievementstype.children.push(xdata);
      }
      data[0].children[1] = treeachievementstype;
      this.treedata = data;

      // 发布社科
      let treesocial = {};
      treesocial.label = "发布社科";
      treesocial.id = "social";
      treesocial.level = 2;
      treesocial.index = 2;
      treesocial.children = [];
      // console.log(111, this.datatopictype);
      for (let i = 0; i < this.datasocial.length; i++) {
        let xdata = {};
        xdata.id = this.datasocial[i].id;
        xdata.label = this.datasocial[i].name;
        xdata.table = "company";
        xdata.level = 3;
        treesocial.children.push(xdata);
      }
      data[0].children[2] = treesocial;
      this.treedata = data;
    },
    // 树点击
    handleNodeClick(data, node) {
      if (data.level == 1 || data.level == 2) {
        this.str = "";
        this.gettopic(this.str);
      } else if (data.level == 3) {
        if (data.table == "topic_type") {
          this.str = " and topic_type = " + data.id;
          this.gettopic(this.str);
        } else if (data.table == "achievementstype") {
          this.str = " and achievementstype like '%" + data.id + "%'";
          this.gettopic(this.str);
        } else if (data.table == "company") {
          this.str = " and b.company ='" + data.id + "' ";
          this.gettopic(this.str);
        }
      }
    },
    // 搜索
    search() {
      this.dataTable = [];
      this.dataTableLength = 0;
      for (let i = 0; i < this.dataTableAll.length; i++) {
        if (this.dataTableAll[i].name.indexOf(this.dataSearch.name) != -1) {
          this.dataTable.push(this.dataTableAll[i]);
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
      let data = dataTable[index];
      this.dataDetail = data;
      this.dataadd.type = "detail";
      this.dataadd.power = "detail";
      this.$refs.dialogAdd.visible = true;
    },
    // 申报
    bidding(index, dataTable) {
      let data = dataTable[index];
      this.dataDetail = data;
      this.dataadd.type = "add";
      this.$refs.dialogbidding.visible = true;
    },

    getachievementstype() {
      this.$api.getachievementstype({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.dataachievementstype = data;
          }
          this.loadtree2 = "1";
        }
      });
    },
    gettopictype() {
      this.$api.gettopic_type({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.datatopictype = data;
          }
          this.loadtree = "1";
        }
      });
    },
    getallsocial() {
      this.$api.getallsocial({}).then((res) => {
        if (res.status == 200) {
          let data = res.data.result;
          if (res.data.status == 200) {
            this.datasocial = data;
          }
          this.loadtree1 = "1";
        }
      });
    },
    // 获取招标课题
    gettopic(str) {
      this.dataTable = [];
      this.dataTableAll = [];
      this.dataTableLength = 0;
      this.$api
        .getTopics({
          ex_id: sessionStorage.getItem("userid"),
          str: str,
          date: myFunctions.newDateToDate(),
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                data[i].time_release = myFunctions.newDateToDate(
                  data[i].time_release
                );
                data[i].time_declare = myFunctions.newDateToDate(
                  data[i].time_declare
                );
                // 人数过滤
                if (data[i].mincount == data[i].maxcount) {
                  data[i].count = "= " + data[i].mincount + " 人";
                } else if (data[i].mincount == 0) {
                  data[i].count = "< " + data[i].maxcount + " 人";
                } else if (data[i].maxcount == 0) {
                  data[i].count = "> " + data[i].mincount + " 人";
                }
                // 参考选题长度限制
                if (data[i].direction.length > 20) {
                  data[i].directions = data[i].direction.substring(0, 20);
                  data[i].directions += "...";
                } else {
                  data[i].directions = data[i].direction;
                }
                for (let j = 0; j < this.datatopictype.length; j++) {
                  if (data[i].topic_type == this.datatopictype[j].id) {
                    data[i].topic_typename = this.datatopictype[j].name;
                  }
                }
                if (
                  data[i].achievementstype &&
                  data[i].achievementstype.length > 0
                ) {
                  let type = data[i].achievementstype.split(",");
                  for (let j = 0; j < type.length; j++) {
                    type[j] = parseInt(type[j]);
                    for (let k = 0; k < this.dataachievementstype.length; k++) {
                      if (this.dataachievementstype[k].id == type[j]) {
                        if (j > 0) {
                          data[i].achievementstypename += ";";
                          data[i].achievementstypename +=
                            this.dataachievementstype[k].name;
                        } else {
                          data[i].achievementstypename =
                            this.dataachievementstype[k].name;
                        }
                      }
                    }
                  }
                }
              }
              this.dataTable = data;
              this.dataTableAll = data;
              this.dataTableLength = data.length;
            }
          }
        });
    },
    reFresh(val) {
      this.fresh = val;
    },
  },
  watch: {
    fresh(n, o) {
      if (n != "0") {
        this.gettopic("");
        this.fresh = "0";
      }
    },
    loadtree(n, o) {
      if (
        this.loadtree == "1" &&
        this.loadtree1 == "1" &&
        this.loadtree2 == "1"
      ) {
        this.gettree();
      }
      if (this.loadtree == "1" && this.loadtree2 == "1") {
        this.gettopic();
      }
    },
    loadtree1(n, o) {
      if (
        this.loadtree == "1" &&
        this.loadtree1 == "1" &&
        this.loadtree2 == "1"
      ) {
        this.gettree();
      }
    },
    loadtree2(n, o) {
      if (
        this.loadtree == "1" &&
        this.loadtree1 == "1" &&
        this.loadtree2 == "1"
      ) {
        this.gettree();
      }
      if (this.loadtree == "1" && this.loadtree2 == "1") {
        this.gettopic();
      }
    },
  },
};
</script>

<style lang="less" scoped>
#bidding {
  height: 92vh;
  width: 100%;

  #total {
    height: 100%;
    width: 100%;
    .row {
      height: 100%;
      width: 100%;
      .col {
        height: 100%;
        .left {
          border-right: 1px solid blue;
          display: flex;
          flex-flow: column;
          overflow: auto;
          .button {
            height: 35px;
            padding: 5px 0px;
            display: flex;
            flex-flow: row;
            justify-content: space-around;
            .bt {
              // flex: 1;
              width: 80px;
            }
          }
          .tree {
            flex: 1;
            // border: 1px solid red;
          }
        }
        .search {
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
          overflow: auto;
        }
        .pagination {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>