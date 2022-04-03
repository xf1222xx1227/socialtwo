<template>
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
      <div class="bottom">
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
        <div class="iteminfo">
          <div class="info">
            当前项目：<span style="color: #ff00ff; font-size: 16px">{{
              dataitem.name
            }}</span>
          </div>
          <div class="submit">
            <el-button
              type="success"
              @click="submit"
              round
              class="bt"
              userid="userid"
              >提交</el-button
            >
            <el-button @click="reset" round class="bt">清空</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myFunctions from "../../../myFunctions";
export default {
  props: ["dataitem", "dataitid"],
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
      // dataTableAll: [],
      dataTableLength: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      nowPageSize: 10,
      minIndex: 0,
      maxIndex: 0,
      reloadTable: 0,
      dataOneItemInvitation: [],
      dataOneItemBid: [],
      // tag标签
      dataTags: [],
      // dataSelectTag: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
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
    // 获取已经邀请的专家
    this.getOneItemInvitation();
    // this.dataTable = [];
  },
  methods: {
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
      let data = this.dataTable[index];
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
      this.dataTags.splice(this.dataTags.indexOf(tag), 1);
    },
    // tag点击
    handleClickTag(tag) {
      console.log(tag);
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
          this.dataTableLength = this.dataTable.length;
          // console.log(123, this.dataTable);
          // this.dataTableLength = this.dataTableTotal.length;
        }
      });
    },
    // 初始全部专家出生日期信息过滤
    dataExpert(res) {
      let data = res.data.result;
      if (res.data.status == 200) {
        for (let i = 0; i < data.length; i++) {
          data[i].id = data[i].ex_id;
          data[i].birthdate = myFunctions.newDateToDate(
            new Date(data[i].birthdate)
          );
          this.dataTableTotal.push(data[i]);
          // this.dataTable.push(data[i]);
        }
        this.dataTableLength = this.dataTable.length;
      }
    },
    // 获取一层菜单专家
    getOneExportInfo(str) {
      this.dataTableTotal = [];
      this.dataTable = [];
      // console.log(222, 1, col, 2, id);
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
            // console.log(111, this.dataTable);
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
          this.dataTable.push(data[i]); // 树节点变化时触发
        }
        this.dataTableLength = this.dataTable.length;
      }
    },
    // 获取某个项目参与申报的人员 getOneItemBid
    getOneItemBids() {
      let it_id = this.dataitid;
      this.$api
        .getOneItemBid({
          it_id: it_id,
        })
        .then((res) => {
          // console.log(123, it_id, res);
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.dataOneItemBid = res.data.result;
            }
          }
        });
    },
    // 获取某个项目已经邀请的人员
    getOneItemInvitation() {
      let it_id = this.dataitid;
      this.$api
        .getOneItemReviewDetailsInvitation({
          it_id: it_id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataOneItemInvitation = res.data.result;
            this.dataTableFilter();
          }
        });
    },
    // 过滤已经邀请过/参与申报的人员的人员
    dataTableFilter() {
      let xdatas = this.dataTableTotal;
      let xdata = this.dataOneItemInvitation;
      let data = this.dataOneItemBid;
      // console.log(111, data);
      let dataresult = [];
      for (let i = 0; i < xdatas.length; i++) {
        let ins = 0;
        if (!myFunctions.isEmpty(xdata)) {
          // 已经邀请
          ins = myFunctions.dataInJson(xdatas[i].ex_id, "ex_id", xdata);
        }
        if (ins == 0 && !myFunctions.isEmpty(data)) {
          // 参与申报
          ins = myFunctions.dataInJson(xdatas[i].ex_id, "ex_id", data);
        }
        if (ins == 0) {
          dataresult.push(xdatas[i]);
        }
      }
      this.dataTable = dataresult;
      this.dataTableLength = this.dataTable.length;
    },
    // 提交
    submit() {
      if (this.dataitem.name) {
        if (this.dataTags.length > 0) {
          // console.log(111, this.dataTags);
          let it_id = this.dataitem.it_id;
          let addtime = myFunctions.newDateToDatetime(new Date());
          let type = 2;
          for (let i = 0; i < this.dataTags.length; i++) {
            let ex_id = this.dataTags[i].ex_id;
            this.$api
              .addReviewDetailsInvitation({
                it_id: it_id,
                ex_id: ex_id,
                addtime: addtime,
                type: type,
              })
              .then((res) => {
                if (res.status == 200) {
                }
              });
            if (i == this.dataTags.length - 1) {
              this.$api
                .addReviewDetailsInvitationSuccess({
                  it_id: it_id,
                  ex_id: ex_id,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.result.length > 0) {
                      this.$message({
                        message: "邀请成功，请等待专家的应答",
                        type: "success",
                      });
                      this.dataTags = [];
                      this.getOneItemInvitation();
                    }
                  }
                });
            }
          }
        }
      } else {
        this.$message({
          message: "未选择项目，请选择项目后重新提交",
          type: "warning",
        });
      }
    },
    // 清空
    reset() {
      this.dataTags = [];
    },
  },
  watch: {
    dataitid(newval, val) {
      this.dataTable = [];
      this.dataTableLength = 0;
      this.dataTags = [];
      this.getOneItemBids();
      this.getOneItemInvitation();
    },
  },
};
</script>

<style lang="less" scoped>
#invitation {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row;
  #leftTree {
    flex: 1;
    border-right: none;
    border-bottom: none;

    width: 100%;
    height: 99%;
    overflow-x: scroll;
    overflow-y: auto;
    white-space: nowrap;
  }
  #rightTable {
    flex: 4;
    border-left: 1px solid blue;
    // border-top: 1px solid red;
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
      flex: 9;
    }
    .pagination {
      flex: 1;
    }
    .bottom {
      flex: 2;
      // padding: 5px 10px;
      white-space: normal;
      overflow: auto;
      display: flex;
      flex-flow: row;
      .tag {
        flex: 4;
        margin: 5px 10px;
      }
      .iteminfo {
        border-left: 1px solid rgb(70, 67, 235);
        flex: 1;
        display: flex;
        flex-flow: column;
        .info {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .submit {
          border-top: 1px dashed black;
          flex: 1;
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: center;
          .bt {
            flex: 1;
          }
        }
      }
    }
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  display: none; // 隐藏滚动条
}
</style>