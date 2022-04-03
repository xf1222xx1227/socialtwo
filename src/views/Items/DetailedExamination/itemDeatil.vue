<template>
  <div class="total" v-show="visible">
    <h2>111</h2>
    <h2>111</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true,
    };
  },
  created() {},
  methods: {},
  watch: {},
};
</script>

<style lang="less" scoped>
.total {
  height: 100%;
}
</style>