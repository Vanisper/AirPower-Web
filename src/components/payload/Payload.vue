<script lang="ts" setup>
import type { Component, PropType } from 'vue'
import type { IPayload } from '../../interface/IPayload'
import type { RootEntity } from '../../model/RootEntity'
import { ElLink } from 'element-plus'
import { computed } from 'vue'
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

const payloadLabel = computed(() => {
  try {
    return props.payload?.getPayloadLabel() || '-'
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    console.error('[IPayload] 请实现 IPayload 接口', props.payload)
  }
  return '-'
})
</script>

<template>
  <ElLink
    class="a-payload"
    underline="never" @click="show()"
  >
    {{ payloadLabel }}
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
