<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { computed } from 'vue'
import { WebConfig } from '../../config'
import { WebPermissionUtil } from '../../util'

const props = defineProps({
  /**
   * # 权限标识
   */
  permission: {
    type: String,
    default: undefined,
  },

  /**
   * # 是否是主按钮
   */
  primary: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是危险按钮
   */
  danger: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否是危险按钮
   */
  warning: {
    type: Boolean,
    default: false,
  },

  /**
   * # 是否禁用按钮
   * 如不禁用，且传入了 `permission` 则按权限判断是否禁用 否则不禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 是否禁用
 */
const isDisabled = computed(() => {
  if (props.disabled) {
    return true
  }
  if (props.permission) {
    return !WebPermissionUtil.has(props.permission) && !WebConfig.disablePermission
  }
  return false
})
</script>

<template>
  <ElButton
    :disabled="isDisabled"
    :type="danger ? 'danger' : warning ? 'warning' : primary ? 'primary' : 'default'"
    class="air-button"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <slot name="icon" />
    <slot />
  </ElButton>
</template>

<style lang="scss" scoped></style>
