<script lang="ts" setup>
import { ElTabs } from 'element-plus'
</script>

<template>
  <ElTabs
    class="a-tabs"
    type="border-card"
  >
    <slot />
  </ElTabs>
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
