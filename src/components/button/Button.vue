<script lang="ts" setup>
import type { Component, PropType, Ref } from 'vue'
import type { ButtonIcon } from '../../type'
import { BottomRight, Clock, Delete, DocumentCopy, Edit, Plus, Setting, TopRight } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { computed } from 'vue'
import { WebConfig } from '../../config/WebConfig'
import { PermissionUtil } from '../../permission/PermissionUtil'

const props = defineProps({
  /**
   * # 权限标识
   */
  permission: {
    type: String,
    default: undefined,
  },

  link: {
    type: Boolean,
    default: false,
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

  /**
   * # 图标
   */
  icon: {
    type: String as PropType<ButtonIcon>,
    default: '',
  },
})

/**
 * # 是否禁用
 */
const isDisabled: Ref<boolean> = computed(() => {
  if (props.disabled) {
    return true
  }
  if (props.permission) {
    return !PermissionUtil.has(props.permission) && !WebConfig.disablePermission
  }
  return false
})

const icon: Ref<Component | string> = computed(() => {
  switch (props.icon) {
    case 'ADD':
      return Plus
    case 'CLOCK':
      return Clock
    case 'EDIT':
      return Edit
    case 'DELETE':
      return Delete
    case 'COPY':
      return DocumentCopy
    case 'SETTING':
      return Setting
    case 'IMPORT':
      return TopRight
    case 'EXPORT':
      return BottomRight
    default:
      return ''
  }
})
</script>

<template>
  <ElButton
    :disabled="isDisabled"
    :icon="icon"
    :link="link"
    :type="danger ? 'danger' : warning ? 'warning' : primary ? 'primary' : 'default'"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <slot />
  </ElButton>
</template>

<style lang="scss" scoped></style>
