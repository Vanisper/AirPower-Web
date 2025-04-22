<script lang="ts" setup></script>

<template>
  <el-tabs
    class="a-tabs"
    type="border-card"
  >
    <slot />
  </el-tabs>
</template>

<style lang="scss" scoped>
.a-tabs {
  min-height: 100px;
  flex: 1;
  height: 0;

  ::v-deep(.el-tabs__content) {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0;
    padding: 10px 20px;

    .el-tab-pane {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
