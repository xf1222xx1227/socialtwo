<template>
  <div class="layout">
    <!-- 左侧导航区域 -->
    <MyMenu class="menu" />
    <!-- 右侧内容区域 -->
    <Content class="content" />
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import Content from "./Content.vue";
export default {
  data() {
    return {
      userid: "",
    };
  },
  method: {},
  components: {
    MyMenu,
    Content,
  },
  created() {},
};
</script>

<style lang='less' scoped>
.layout {
  .menu {
    width: 200px;
    min-height: 500px;
    background: #a6f7e6;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    margin-left: 200px;
  }
}
</style>