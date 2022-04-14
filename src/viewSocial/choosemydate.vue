<template>
  <div id="total">
    <div class="mybutton">
      <el-button class="mybutton1" @click="changeType('all')">总览</el-button>
      <el-button @click="changeType('year')">按年统计</el-button>
      <el-button @click="changeType('month')">按月统计</el-button>
      <el-button @click="changeType('day')">按日统计</el-button>
    </div>
    <div class="myselect">
      <div class="selectyear selectsdate" v-show="returndata.type == 'year'">
        <el-select class="selectwidth" v-model="byear" placeholder="请选择">
          <el-option
            v-for="item in optionsbyear"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="selectmonth selectsdate" v-show="returndata.type == 'month'">
        <el-select class="selectwidth" v-model="bmonth" placeholder="请选择">
          <el-option
            v-for="item in optionsbmonth"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="selectday selectsdate" v-show="returndata.type == 'day'">
        <el-select class="selectwidth" v-model="bday" placeholder="请选择">
          <el-option
            v-for="item in optionsbday"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      beginyear: 2020,
      beginmonth: 1,
      beginday: 1,

      year: 2020,
      month: 1,
      day: 1,

      type: "all",
      byear: 0,
      bmonth: 1,
      bday: 1,
      optionsbyear: [],
      optionsbmonth: [],
      optionsbday: [],

      returndata: { type: "all" },
    };
  },
  created() {
    let date = new Date();

    let year = date.getFullYear();
    this.year = year;
    this.setbyearoption();

    let month = date.getMonth() + 1;
    this.month = month;
    this.setbmonthoption();

    let day = date.getDate();
    this.day = day;
    this.setbdayoption();
  },
  methods: {
    setbyearoption() {
      let data = [];
      for (let i = this.year; i >= this.beginyear; i--) {
        let datas = {};
        datas.value = i;
        datas.label = i + "年";
        data.push(datas);
      }
      this.optionsbyear = data;
      this.byear = data[0].value;
    },

    setbmonthoption() {
      let data = [];
      for (let i = this.month; i >= this.beginmonth; i--) {
        let datas = {};
        datas.value = i;
        datas.label = i + "月";
        data.push(datas);
      }
      this.optionsbmonth = data;
      this.bmonth = data[0].value;
    },

    setbdayoption() {
      let data = [];
      for (let i = this.day; i >= this.beginday; i--) {
        let datas = {};
        datas.value = i;
        datas.label = i + "日";
        data.push(datas);
      }
      this.optionsbday = data;
      this.bday = data[0].value;
    },

    changeType(type) {
      this.returndata.type = type;
      if (type == "all") {
      } else if (type == "year") {
        this.returndata.begin = this.byear;
      } else if (type == "month") {
        this.returndata.begin = this.bmonth;
      } else {
        this.returndata.begin = this.bday;
      }
      this.$emit("getdate", this.returndata);
    },
  },
  watch: {
    byear(newval, val) {
      this.returndata.begin = this.byear;
      this.$emit("getdate", this.returndata);
    },
    bmonth(newval, val) {
      this.returndata.begin = this.bmonth;
      this.$emit("getdate", this.returndata);
    },
    bday(newval, val) {
      this.returndata.begin = this.bday;
      this.$emit("getdate", this.returndata);
    },
  },
};
</script>

<style lang="less" scoped>
#total {
  height: 50px;
  display: flex;
  flex-flow: row;
  .mybutton {
    display: flex;
    flex-flow: row;
    align-items: center;
    .el-button {
      margin-left: -10px;
      border-left: 1px solid rgb(123, 226, 100);
      border-radius: 0px;
    }
    .mybutton1 {
      margin-left: 10px;
      border-left: none;
    }
  }
  .myselect {
    // flex: 1;
    display: flex;
    flex-flow: row;
    .selectsdate {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .selectwidth {
        width: 150px;
      }
    }
  }
}
</style>