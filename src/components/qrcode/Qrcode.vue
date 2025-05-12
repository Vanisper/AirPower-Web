<script lang="ts" setup>
import QrcodeVue from 'qrcode.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  /**
   * ### 二维码内容
   */
  content: {
    type: String,
    required: true,
  },

  /**
   * ### 二维码尺寸
   */
  size: {
    type: Number,
    default: 200,
  },
})

/**
 * ### 二维码内容
 */
const qr = ref('')

/**
 * ### 监听二维码内容变化
 */
watch(
  () => props.content,
  () => {
    qr.value = props.content || ''
  },
)
</script>

<template>
  <div
    v-loading="!content"
    :style="{ width: `${size}px`, height: `${size}px` }"
    class="a-qrcode"
  >
    <QrcodeVue
      v-if="content"
      :size="size"
      :value="content"
      level="H"
    />
  </div>
</template>

<style lang="scss" scoped>
.a-qrcode {
  position: relative;
  display: flex;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  cursor: default;
  user-select: none;
  pointer-events: none;
}
</style>
