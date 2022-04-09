<template>
  <div class="total">
    <div class="search">
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-input
          v-model="dataSearch.name"
          @keyup.enter.native="search"
          clearable
          class="text"
        ></el-input>
      </div>
      <div class="textboxp">
        <div class="p">发布社科：</div>
        <el-select
          v-model="dataSearch.social"
          filterable
          placeholder="请选择"
          class="text"
        >
          <el-option
            v-for="item in dataSocial"
            :key="item.b_id"
            :label="item.name"
            :value="item.b_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="textboxp">
        <div class="p">项目名称：</div>
        <el-input
          v-model="dataSearch.name"
          @keyup.enter.native="search"
          clearable
          class="text"
        ></el-input>
      </div>
      <div class="bt">
        <el-button type="primary" @click="search" round>搜索</el-button>
      </div>
    </div>

    <div class="content">
      <div class="table"></div>
      <div class="timeline"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSearch: { name: "", social: "" },
      dataSocial: [],
    };
  },
  created() {
    this.getsocial();
  },
  methods: {
    search() {},
    // 获取社科
    getsocial() {
      this.$api.getSocial({}).then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.dataSocial = data;
          }
        }
      });
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.total {
  height: 92vh;
  display: flex;
  flex-flow: column;
  .search {
    // height: 40px;
    border-bottom: 1px solid red;
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
  .content {
    flex: 1;
    display: flex;
    flex-flow: row;
    .table {
      flex: 5;
      height: 100%;
      border-right: 1px solid red;
    }
    .timeline {
      height: 100%;
      flex: 2;
    }
  }
}
</style>