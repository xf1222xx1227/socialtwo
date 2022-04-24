<template>
  <div>
    <el-menu
      default-active="/socialuserso"
      class="el-menu-vertical-demo style"
      background-color="#317f87"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- <el-menu-item index="/homeso">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item> -->
      <el-menu-item index="/socialuserso">
        <i class="el-icon-position"></i>
        <span slot="title">成员管理</span>
      </el-menu-item>

      <el-submenu index="/itemsso">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>项目统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/itemsso/biddingso">
            <i class="el-icon-s-operation"></i>
            <span slot="title">发布统计</span>
          </el-menu-item>
          <el-menu-item index="/itemsso/firstExamineso">
            <i class="el-icon-cloudy"></i>
            <span slot="title">初审统计</span>
          </el-menu-item>

          <el-menu-item index="/itemsso/deatilExamineso">
            <i class="el-icon-cloudy-and-sunny"></i>
            <span slot="title">细审统计</span>
          </el-menu-item>
          <el-menu-item index="/itemsso/finishedso">
            <i class="el-icon-switch-button"></i>
            <span slot="title">完成项目</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/userso">
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