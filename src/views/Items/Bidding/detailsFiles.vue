<template>
  <el-dialog
    width="60%"
    title="文件详情"
    :visible.sync="visible"
    append-to-body
    :show-close="false"
    :before-close="beforeHandleClose"
  >
    <div id="FilesDetail">
      <!-- 数据分析与管理之间的关系 -->
      <!-- 从事大数据：素养（有层次的概念）/行业要求 -->
      <!-- 下降、遗传算法、回归、时间序列、神经网络、聚类 用自己的话表述这些算法 -->
      <el-table
        :data="datafiles"
        style="width: 100%; overflow: auto"
        height="100%"
        stripe
        border
        class="table"
      >
        <!-- 默认排序 :default-sort="{ prop: 'funds', order: 'descending' }" -->
        <el-table-column
          prop="name"
          label="文件名"
          sortable
          header-align="center"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="sizes"
          label="文件大小"
          sortable
          header-align="center"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="uploadtime"
          label="上传时间"
          sortable
          header-align="center"
          align="center"
          min-width="180"
        >
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, datafiles)"
              type="text"
              size="small"
              v-show="show"
            >
              <i class="el-icon-delete"></i>
              删除&nbsp;
            </el-button>
            <el-button
              @click.native.prevent="download(scope.$index, datafiles)"
              type="text"
              size="small"
            >
              <i class="el-icon-download"></i>
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["datafiles"],

  data() {
    return {
      visible: false,
      whereFrom: "detail",
      show: false,
      dataDelete: [],
    };
  },
  created() {
    // console.log(111);
    // console.log(123, this.datadetail);
  },
  methods: {
    // 控制只能点击确定或者取消关闭面板
    beforeHandleClose(done) {
      if (this.visible == true) {
        return false;
      }
    },
    // 删除文件
    deleteRow(index, datafiles) {
      // console.log("index", index);
      this.dataDelete.push(this.datafiles[index]);
      this.datafiles.splice(index, 1);
      console.log("de", this.dataDelete);
    },
    // 下载文件
    download(index, datafiles) {
      let url = datafiles[index].url;
      let name = datafiles[index].name;
      if (
        name[name.length - 3] + name[name.length - 2] + name[name.length - 1] ==
        "txt"
      ) {
        window.open(url); // 新窗口打开
      } else {
        window.location.href = url;
      }
    },
    Cancel() {
      this.$emit("getdeletedata", this.dataDelete);
      this.visible = false;
    },
  },
  watch: {
    visible(newval, val) {
      if (newval == true) {
        // console.log(111, this.datafiles);
        if (this.datafiles.length > 0) {
          for (let i = 0; i < this.datafiles.length; i++) {
            let size = parseInt(this.datafiles[i].size);
            if (size >= 1000000) {
              this.datafiles[i].sizes = (size / 1000000).toFixed(2) + "MB";
            } else if (size >= 1000) {
              this.datafiles[i].sizes = (size / 1000).toFixed(0) + "KB";
            } else {
              this.datafiles[i].sizes = size / 1000 + "kb";
            }
          }
        }
        if (this.whereFrom == "edit") {
          this.show = true;
        } else {
          this.show = false;
        }
      } else {
        // this.$emit("getdeletedata", this.dataDelete);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#FilesDetail {
  height: 30vh;
  //   .block {
  //     width: 100%;
  //     border-bottom: 1px dashed #dcdcdc;
  //     .blockmsg {
  //       font-size: 18px;
  //       color: #9c8888;
  //     }
  //   }
}
</style>