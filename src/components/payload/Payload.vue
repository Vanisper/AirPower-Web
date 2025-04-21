<script generic="T extends IPayload" lang="ts" setup>
import type { Component, PropType } from 'vue'
import type { IPayload } from './IPayload'
import { ElLink } from 'element-plus'

const props = defineProps({
  /**
   * # 负载对象
   */
  payload: {
    type: Object as PropType<IPayload>,
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
  AirDialog.show(props.view, props.payload.copy())
}
</script>

<template>
  <ElLink @click="show()">
    {{ payload.getLabel() }}
  </ElLink>
</template>
