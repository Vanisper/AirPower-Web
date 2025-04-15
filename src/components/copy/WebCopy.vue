<script lang="ts" setup>
import { ElLink, ElMessage, ElTooltip } from 'element-plus'
import useClipboard from 'vue-clipboard3'
import { WebI18n } from '../../i18n'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    required: true,
  },
})
const { toClipboard } = useClipboard()

/**
 * 复制事件
 */
async function copy() {
  if (!props.content) {
    return
  }
  await toClipboard(props.content.toString())
  console.log(WebI18n.get())
  ElMessage.success(WebI18n.get().CopySuccess)
}
</script>

<template>
  <ElTooltip :content="WebI18n.get().ClickToCopy">
    <ElLink
      :underline="false"
      class="web-copy"
      @click="copy"
    >
      <slot>{{ content || '-' }}</slot>
    </ElLink>
  </ElTooltip>
</template>

<style lang="scss" scoped>
.web-copy {
  ::v-deep(.el-link__inner) {
    flex: 1;
  }
}
</style>
