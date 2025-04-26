<script lang="ts" setup>
import type { Component, PropType } from 'vue'
import type { IPayload } from '../../interface/IPayload'
import type { RootEntity } from '../../model/RootEntity'
import { ElLink } from 'element-plus'
import { DialogUtil } from '../../dialog/DialogUtil'

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
    required: undefined,
  },
})

function show() {
  if (props.view) {
    DialogUtil.show(props.view, props.payload.copy())
  }
}
</script>

<template>
  <ElLink :underline="false" class="a-payload" @click="show()">
    {{ payload?.getPayloadLabel() || '-' }}
  </ElLink>
</template>

<style lang="scss" scoped>
.a-payload {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: keep-all;
}
</style>
