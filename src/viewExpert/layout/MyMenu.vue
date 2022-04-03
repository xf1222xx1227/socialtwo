<template>
  <div>
    <!-- <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <router-link to="/launch">招标发起</router-link>
      </li>
      <li>
        <router-link to="/items">我的项目</router-link>
      </li>
      <li>
        <router-link to="/user">个人中心</router-link>
      </li>
    </ul> -->
    <el-menu
      default-active="/homeex"
      class="el-menu-vertical-demo style"
      background-color="#317f87"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/homeex">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/bidex">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">项目申报</span>
      </el-menu-item>
      <el-menu-item index="/examineex">
        <i class="el-icon-edit"></i>
        <span slot="title">我的审核</span>
      </el-menu-item>

      <el-submenu index="/itemsex">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的项目</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/itemsex/biddingex">
            <i class="el-icon-s-operation"></i>
            <span slot="title">已申报项目</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/preliminaryexaminationex">
            <i class="el-icon-cloudy"></i>
            <span slot="title">初审结果</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/detailedExaminationex">
            <i class="el-icon-cloudy"></i>
            <span slot="title">细审结果</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/userex">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// .style {
//   background: #a6f7e6;
//   color: #a6f7e6;
// }
</style>