<template>
  <!-- <div id="leftTree"></div>
    <div id="rightTable"></div> -->
  <el-dialog
    width="80%"
    title="选择专家发送邀请"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="invitation">
      <!-- 页面内容 -->
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
          <el-table-column prop="degreename" label="学位" header-align="center">
          </el-table-column>
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

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="sendInvitation(scope.$index, dataTable)"
                type="text"
                size="small"
              >
                添加邀请
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
        <hr />
        <div class="tag">
          <el-tag
            v-for="tag in dataTags"
            :key="tag.id"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)"
            @click="handleClickTag(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="Ok">确 定</el-button>
      <el-button @click="Cancel">取 消</el-button>
      <!-- 
        方法2
        <el-button type="primary" @click="visible=false">确 定</el-button>
        <el-button @click="visible=false">取 消</el-button>
       -->
    </span>
  </el-dialog>
</template>

<script>
import myFunctions from "../../myFunctions";
export default {
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
      // 网格与树连接
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
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    // 弹框取消键
    Cancel() {
      this.$emit("closeDialog", "关闭");
    },
    // 弹框确定键
    Ok() {
      this.$emit("closeDialog", "关闭");
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
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // this.tableDispalyData(this.pageSize, this.currentPage);
    },
    // 改变页码时触发
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.tableDispalyData(this.pageSize, this.currentPage);
    },
    // 加载表格数据（弃用）
    tableDispalyData(size, currentPage) {
      this.minIndex = size * (currentPage - 1);
      this.maxIndex = size * currentPage - 1;
      if (this.maxIndex + 1 > this.dataTableLength) {
        this.maxIndex = this.dataTableLength - 1;
      }
      this.dataTable = [];
      for (let i = this.minIndex; i <= this.maxIndex; i++) {
        this.dataTable.push(this.dataTableTotal[i]);
      }
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
    // 添加邀请
    sendInvitation(ind, rows) {
      let index = this.pageSize * (this.currentPage - 1) + ind;
      let data = this.dataTableTotal[index];
      let judge = 0;
      for (let i = 0; i < this.dataTags.length; i++) {
        if (this.dataTags[i].id == data.id) {
          judge = 1;
        }
      }
      if (judge == 0) {
        this.dataTags.push(data);
      } else {
        this.$message.warning("已选择该专家，无需再次选择");
      }
      this.$emit("gettagdata", this.dataTags);
    },
    // tag标签删除
    handleCloseTag(tag) {
      // console.log(1, tag); // {}
      // console.log(2, this.dataTags); //[{},{}]
      // console.log(3, this.dataTags.indexOf(tag)); // 2
      this.dataTags.splice(this.dataTags.indexOf(tag), 1);
    },
    // handleClickTag tag点击
    handleClickTag(tag) {
      // console.log(tag);
      // this.dataTags.splice(this.dataTags.indexOf(tag), 1);
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
          this.dataTableTotal.push(data[i]);
          this.dataTable.push(data[i]);
          this.dataTableAll.push(data[i]);
        }
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
  watch: {
    // currentPage(newval, val) {
    //   this.tableDispalyData(this.nowPageSize, this.currentPage);
    // },
    // nowPageSize(newval, val) {
    //   this.tableDispalyData(this.nowPageSize, this.currentPage);
    // },
    // 子传父 传值测试
    // visible(newval, val) {
    //   if (newval == false) {
    //     this.$emit("getData", this.data2);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
#invitation {
  height: 60vh;

  width: 100%;
  display: flex;
  flex-flow: row;
  // overflow-x: hidden;
  #leftTree {
    flex: 1;
    border: 1px solid red;
    overflow: auto;

    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
  #rightTable {
    flex: 3;
    border: 1px solid blue;
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
      flex: 9;
    }
    .pagination {
      flex: 1;
    }
    .tag {
      flex: 2;
      padding: 5px 10px;
      // margin-top: 5px;
      white-space: normal;
      overflow: auto;
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