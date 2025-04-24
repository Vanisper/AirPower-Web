<script generic="T extends IPayload" lang="ts" setup>
import type { Component, ModelRef, PropType } from 'vue'
import type { IPayload } from '../payload'
import { computed } from 'vue'
import { DialogUtil } from '../../dialog/DialogUtil'

const props = defineProps({
  /**
   * # 默认空值的提示
   */
  default: {
    type: String,
    default: '',
  },

  /**
   * # 选择按钮文案
   */
  selectLabel: {
    type: String,
    default: '选择',
  },

  /**
   * # 清除按钮文案
   */
  clearLabel: {
    type: String,
    default: '清除',
  },

  /**
   * # 提示信息
   */
  placeholder: {
    type: String,
    default: '请选择...',
  },

  /**
   * # 使用的选择器视图
   */
  selector: {
    type: Object as PropType<Component>,
    required: true,
  },

  /**
   * # 选择器参数
   */
  param: {
    type: Object as PropType<T>,
    default: () => null,
  },

  /**
   * # 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  change: [data: T | undefined]
  clear: []
}>()

const result = defineModel<T>() as ModelRef<T | undefined>

/**
 * # 显示标签
 */
const label = computed(() => result.value?.getPayloadLabel() || props.default)

/**
 * # 选择事件
 */
async function onSelect() {
  result.value = await DialogUtil.show<T>(props.selector, props.param)
  emits('change', result.value)
}

async function onClear() {
  result.value = undefined
  emits('change', result.value)
  emits('clear')
}
</script>

<template>
  <el-input
    :disabled="disabled"
    :placeholder="placeholder"
    :value="label"
    readonly
  >
    <template
      v-if="!disabled"
      #append
    >
      <el-button
        v-if="!result"
        :disabled="disabled"
        @click="onSelect()"
      >
        {{ selectLabel }}
      </el-button>
      <el-button
        v-else
        :disabled="disabled"
        @click=" onClear() "
      >
        {{ clearLabel }}
      </el-button>
    </template>
  </el-input>
</template>
