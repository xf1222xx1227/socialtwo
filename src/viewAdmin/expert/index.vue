<template>
  <div id="total">
    <div class="search">
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
        <el-button type="primary" @click="search" round>搜索</el-button>
      </div>
    </div>
    <div class="total">
      <div id="leftTree">
        <el-tree
          :data="dataTree"
          :props="defaultProps"
          :highlight-current="true"
          node-key="id"
          :default-expanded-keys="['all']"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div id="rightTable">
        <el-table
          :data="
            dataTable.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
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
                <el-form-item label="完成项目数量">
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
          <!-- <el-table-column prop="degreename" label="学位" header-align="center">
        </el-table-column> -->
          <el-table-column
            prop="honorname"
            label="荣誉称号"
            header-align="center"
          >
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
          <!-- <el-table-column
          prop="state"
          label="状态"
          header-align="center"
          sortable="custom"
          align="right"
        >
        </el-table-column> -->
          <el-table-column
            prop="tag"
            label="状态"
            header-align="center"
            align="center"
            :filters="[
              { text: '正常', value: '正常' },
              { text: '注销', value: '注销' },
              { text: '冻结', value: '冻结' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.tag === '注销'
                    ? 'warning'
                    : scope.row.tag === '冻结'
                    ? 'info'
                    : ''
                "
                disable-transitions
                >{{ scope.row.tag }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- <el-button
              @click.native.prevent="sendInvitation(scope.$index, dataTable)"
              type="text"
              size="small"
            >
              编辑
            </el-button> -->
              <el-tooltip
                effect="light"
                content="密码操作"
                placement="left"
                style="width: 30%"
              >
                <el-button
                  @click.native.prevent="
                    changePassword(scope.$index, dataTable)
                  "
                  type="text"
                  size="small"
                >
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
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
        <hr />
      </div>
      <Password :datadetail="datadetail" ref="dialogpassword" />
      <Frozen :datadetail="datadetail" ref="dialogfrozen" />
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
import Password from "./password.vue";
import Frozen from "./frozen.vue";
export default {
  components: { Password, Frozen },
  data() {
    return {
      // 树
      dataAddress: [],
      dataDegree: [],
      dataResearchSpecialty: [],
      dataHonor: [],
      dataMajor: [],
      dataMajorAll: [],
      dataTree: [
        {
          label: "全部分类",
          id: "all",
          type: "all",
          children: [
            {
              label: "地区分类",
              id: "address",
              type: "address",
              children: [],
            },
            {
              label: "学科分类",
              id: "major",
              type: "major",
              children: [],
            },
            // {
            //   label: "学位分类",
            //   id: "degree",
            //   type: "degree",
            //   children: [],
            // },
            {
              label: "研究专长分类",
              id: "research",
              type: "research",
              children: [],
            },
            {
              label: "荣誉称号",
              id: "honor",
              type: "honor",
              children: [],
            },
          ],
        },
      ],
      // 表格
      dataTableTotal: [],
      dataTable: [],
      dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      minIndex: 0,
      maxIndex: 0,
      // tag标签
      dataTags: [],
      defaultProps: {
        children: "children",
        label: "label",
      },

      datadetail: {},

      name: "",
    };
  },
  props: ["visible"],
  created() {
    // 地区分类数据
    this.$api.getAddress({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].type = "address";
            this.dataAddress.push(data[i]);
          }
          // 省
          let datap = [];
          for (let i = 0; i < this.dataAddress.length; i++) {
            if (this.dataAddress[i].pid == "0") {
              this.dataAddress[i].type = "address1";
              datap.push(this.dataAddress[i]);
            }
          }
          this.dataTree[0].children[0].children = datap;
          // 市
          for (let i = 0; i < datap.length; i++) {
            let datac = [];
            for (let j = 0; j < this.dataAddress.length; j++) {
              if (this.dataAddress[j].pid == datap[i].id) {
                let datanow = {};
                datanow.label = this.dataAddress[j].name;
                datanow.pid = this.dataAddress[j].pid;
                datanow.id = this.dataAddress[j].id;
                datanow.type = "address2";
                datanow.name = this.dataAddress[j].name;
                datac.push(datanow);
              }
            }
            if (datac.length > 0) {
              this.dataTree[0].children[0].children[i].children = datac;
            }
          }
        }
      }
    });

    // 学科专业
    this.$api.getMajorOneTwo({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          this.dataMajorAll = data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].level != 3) {
              data[i].label = data[i].name;
              data[i].type = "major";
              this.dataMajor.push(data[i]);
            }
          }
          // 一层学科
          let datap = [];
          for (let i = 0; i < this.dataMajor.length; i++) {
            if (this.dataMajor[i].parentid == "0") {
              this.dataMajor[i].type = "major1";
              datap.push(this.dataMajor[i]);
            }
          }
          this.dataTree[0].children[1].children = datap;
          // 二层学科
          for (let i = 0; i < datap.length; i++) {
            let datac = [];
            for (let j = 0; j < this.dataMajor.length; j++) {
              if (this.dataMajor[j].parentid == datap[i].id) {
                this.dataMajor[j].type = "major2";
                datac.push(this.dataMajor[j]);
              }
            }
            if (datac.length > 0) {
              this.dataTree[0].children[1].children[i].children = datac;
            }
          }
        }
      }
    });
    // 研究专长分类 getResearchSpecialty
    this.$api.getResearchSpecialty({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].type = "research1";
            data[i].id = data[i].re_id;
            this.dataResearchSpecialty.push(data[i]);
          }
          this.dataTree[0].children[2].children = this.dataResearchSpecialty;
        }
      }
    });
    // 荣誉称号分类 getHonor
    this.$api.getHonor({}).then((res) => {
      if (res.status == 200) {
        let data = res.data.result;
        if (res.data.status == 200) {
          for (let i = 0; i < data.length; i++) {
            data[i].label = data[i].name;
            data[i].id = data[i].h_id;
            data[i].type = "honor";
            this.dataHonor.push(data[i]);
          }
          // 一层称号
          let datap = [];
          for (let i = 0; i < this.dataHonor.length; i++) {
            if (this.dataHonor[i].pid == "0") {
              this.dataHonor[i].type = "honor1";
              datap.push(this.dataHonor[i]);
            }
          }
          this.dataTree[0].children[3].children = datap;
          // 二层称号
          for (let i = 0; i < datap.length; i++) {
            let datac = [];
            for (let j = 0; j < this.dataHonor.length; j++) {
              if (this.dataHonor[j].pid == datap[i].id) {
                // let datanow = {};
                // datanow.label = this.dataHonor[j].name;
                // datanow.id = this.dataHonor[j].id;
                // datanow.level = this.dataHonor[j].level;
                // datanow.name = this.dataHonor[j].name;
                // datanow.pid = this.dataHonor[j].pid;

                this.dataHonor[j].type = "honor2";
                datac.push(this.dataHonor[j]);
              }
            }
            if (datac.length > 0) {
              this.dataTree[0].children[3].children[i].children = datac;
            }
          }
        }
      }
    });

    // 获取全部专家信息
    this.getAllExportInfo();
  },
  methods: {
    search() {
      // console.log("qwe".indexOf("w"));
      let data = this.dataTableAll;
      if (this.name == "") {
        this.dataTable = data;
        this.dataTableLength = data.length;
      } else {
        this.dataTable = [];
        // console.log(111, this.name);
        let datas = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.indexOf(this.name) != -1) {
            datas.push(data[i]);
          }
        }
        this.dataTable = datas;
        this.dataTableLength = datas.length;
      }
    },
    changePassword(ind, rows) {
      let index = this.pageSize * (this.currentPage - 1) + ind;
      let data = this.dataTableTotal[index];
      this.datadetail = data;
      this.$refs.dialogpassword.visible = true;
    },
    frozen(ind, rows) {
      let index = this.pageSize * (this.currentPage - 1) + ind;
      let data = this.dataTableTotal[index];
      this.datadetail = data;
      this.$refs.dialogfrozen.visible = true;
    },
    // 标记
    filterTag(value, row) {
      return row.tag === value;
    },
    // 选中树节点事件
    handleNodeClick(data) {
      // console.log(111, data);
      // 根节点
      if (
        data.type == "all" ||
        data.type == "address" ||
        data.type == "honor" ||
        data.type == "major" ||
        data.type == "degree" ||
        data.type == "research"
      ) {
        this.getAllExportInfo();
      }
      // 一级菜单
      else if (data.type.slice(-1) == "1") {
        let table = data.type.slice(0, -1);
        let id = data.id;
        let str = "";
        let column = "";
        if (table == "degree") {
          column = "expert_personal.degree";
          id = id;
          str = str + " and " + column + " = '" + id + "' ";
        } else if (table == "research") {
          column = "research_direction.re_id";
          id = id;
          str = str + " and " + column + " = '" + id + "' ";
        } else if (table == "major") {
          column = "majors.id";
          id = id;
          let xdata = [];
          let xdatas = [];
          xdata.push(id);
          for (let i = 0; i < this.dataMajorAll.length; i++) {
            if (this.dataMajorAll[i].parentid == data.id) {
              xdatas.push(this.dataMajorAll[i]);
            }
          }
          if (xdatas.length > 0) {
            for (let j = 0; j < xdatas.length; j++) {
              xdata.push(xdatas[j].id);
              for (let i = 0; i < this.dataMajorAll.length; i++) {
                if (this.dataMajorAll[i].parentid == xdatas[j].id) {
                  xdata.push(this.dataMajorAll[i].id);
                }
              }
            }
          }

          if (xdata.length > 0) {
            str = str + " and " + column + " in";
            let str1 = "(";
            for (let i = 0; i < xdata.length; i++) {
              if (i == 0) {
                str1 = str1 + "'" + xdata[i] + "'";
              } else {
                str1 = str1 + ",'" + xdata[i] + "'";
              }
            }
            str1 += ")";
            str += str1;
          } else {
            str = str + " and " + column + " = '" + id + "' ";
          }
        } else if (table == "honor") {
          column = "expert_personal.honor";
          id = id;
          let xdata = [];
          for (let i = 0; i < this.dataHonor.length; i++) {
            if (this.dataHonor[i].pid == data.id) {
              xdata.push(this.dataHonor[i].id);
            }
          }
          if (xdata.length > 0) {
            str = str + " and " + column + " in";
            let str1 = "(";
            for (let i = 0; i < xdata.length; i++) {
              if (i == 0) {
                str1 = str1 + "'" + xdata[i] + "'";
              } else {
                str1 = str1 + ",'" + xdata[i] + "'";
              }
            }
            str1 += ")";
            str += str1;
          } else {
            str = str + " and " + column + " = '" + id + "' ";
          }
        } else if (table == "address") {
          column = "expert_personal.address_province";
          id = id;
          str = str + " and " + column + " = '" + id + "' ";
        }
        this.getOneExportInfo(str);
      }
      // 二级菜单
      else if (data.type.slice(-1) == "2") {
        let table = data.type.slice(0, -1);
        let id = data.id;
        let str = "";
        let column = "";
        if (table == "honor") {
          column = "expert_personal.honor";
          id = id;
          str = str + " and " + column + " = '" + id + "' ";
        } else if (table == "major") {
          column = "majors.id";
          id = id;
          let xdata = [];
          xdata.push(id);
          for (let i = 0; i < this.dataMajorAll.length; i++) {
            if (this.dataMajorAll[i].parentid == data.id) {
              xdata.push(this.dataMajorAll[i].id);
            }
          }
          if (xdata.length > 0) {
            str = str + " and " + column + " in";
            let str1 = "(";
            for (let i = 0; i < xdata.length; i++) {
              if (i == 0) {
                str1 = str1 + "'" + xdata[i] + "'";
              } else {
                str1 = str1 + ",'" + xdata[i] + "'";
              }
            }
            str1 += ")";
            str += str1;
          } else {
            str = str + " and " + column + " = '" + id + "' ";
          }
        } else if (table == "address") {
          column = "expert_personal.address_city";
          id = id;
          str = str + " and " + column + " = '" + id + "' ";
        }
        this.getOneExportInfo(str);
      }
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

    // 获取全部专家信息
    getAllExportInfo() {
      this.dataTableTotal = [];
      this.dataTable = [];
      this.$api.getAllExpertPersonalHave({}).then((res) => {
        if (res.status == 200) {
          this.dataExpert(res);
        }
      });
      this.$api.getAllExpertPersonalNo({}).then((res) => {
        if (res.status == 200) {
          this.dataExpert(res);
          this.dataTableLength = this.dataTableTotal.length;
        }
      });
    },
    // 初始全部专家信息过滤
    dataExpert(res) {
      let data = res.data.result;
      if (res.data.status == 200) {
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i].ex_id;
          data[i].birthdate = myFunctions.newDateToDate(
            new Date(data[i].birthdate)
          );
          if (data[i].cancellation_time != "") {
            data[i].state = "1";
            data[i].tag = "注销";
          } else if (data[i].frozen != "") {
            data[i].state = "2";
            data[i].tag = "冻结";
          } else {
            data[i].state = "0";
            data[i].tag = "正常";
          }
          this.dataTableTotal.push(data[i]);
          this.dataTable.push(data[i]);
          this.dataTableAll.push(data[i]);
        }
        // console.log(data);
      }
    },
    // 获取一层菜单专家
    getOneExportInfo(str) {
      this.dataTableTotal = [];
      this.dataTable = [];
      this.$api
        .getOneExpertPersonalHave({
          str: str,
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataOneExpert(res);
          }
        });
      this.$api
        .getOneExpertPersonalNo({
          str: str,
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataOneExpert(res);
            this.dataTableLength = this.dataTableTotal.length;
          }
        });
    },
    dataOneExpert(res) {
      let data = res.data.result;
      if (res.data.status == 200) {
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i].ex_id;
          data[i].birthdate = myFunctions.newDateToDate(
            new Date(data[i].birthdate)
          );
          this.dataTableTotal.push(data[i]);
          this.dataTable.push(data[i]);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#total {
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
  .total {
    flex: 1;
    width: 100%;
    display: flex;
    flex-flow: row;
    // overflow-x: hidden;
    #leftTree {
      flex: 1;
      // border: 1px solid red;
      border-top: 1px solid blue;
      overflow: auto;

      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
    #rightTable {
      flex: 3;
      border-top: 1px solid blue;
      border-left: 1px solid blue;
      overflow: auto;
      width: 100%;
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
        flex: 15;
      }
      .pagination {
        flex: 1;
      }
      // .tag {
      //   flex: 2;
      //   padding: 5px 10px;
      //   // margin-top: 5px;
      //   white-space: normal;
      //   overflow: auto;
      // }
    }
  }
}
</style>