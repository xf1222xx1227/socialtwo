<template>
  <div>
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo style"
      background-color="#317f87"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/launch">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">项目发起</span>
      </el-menu-item>

      <el-submenu index="/items">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的项目</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/items/bidding">
            <i class="el-icon-s-operation"></i>
            <span slot="title">招标项目</span>
          </el-menu-item>
          <el-menu-item index="/items/preliminaryexamination">
            <i class="el-icon-cloudy"></i>
            <span slot="title">申报初审</span>
          </el-menu-item>
          <el-menu-item index="/items/examineinvition">
            <i class="el-icon-edit"></i>
            <span slot="title">细审专家邀请</span>
          </el-menu-item>
          <el-menu-item index="/items/detailedexamination">
            <i class="el-icon-cloudy-and-sunny"></i>
            <span slot="title">申报细审</span>
          </el-menu-item>
          <el-menu-item index="/items/calibration">
            <i class="el-icon-position"></i>
            <span slot="title">项目定标</span>
          </el-menu-item>
          <el-menu-item index="/items/schedule">
            <i class="el-icon-unlock"></i>
            <span slot="title">进度跟踪</span>
          </el-menu-item>
          <el-menu-item index="/items/finished">
            <i class="el-icon-switch-button"></i>
            <span slot="title">完成项目</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/user">
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