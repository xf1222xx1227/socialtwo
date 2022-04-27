<template>
  <div>
    <div class="header">
      <p class="headerRow title">社科项目揭榜挂帅系统--用户端</p>
      <div class="hello">{{ this.userdata.name }}&nbsp;{{ hello }}</div>
      <div class="headerRow backBt">
        <el-button
          type="primary"
          icon="el-icon-back"
          @click="backLogin"
          class="bt"
          >返回登录</el-button
        >
      </div>
    </div>
    <!-- 内容区域 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import myFunctions from "@/myFunctions";
export default {
  data() {
    return {
      userdata: {},
      hello: "",
    };
  },
  created() {
    this.$api
      .getOneUser({
        ex_id: sessionStorage.getItem("userid"),
      })
      .then((res) => {
        if (res.status == 200) {
          if (res.data.status == 200) {
            let data = res.data.result;
            this.userdata = data[0];
          }
        }
      });
    this.hello = myFunctions.gethello();
  },
  methods: {
    backLogin() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 8vh;
  background: #a6f7e6;
  display: flex;
  align-items: center;
  flex-flow: row;
  // .headerRow {
  //   flex: 1;
  // }
  .title {
    flex: 2.5;
    margin-left: 20px;
    font-size: 23px;
    text-shadow: -1px 0 0 white, /*向左阴影*/ 0 -1px 0 white,
      /*向上阴影*/ 1px 0 0 #333, /*向右阴影*/ 0 1px 0 #333; /*向下阴影*/
    /**
      text-shadow:x-offset  y-offset  blur  color;
      x-offset是“水平阴影”，表示阴影的水平偏移距离，单位可以是px、em和百分比等,因此如果值为正，则阴影向右偏移；如果值为负，则阴影向左偏移。
      y-offset是“垂直阴影”，表示阴影的垂直偏移距离，单位可以是px、em和百分比等。因此如果值为正，则阴影向下偏移；如果值为负，则阴影向上偏移。
      blur是“模糊距离”，表示阴影的模糊程度，单位可以是px、em、百分比等。blur值越大，则阴影越模糊；blur值越小，则阴影越清晰。此外，blur不能为负值。
      color是“阴影颜色”，表示阴影的颜色。
    */
  }
  .hello {
    // width: 200px;
    flex: 2.5;
    font-size: 19px;
    text-align: right;
    // color: linear-gradient(to bottom, blue, yellow);
  }
  .backBt {
    flex: 1;
    text-align: right;
    height: 100%;
    .bt {
      height: 100%;
      background: #80f1d9;
      font-size: 16px;
      // color: #f06547;
      color: white;
      border-color: #61c9f5;
    }
  }
}
</style>