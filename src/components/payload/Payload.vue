<script lang="ts" setup>
import type { Component, PropType } from 'vue'
import type { RootEntity } from '../../base'
import type { IPayload } from './IPayload'
import { ElLink } from 'element-plus'
import { DialogUtil } from '../dialog'

const props = defineProps({
  /**
   * # 负载对象
   */
  payload: {
    type: Object as PropType<IPayload & RootEntity>,
    required: true,
  },

  /**
   * # 视图文件
   */
  view: {
    type: Object as PropType<Component>,
    required: true,
  },
})

function show() {
  DialogUtil.show(props.view, props.payload.copy())
}
</script>

<template>
  <ElLink @click="show()">
    {{ payload.getLabel() }}
  </ElLink>
</template>
