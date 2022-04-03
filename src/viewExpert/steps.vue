<template>
  <div id="total">
    <el-steps
      :active="index"
      finish-status="success"
      process-status="finish"
      simple
    >
      <el-step title="发布" icon="el-icon-share"></el-step>
      <el-step title="申报" icon="el-icon-circle-plus-outline"></el-step>
      <el-step title="初审" icon="el-icon-cloudy"></el-step>
      <el-step title="细审" icon="el-icon-cloudy-and-sunny"></el-step>
      <el-step title="定标" icon="el-icon-place"></el-step>
      <el-step title="开标" icon="el-icon-unlock"></el-step>
      <el-step title="完成" icon="el-icon-switch-button"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      //   index: "3",
    };
  },
};
</script>

<style lang="less" scoped>
#total {
  height: 50px;
  width: 100%;
  // border: 1px solid green;
}
</style>