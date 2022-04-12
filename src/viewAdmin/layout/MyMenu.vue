<template>
  <div>
    <el-menu
      default-active="/homead"
      class="el-menu-vertical-demo style"
      background-color="#317f87"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- <el-menu-item index="/homead">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item> -->
      <el-menu-item index="/expertad">
        <i class="el-icon-edit"></i>
        <span slot="title">专家管理</span>
      </el-menu-item>
      <el-menu-item index="/socialad">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">社科管理</span>
      </el-menu-item>
      <el-menu-item index="/socialuserad">
        <i class="el-icon-coordinate"></i>
        <span slot="title">社科账号管理</span>
      </el-menu-item>
      <el-menu-item index="/userad">
        <i class="el-icon-edit"></i>
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