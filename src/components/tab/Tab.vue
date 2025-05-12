<script lang="ts" setup>
import { ElTabPane } from 'element-plus'

defineProps({
  /**
   * ### Tab标题
   */
  label: {
    type: String,
    default: 'Tab',
  },
})
</script>

<template>
  <ElTabPane
    :label="label"
    class="a-tab"
  >
    <slot />
  </ElTabPane>
</template>

<style lang="scss" scoped></style>
