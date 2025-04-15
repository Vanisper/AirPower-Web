<script lang="ts" setup>
import { DesensitizeType, DesensitizeUtil } from '@airpower/core'
import { Hide, View } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    required: true,
  },

  /**
   * # 是否脱敏
   */
  desensitize: {
    type: DesensitizeType,
    default: undefined,
  },

  /**
   * # 脱敏开始保留
   * 默认使用传入的参数
   */
  desensitizeHead: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏末尾保留
   * 默认使用传入的参数
   */
  desensitizeTail: {
    type: Number,
    default: 0,
  },

  /**
   * # 脱敏符号
   */
  desensitizeSymbol: {
    type: String,
    default: DesensitizeUtil.DEFAULT_MASK,
  },
})

const isDesensitize = ref(true)

/**
 * # 脱敏
 */
const desensitized = computed(() => {
  if (!isDesensitize.value || !props.desensitize) {
    return props.content
  }
  return DesensitizeUtil.desensitize(
    props.content,
    props.desensitize,
    props.desensitizeHead,
    props.desensitizeTail,
    props.desensitizeSymbol,
  )
})
</script>

<template>
  <div class="web-desensitize">
    <el-icon
      :class="!isDesensitize ? 'desensitize' : ''"
      class="icon"
      @click.stop="isDesensitize = !isDesensitize"
    >
      <View v-if="isDesensitize" />
      <Hide v-else />
    </el-icon>
    {{ desensitized || '-' }}
  </div>
</template>

<style lang="scss" scoped>
.web-desensitize {
  display: flex !important;
  flex-direction: row;
  align-items: center;

  .icon {
    margin-right: 3px;
    font-weight: bold;
  }

  .desensitize {
    color: red;
  }
}
</style>
