<script lang="ts" setup>
import useClipboard from 'vue-clipboard3'
import { FeedbackUtil } from '../../feedback/FeedbackUtil'
import { WebI18n } from '../../i18n/WebI18n'

const props = defineProps({
  /**
   * ### 复制的内容
   */
  content: {
    type: String,
    required: true,
  },

  /**
   * ### 是否隐藏图标
   */
  hideIcon: {
    type: Boolean,
    default: false,
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
  FeedbackUtil.toastSuccess(WebI18n.get().CopySuccess)
}
</script>

<template>
  <div class="a-copy">
    <ElLink
      underline="never"
      v-bind="$attrs"
      @click="copy"
      v-on="$attrs"
    >
      <slot>{{ content || '-' }}</slot>
    </ElLink>
  </div>
</template>

<style lang="scss" scoped>
.a-copy {
  font-size: inherit;
  color: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;

  ::v-deep(.el-link) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
