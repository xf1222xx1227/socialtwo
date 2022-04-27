<template>
  <div>
    <el-menu
      default-active="/homeex"
      class="el-menu-vertical-demo style"
      background-color="#317f87"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['/userex', '/itemsex']"
      router
    >
      <keep-alive>
        // 缓存路由
        <el-menu-item index="/homeex">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </keep-alive>

      <el-menu-item index="/bidex">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">课题申报</span>
      </el-menu-item>

      <el-submenu index="/itemsex">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>我的申报</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/itemsex/biddingex">
            <i class="el-icon-s-operation"></i>
            <span slot="title">暂存项目</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/preliminaryexaminationex">
            <i class="el-icon-cloudy"></i>
            <span slot="title">流程跟踪</span>
          </el-menu-item>
          <!-- <el-menu-item index="/itemsex/detailedExaminationex">
            <i class="el-icon-cloudy"></i>
            <span slot="title">细审结果</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/calibrationex">
            <i class="el-icon-position"></i>
            <span slot="title">项目定标</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/scheduleex">
            <i class="el-icon-upload"></i>
            <span slot="title">进度上传</span>
          </el-menu-item>
          <el-menu-item index="/itemsex/finishedex">
            <i class="el-icon-switch-button"></i>
            <span slot="title">完成项目</span>
          </el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-menu-item index="/examineex">
        <i class="el-icon-edit"></i>
        <span slot="title">我的审核</span>
      </el-menu-item> -->

      <!-- <el-menu-item index="/userex">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
      </el-menu-item> -->
      <el-submenu index="/userex">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userex/basicex">
            <i class="el-icon-s-operation"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="/userex/experienceex">
            <i class="el-icon-cloudy"></i>
            <span slot="title">研究经历</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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