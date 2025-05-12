<script lang="ts" setup>
import type { Component, PropType, Ref } from 'vue'
import type { ButtonIcon } from '../../type'
import {
  BottomRight,
  CircleCheck,
  CirclePlus,
  Clock,
  DocumentCopy,
  EditPen,
  Filter,
  Remove,
  SetUp,
  TopRight,
  Upload,
} from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'
import { computed } from 'vue'
import { WebConfig } from '../../config/WebConfig'
import { PermissionUtil } from '../../permission/PermissionUtil'

const props = defineProps({
  /**
   * ## 权限标识
   */
  permission: {
    type: String,
    default: undefined,
  },

  /**
   * ### 是否是链接按钮
   */
  link: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否是主按钮
   */
  primary: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否是危险按钮
   */
  danger: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否是危险按钮
   */
  warning: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否成功按钮
   */
  success: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 是否禁用按钮
   * 如不禁用，且传入了 `permission` 则按权限判断是否禁用 否则不禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },

  /**
   * ### 图标
   */
  icon: {
    type: String as PropType<ButtonIcon>,
    default: '',
  },
})

/**
 * ### 是否禁用
 */
const isDisabled: Ref<boolean> = computed(() => {
  if (props.disabled) {
    return true
  }
  if (props.permission) {
    const forbidden = !PermissionUtil.has(props.permission) && !WebConfig.disablePermission
    if (forbidden) {
      console.warn(`[AButton] 权限不足(${props.permission})`)
    }
    return forbidden
  }
  return false
})

const icon: Ref<Component | string> = computed(() => {
  switch (props.icon) {
    case 'ADD':
      return CirclePlus
    case 'CLOCK':
      return Clock
    case 'EDIT':
      return EditPen
    case 'DELETE':
      return Remove
    case 'COPY':
      return DocumentCopy
    case 'SETTING':
      return SetUp
    case 'IMPORT':
      return TopRight
    case 'EXPORT':
      return BottomRight
    case 'UPLOAD':
      return Upload
    case 'CHECK':
      return CircleCheck
    case 'FILTER':
      return Filter
    default:
      return ''
  }
})
</script>

<template>
  <template v-if="link">
    <ElLink
      :disabled="isDisabled"
      :type="danger ? 'danger' : warning ? 'warning' : primary ? 'primary' : success ? 'success' : 'default'"
      underline="never"
      v-bind="$attrs"
      v-on="$attrs"
    >
      <slot />
    </ElLink>
  </template>
  <template v-else>
    <ElButton
      :disabled="isDisabled"
      :icon="icon"
      :type="danger ? 'danger' : warning ? 'warning' : primary ? 'primary' : success ? 'success' : 'default'"
      v-bind="$attrs"
      v-on="$attrs"
    >
      <slot />
    </ElButton>
  </template>
</template>

<style lang="scss" scoped></style>
