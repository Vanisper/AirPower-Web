<script lang="ts" setup>
import { DocumentCopy } from '@element-plus/icons-vue'
import useClipboard from 'vue-clipboard3'
import { WebI18n } from '../../i18n'
import { MessageUtil } from '../../util/feedback/MessageUtil'
import { WebButton } from '../button'

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
  MessageUtil.success(WebI18n.get().CopySuccess)
}
</script>

<template>
  <WebButton
    :icon="DocumentCopy"
    class="web-copy"
    link
    v-bind="$attrs"
    @click="copy"
    v-on="$attrs"
  >
    <slot>{{ content || '-' }}</slot>
  </WebButton>
</template>

<style lang="scss" scoped>
.web-copy {
  ::v-deep(.el-link__inner) {
    flex: 1;
  }

  .icon {
    margin-right: 3px;
  }
}
</style>
